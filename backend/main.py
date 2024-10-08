from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from prov.model import ProvDocument
from provstore.api import Api
from prov.dot import prov_to_dot
import os
import pydot
from fastapi.responses import JSONResponse, PlainTextResponse
import requests
from dotenv import load_dotenv
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import base64
from urllib.parse import quote

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://interact-prov-3414.web.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

PROVSTORE_API_KEY = os.getenv("PROVSTORE_API_KEY")
PROVSTORE_API_URL = os.getenv("PROVSTORE_API_URL")
PROVSTORE_USERNAME = os.getenv("PROVSTORE_USERNAME")
# Define data models
class Entity(BaseModel):
    entity_id: str
    entity_type: str
    name: str
    description: str
    date: str
    location: str
    version: str

class Activity(BaseModel):
    activity_id: str
    name: str
    description: str
    start_time: str
    end_time: str

class Agent(BaseModel):
    agent_id: str
    agent_type: str
    name: str
    description: str

class Relationship(BaseModel):
    relationship_id: str
    subject: str
    relationship: str
    object: str

class Document(BaseModel):
    documentName: str
    author: str
    isPublic: bool

class ProvenanceRequest(BaseModel):
    entities: List[Entity]
    activities: List[Activity]
    agents: List[Agent]
    relationships: List[Relationship]
    documents: Document

class ExportRequest(BaseModel):
    entities: List[Entity]
    activities: List[Activity]
    agents: List[Agent]
    relationships: List[Relationship]
    docFormat: str

@app.get("/")
async def root():
    return {"Interact-PROV": "Welcome to Interact-PROV!"}

@app.get("/prov")
def prov():
    return {"Interact-PROV": "Welcome to Interact-PROV!"}

@app.get("/prov/public")
async def get_public_docs():
    try:
        current_time = datetime.now()
        four_months_ago = current_time - relativedelta(months=6)
        params = {
            "public": "true",
            "created_at__range": f"{four_months_ago},{current_time}",
            "order_by": "-created_at"
        }

        response = requests.get(f"{PROVSTORE_API_URL}documents", params=params)

        if response.status_code == 200:
            documents = response.json()
            return documents
        else:
            raise HTTPException(status_code=response.status_code, detail="Failed to retrieve public documents")

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching public documents: {str(e)}")

@app.post("/prov/create-graph")
async def create_provenance_graph(provenance: ProvenanceRequest):
    # Create a PROV document
    d1 = ProvDocument()

    # Define namespaces as per the PROV
    d1.add_namespace('prov', 'http://www.w3.org/ns/prov#')
    d1.add_namespace('xsd', 'http://www.w3.org/2001/XMLSchema#')
    d1.add_namespace('foaf', 'http://xmlns.com/foaf/0.1/')
    d1.add_namespace('rdf', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#')
    d1.add_namespace('ex', 'http://example.org/')
    d1.add_namespace('tmpl', 'http://openprovenance.org/tmpl#')
    d1.add_namespace('var', 'http://openprovenance.org/var#')

    # Add entities
    for entity in provenance.entities:
        eId = f"var:{entity.entity_id}"
        d1.entity(eId, {
            "prov:type": f"tmpl:{entity.entity_type}",
            "foaf:name": entity.name,
            "prov:description": entity.description,
            "xsd:date": entity.date,
            "prov:location": entity.location,
            "prov:version": entity.version
        })
    
    # Add activities
    for activity in provenance.activities:
        aId = f"var:{activity.activity_id}"
        d1.activity(aId, activity.start_time, activity.end_time, {
            "foaf:name": activity.name,
            "prov:description": activity.description
        })
    
    # Add agents
    for agent in provenance.agents:
        agId = f"var:{agent.agent_id}"
        d1.agent(agId, {
            "prov:type": f"foaf:{agent.agent_type}",
            "foaf:name": agent.name,
            "prov:description": agent.description
        })
    
    # Add relationships
    for relationship in provenance.relationships:
        subject = f"var:{relationship.subject}"
        obj = f"var:{relationship.object}"
        
        if relationship.relationship == "wasGeneratedBy":
            d1.wasGeneratedBy(subject, obj)
        elif relationship.relationship == "used":
            d1.used(subject, obj)
        elif relationship.relationship == "WasInvalidatedBy":
            d1.wasInvalidatedBy(subject, obj)
        elif relationship.relationship == "wasDerivedFrom":
            d1.wasDerivedFrom(subject, obj)
        elif relationship.relationship == "hadMember":
            d1.hadMember(subject, obj)
        elif relationship.relationship == "WasStartedBy":
            d1.wasStartedBy(subject, obj)
        elif relationship.relationship == "WasEndedBy":
            d1.wasEndedBy(subject, obj)
        elif relationship.relationship == "wasAssociatedWith":
            d1.wasAssociatedWith(subject, obj)
        elif relationship.relationship == "actedOnBehalfOf":
            d1.actedOnBehalfOf(subject, obj)
        elif relationship.relationship == "wasAttributedTo":
            d1.wasAttributedTo(subject, obj)
        elif relationship.relationship == "wasInformedBy":
            d1.wasInformedBy(subject, obj)

    if provenance.documents.isPublic:
        api = Api(base_url=PROVSTORE_API_URL, username=PROVSTORE_USERNAME, api_key=PROVSTORE_API_KEY)
        provstore_document = api.document.create(d1, name=provenance.documents.documentName, public=True)

        provstore_id = provstore_document.id

    # # Return the PROV-N as a plain text response
    # provn_output = d1.get_provn()
    # return {"provn": provn_output}
    
    # Convert the PROV document to a DOT format using prov_to_dot
    dot = prov_to_dot(d1)

    # Set image resolution (DPI)
    # dot.set_graph_defaults(dpi=600, size="15, 20!")

    # Get the DOT source as a string
    dot_source = dot.to_string()

    # Render the graph to a file (PNG format)
    # output_file_path = "prov_graph.png"
    # dot.write_png(output_file_path)

    # Return the PNG file as a response
    # return FileResponse(output_file_path)
    # return {"dot": dot_source}

    # Generate the PNG image as bytes using create_png()
    # png_data = dot.create_png()

    # Convert the PNG bytes to base64
    # img_base64 = base64.b64encode(png_data).decode('utf-8')

    # Return the base64 string as a response
    if provenance.documents.isPublic:
        return JSONResponse(content={"dot": dot_source, "id": provstore_id})
    else:
        return JSONResponse(content={"dot": dot_source})

@app.post("/prov/export-prov")
async def export_provenance_documet(provenance: ExportRequest):
    # Create a PROV document
    d1 = ProvDocument()

    # Define namespaces as per the PROV
    d1.add_namespace('prov', 'http://www.w3.org/ns/prov#')
    d1.add_namespace('xsd', 'http://www.w3.org/2001/XMLSchema#')
    d1.add_namespace('foaf', 'http://xmlns.com/foaf/0.1/')
    d1.add_namespace('rdf', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#')
    d1.add_namespace('ex', 'http://example.org/')
    d1.add_namespace('tmpl', 'http://openprovenance.org/tmpl#')
    d1.add_namespace('var', 'http://openprovenance.org/var#')

    # Add entities
    for entity in provenance.entities:
        eId = f"var:{quote(entity.entity_id)}"
        d1.entity(eId, {
            "prov:type": f"tmpl:{quote(entity.entity_type)}",
            "foaf:name": entity.name,
            "prov:description": entity.description,
            "xsd:date": entity.date,
            "prov:location": entity.location,
            "prov:version": entity.version
        })
    
    # Add activities
    for activity in provenance.activities:
        aId = f"var:{quote(activity.activity_id)}"
        d1.activity(aId, activity.start_time, activity.end_time, {
            "foaf:name": activity.name,
            "prov:description": activity.description
        })
    
    # Add agents
    for agent in provenance.agents:
        agId = f"var:{quote(agent.agent_id)}"
        d1.agent(agId, {
            "prov:type": f"foaf:{quote(agent.agent_type)}",
            "foaf:name": agent.name,
            "prov:description": agent.description
        })
    
    # Add relationships
    for relationship in provenance.relationships:
        subject = f"var:{quote(relationship.subject)}"
        obj = f"var:{quote(relationship.object)}"
        
        if relationship.relationship == "wasGeneratedBy":
            d1.wasGeneratedBy(subject, obj)
        elif relationship.relationship == "used":
            d1.used(subject, obj)
        elif relationship.relationship == "WasInvalidatedBy":
            d1.wasInvalidatedBy(subject, obj)
        elif relationship.relationship == "wasDerivedFrom":
            d1.wasDerivedFrom(subject, obj)
        elif relationship.relationship == "hadMember":
            d1.hadMember(subject, obj)
        elif relationship.relationship == "WasStartedBy":
            d1.wasStartedBy(subject, obj)
        elif relationship.relationship == "WasEndedBy":
            d1.wasEndedBy(subject, obj)
        elif relationship.relationship == "wasAssociatedWith":
            d1.wasAssociatedWith(subject, obj)
        elif relationship.relationship == "actedOnBehalfOf":
            d1.actedOnBehalfOf(subject, obj)
        elif relationship.relationship == "wasAttributedTo":
            d1.wasAttributedTo(subject, obj)
        elif relationship.relationship == "wasInformedBy":
            d1.wasInformedBy(subject, obj)
    
    # Determine the format to return
    if provenance.docFormat == "provn":
        output = d1.get_provn()
    elif provenance.docFormat == "provJson":
        output = d1.serialize(format='json')
    elif provenance.docFormat == "provXml":
        output = d1.serialize(format='xml')
    elif provenance.docFormat == "provRdf":
        output = d1.serialize(format='rdf', rdf_format='ttl')
    else:
        raise HTTPException(status_code=400, detail="Invalid format")

    return PlainTextResponse(content=output, media_type="application/octet-stream")
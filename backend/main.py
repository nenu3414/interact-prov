from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from prov.model import ProvDocument
from provstore.api import Api
from prov.dot import prov_to_dot
import os
import pydot
from fastapi.responses import FileResponse, RedirectResponse
import requests
from dotenv import load_dotenv
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta


app = FastAPI()

load_dotenv()

PROVSTORE_API_KEY = os.getenv("PROVSTORE_API_KEY")
PROVSTORE_API_URL = os.getenv("PROVSTORE_API_URL")
USERID = os.getenv("USERNAME")

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
    consumed: str
    generated: str

class Agent(BaseModel):
    agent_id: str
    agent_type: str
    name: str
    description: str

class Relationship(BaseModel):
    relationship_id: str
    subject: str
    relationship_type: str
    object: str

class Document(BaseModel):
    document_name: str
    author: str
    is_public: bool

class ProvenanceRequest(BaseModel):
    entities: List[Entity]
    activities: List[Activity]
    agents: List[Agent]
    relationships: List[Relationship]
    # documents: List[Document]

@app.get("/")
async def root():
    return RedirectResponse(url="/prov")

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

        response = requests.get(PROVSTORE_API_URL, params=params)

        if response.status_code == 200:
            documents = response.json()
            return {"public_documents": documents}
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
        d1.wasGeneratedBy(f"tmpl:{activity.generated}", aId)
    
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
        if relationship.relationship_type == "used":
            d1.used(f"var:{relationship.object}", f"var:{relationship.subject}")
        elif relationship.relationship_type == "hadMember":
            d1.hadMember(f"var:{relationship.subject}", f"var:{relationship.object}")

    # provn_output = d1.get_provn()

    # # Return the PROV-N as a plain text response
    # return {"provn": provn_output}
    
    # Convert the PROV document to a DOT format using prov_to_dot
    dot = prov_to_dot(d1)

    # Get the DOT source as a string
    dot_source = dot.to_string()

    # Render the graph to a file (PNG format)
    # output_file_path = "prov_graph.png"
    # dot.write_png(output_file_path)

    # Return the PNG file as a response
    # return FileResponse(output_file_path)
    return {"dot": dot_source}

@app.post("/prov/export-prov")
async def export_provenance_documet(provenance: ProvenanceRequest):
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
        d1.wasGeneratedBy(f"tmpl:{activity.generated}", aId)
    
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
        if relationship.relationship_type == "used":
            d1.used(f"var:{relationship.object}", f"var:{relationship.subject}")
        elif relationship.relationship_type == "hadMember":
            d1.hadMember(f"var:{relationship.subject}", f"var:{relationship.object}")

    provn_output = d1.get_provn()

    # Return the PROV-N as a plain text response
    return {"provn": provn_output}
    
    # # Convert the PROV document to a DOT format using prov_to_dot
    # dot = prov_to_dot(d1)

    # # Render the graph to a file (PNG format)
    # output_file_path = "prov_graph.png"
    # dot.write_png(output_file_path)

    # # Return the PNG file as a response
    # return FileResponse(output_file_path)  
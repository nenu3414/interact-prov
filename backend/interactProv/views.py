from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Provenance
from .api_serializers import ProvenanceSerializer

# Utils
from prov.model import ProvDocument
from .prov_utils import upload_prov_document, get_prov_document

@api_view(['POST'])
def create_provenance(request):
    serializer = ProvenanceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Create a new PROV document
    prov_doc = ProvDocument()

    # Example: Adding entity, activity, and agent from request data
    entity_id = data.get('entity_id', 'example:entity')
    entity = prov_doc.entity(entity_id, {'prov:label': 'Example Entity'})

    activity_id = data.get('activity_id', 'example:activity')
    activity = prov_doc.activity(activity_id, '2024-07-26T10:00:00', None, {'prov:label': 'Example Activity'})

    agent_id = data.get('agent_id', 'example:agent')
    agent = prov_doc.agent(agent_id, {'prov:label': 'Example Agent'})

    prov_doc.wasGeneratedBy(entity, activity)
    prov_doc.wasAssociatedWith(activity, agent)

    # Upload the document to ProvStore
    document_name = data.get('document_name', 'example_prov_document')
    response = upload_prov_document(prov_doc, document_name)

    # Save locally
    provenance = Provenance(document_id=response['id'], description=data.get('description', ''))
    provenance.save()

    return Response(response, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_provenance(request, document_id):
    try:
        response = get_prov_document(document_id)
    except requests.exceptions.RequestException as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response(response, status=status.HTTP_200_OK)

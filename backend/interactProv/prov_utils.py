import requests
from prov.model import ProvDocument
import os
from provstore.api import Api
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

PROVSTORE_API_KEY = os.getenv("API_KEY")
PROVSTORE_API_URL = os.getenv("API_URL")
USERID = os.getenv("USERID")

api = Api(base_url= PROVSTORE_API_URL, username= USERID, api_key= PROVSTORE_API_KEY)

def upload_prov_document(prov_document, document_name):
    headers = {
        'Authorization': f'ApiKey {PROVSTORE_API_KEY}',
        'Content-Type': 'application/json',
    }
    data = {
        'document': prov_document.serialize(indent=2),
        'public': True,
        'rec_id': document_name,
    }
    response = requests.post(PROVSTORE_API_URL, headers=headers, json=data)
    response.raise_for_status()
    return response.json()

def get_prov_document(document_id):
    headers = {
        'Authorization': f'ApiKey {PROVSTORE_API_KEY}',
    }
    response = requests.get(f'{PROVSTORE_API_URL}{document_id}/', headers=headers)
    response.raise_for_status()
    return response.json()

from rest_framework import serializers
from .models import Provenance

class ProvenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provenance
        fields = '__all__'
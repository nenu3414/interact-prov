from django.db import models

# Create your models here.
class Provenance(models.Model):
    document_id = models.CharField(max_length=100)
    entity = models.CharField(max_length=200)
    activity = models.CharField(max_length=200)
    agent = models.CharField(max_length=200)
    generated_at_time = models.DateTimeField(auto_now_add=True)
    used = models.CharField(max_length=200, null=True, blank=True)
    was_influenced_by = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField()

    def __str__(self):
        return self.document_id
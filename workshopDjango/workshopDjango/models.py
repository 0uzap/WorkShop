from django.db import models
from django.contrib.auth.models import User
import uuid

class Session(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    started_at = models.DateTimeField(null=True, blank=True)
    max_players = models.IntegerField(default=4)
    class Meta:
        app_label = 'workshopDjango'

class Player(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, default="joueur")
    joined_at = models.DateTimeField(auto_now_add=True)
    ready = models.BooleanField(default=False)  # joueur prêt ou non
    class Meta:
        app_label = 'workshopDjango'

class Progress(models.Model):
    session = models.OneToOneField(Session, on_delete=models.CASCADE, primary_key=True)
    room_state = models.JSONField(default=dict)
    fragments = models.JSONField(default=dict)
    time_remaining = models.IntegerField(default=0)
    class Meta:
        app_label = 'workshopDjango'

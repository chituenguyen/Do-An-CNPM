from django.contrib.auth.models import User
from django.db.models.signals import pre_save


def save_profile(sender, instance, **kwargs):
    print(instance.email)
    if instance.email != '':
        instance.username = instance.email


pre_save.connect(save_profile, sender=User)

from django.db import models
from django.contrib.postgres.fields import ArrayField

from django.contrib.postgres.fields import JSONField


class Helper(models.Model):
    name = models.CharField(max_length=70, blank=False, default='')
    email = models.CharField(max_length=70, blank=False, default='')
    skills= ArrayField(models.CharField(max_length=200,blank=False, default=''))
    available = models.CharField(max_length=5000, blank=False, default='')


class Problem(models.Model):
    problem_description = models.CharField(max_length=200,blank=False, default='')
    
class HelperDate(models.Model):
    name = models.CharField(max_length=70, blank=False, default='')
    date= models.CharField(max_length=2000,blank=False, default='')


class HelperSkill(models.Model):
    name = models.CharField(max_length=70, blank=False, default='')
    skill = models.CharField(max_length=200,blank=False, default='')

class MeetingTable(models.Model):
    meetingcode = models.CharField(max_length=70, blank=False, default='')
    helpername = models.CharField(max_length=70, blank=False, default='')
    meetingdate = models.CharField(max_length=70, blank=False, default='')
    meetingdate_long = models.CharField(max_length=70, blank=False, default='')
    meetinglink = models.CharField(max_length=700, blank=False, default='')
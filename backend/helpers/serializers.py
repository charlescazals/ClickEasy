from rest_framework import serializers 
from helpers.models import Helper
from helpers.models import Problem
from helpers.models import HelperDate
from helpers.models import HelperSkill
from helpers.models import MeetingTable
 
 
class HelperSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Helper
        fields = ('id',
                  'name',
                  'email',
                  'skills',
                  'available')


class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ('id', 'problem_description')


class HelperDateSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = HelperDate
        fields = ('id',
                  'name',
                  'date',
                  )


class HelperSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = HelperSkill
        fields = ('id',
                  'name',
                   'skill')

class MeetingTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingTable
        fields = ('meetingcode', 'helpername', 'meetingdate', 'meetinglink', 'meetingdate_long')
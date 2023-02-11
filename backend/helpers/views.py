from django.shortcuts import render

from helpers.models import Helper
from helpers.models import Problem
from helpers.models import HelperDate
from helpers.models import HelperSkill
from helpers.models import MeetingTable

from helpers.serializers import HelperSerializer
from helpers.serializers import ProblemSerializer
from helpers.serializers import HelperDateSerializer
from helpers.serializers import HelperSkillSerializer
from helpers.serializers import MeetingTableSerializer

from django.http import JsonResponse
from rest_framework.parsers import JSONParser

from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view

import json
from django.db import connection
import collections

from .utils import my_custom_sql, is_subset

import requests
import time
from django.core.mail import send_mail

import stripe

################################################################################################################################
#GET list of helperss, 
#POST a new helper, his skills and availabilities
#DELETE all helpers


@api_view(['GET', 'POST', 'DELETE'])
@csrf_exempt
def helper_list(request):
    if request.method == 'GET':
        helpers = Helper.objects.all()
        
        name = request.GET.get('name', None)
        if name is not None:
            helpers = helpers.filter(name__icontains=name)
        
        helpers_serializer = HelperSerializer(helpers, many=True)
        return JsonResponse(helpers_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        helper_data = JSONParser().parse(request)
        helper_serializer = HelperSerializer(data=helper_data)

        ##helper skills
        for skill in helper_data['skills']:
            helper = {'name': helper_data['name'],
                      'skill': skill}

            helper_skill_serializer = HelperSkillSerializer(data = helper)
            if helper_skill_serializer.is_valid():
                helper_skill_serializer.save()
            else:
                print("problem with helper_skills_serializer")
        ###end helperskill###

         ###helperdate new table###
        helper_avaibility = json.loads(helper_data['available'])
        for daytime, days in helper_avaibility.items():
            for day in days.keys():
                helper_date = daytime+'_'+day
                helper = {'name': helper_data['name'],
                        'date': helper_date}
                helper_date_serializer = HelperDateSerializer(data = helper)
                
                if helper_date_serializer.is_valid():
                    
                    helper_date_serializer.save()
                else:
                    print("problem with helper_date_serializer")
        ###end helperdate###

        if helper_serializer.is_valid():
            print('errors: ',helper_serializer.errors) 
            helper_serializer.save()
            return JsonResponse(helper_serializer.data, status=status.HTTP_201_CREATED) 
        print(helper_serializer.errors) 

        return JsonResponse(helper_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'DELETE':
        count = Helper.objects.all().delete()
        return JsonResponse({'message': '{} helpers were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)

################################################################################################################################
#Get a helper by id
#Not used in final version

 
@api_view(['GET', 'PUT', 'DELETE'])
@csrf_exempt
def helper_detail(request, pk):
    # find helpers by pk (id)
    try: 
        helpers = Helper.objects.get(pk=pk) 
    except Helper.DoesNotExist: 
        return JsonResponse({'message': 'The helpers does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        helper_serializer = HelperSerializer(helpers) 
        return JsonResponse(helper_serializer.data) 
    elif request.method == 'PUT': 
        helper_data = JSONParser().parse(request) 
        helper_serializer = HelperSerializer(helpers, data=helper_data) 
        if helper_serializer.is_valid(): 
            helper_serializer.save() 
            return JsonResponse(helper_serializer.data) 
        return JsonResponse(helper_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    elif request.method == 'DELETE': 
        Helper.delete() 
        return JsonResponse({'message': 'helper was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

################################################################################################################################
#Not used in final version
        
@api_view(['GET'])
@csrf_exempt
def helper_list_published(request):
    # GET all published helperss
    helpers = Helper.objects.filter(published=True)
        
    if request.method == 'GET': 
        helpers_serializer = HelperSerializer(helpers, many=True)
        return JsonResponse(helpers_serializer.data, safe=False)


################################################################################################################################
#adds problem to dbase + depreciated version of matching helpers
"""
@api_view(['GET', 'POST'])
@csrf_exempt
def helper_matched(request):
    if request.method == 'GET':
        problems = Problem.objects.all()
        
        problem_description = request.GET.get('problem_description', None)
        if problem_description is not None:
            problems = problems.filter(name__icontains=problem_description)
        
        problems_serializer = ProblemSerializer(problems, many=True)
        return JsonResponse(problems_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
     
        result = []
        problem_data = JSONParser().parse(request) #that's the problem description
        helpers = Helper.objects.all() #here we retrieve all the helpers
        helpers_list = list(helpers) #cast it into a list format


        for sentence in problem_data.values(): #in fact there's only one sentence
            skills_needed = sentence.replace('\n', ' ').split(' ') 
            for helper in helpers_list:
                if is_subset(helper.skills, skills_needed):
                    result.append(helper.name)


        problem_serializer = ProblemSerializer(data=problem_data)

        helpers = helpers.filter(name__in=result)
        helpers_serializer = HelperSerializer(helpers, many=True)
        if problem_serializer.is_valid():            
            problem_serializer.save()
            return JsonResponse(helpers_serializer.data, safe=False)
"""

################################################################################################################################


#POST: posts user problem in the database and make a sql query to retrieve helpers that have the corresponding skills for the problem

@api_view(['POST'])
@csrf_exempt
def getCalendar(request):

    if request.method == 'POST':

        with connection.cursor() as cursor:
            cursor.execute("""
                select distinct skill from "public"."helpers_helperskill" 
            """)
            skills_available = [x[0] for x in cursor.fetchall()]

        problem_data = JSONParser().parse(request)
        for sentence in problem_data.values():
            skills_needed = sentence.replace('\n', ' ').split(' ')

        skills_to_query = []
        for skill_needed in skills_needed:
            if skill_needed in skills_available:
                skills_to_query.append(skill_needed)

        calendar = []
        sql_query =  my_custom_sql(skills_to_query)
        for date, names in sql_query:
            temp = dict.fromkeys(["date", "names", 'skills'])
            temp["date"] = date
            temp["names"] =  names
            temp['skills'] = "_".join(skills_to_query)
            temp = collections.OrderedDict(temp)

            calendar.append(temp)
  
        return JsonResponse(calendar, safe = False)

################################################################################################################################

#updates the meeting table with a POST request when a users selects a slot
#retrieves the corresponding helper with a GET request when a user enters a meeting code in the EnterCode pages

@api_view(['POST', 'GET'])
@csrf_exempt
def meetings_table(request):

    if request.method == 'POST':
        meeting_info = JSONParser().parse(request)
        print(meeting_info)
       
        meeting_info_serializer = MeetingTableSerializer(data=meeting_info)

    
        if meeting_info_serializer.is_valid():            
            meeting_info_serializer.save()
            return JsonResponse(meeting_info_serializer.data, safe=False)

    elif request.method == 'GET':
        #print(JSONParser().parse(request))
        code = request.GET.get('meetingcode')
        print("code: ",code)
        if code:
            code = code.replace(' ', '')
            code = code.replace('\n', '')
        meetings = MeetingTable.objects.all()
        if code:
            meetings = meetings.filter(meetingcode=code)
        
        meetings_serializer =MeetingTableSerializer(meetings, many=True)
        return JsonResponse(meetings_serializer.data, safe=False)
        # 'safe=False' for objects serialization

################################################################################################################################
@api_view(['POST'])
@csrf_exempt
def createRoom(request):
    meeting_code = JSONParser().parse(request)['meetingcode']
    print("meeting code: ", meeting_code)
    url = "https://api.daily.co/v1/rooms"

    payload = {
        "properties": {
            "enable_screenshare": True,
            "start_video_off": False,
            "start_audio_off": False,
            "exp": time.time() + 3600
        },
        "name": meeting_code,
        "privacy": "public"
    }
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer fce7c367072fe2be5daa91375b5d3fb44c273dd2a04f623cd3ff415958737264"
    }

    response = requests.request("POST", url, json=payload, headers=headers)
    print('\nresponse: ', response.text, '\n')
    return JsonResponse(response.text, safe = False)

##########Payment################

stripe.api_key = "sk_test_51IfNmREhqYCIwKuUo3fgRjzIlAbp3smycfzqcl1NcETUfV7lEMmjIiVaK1bYtqBf4lVqYelQT97zWWSzQTZBbNCB00c8zKHy8o" # your real key will be much longer


@api_view(['POST'])
@csrf_exempt
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000, currency='pln', 
        payment_method_types=['card'],
        receipt_email='test@example.com')
    return JsonResponse(status=status.HTTP_200_OK, data=test_payment_intent)

@api_view(['POST'])
@csrf_exempt
def save_stripe_info(request):
    data = request.data
    email = data['email']
    payment_method_id = data['payment_method_id']
    extra_msg = '' # add new variable to response message
    # checking if customer with provided email already exists
    customer_data = stripe.Customer.list(email=email).data   

    # if the array is empty it means the email has not been used yet  
    if len(customer_data) == 0:
    # creating customer
        customer = stripe.Customer.create(
        email=email, payment_method=payment_method_id)
    else:
        customer = customer_data[0]
        extra_msg = "Customer already existed."

    stripe.PaymentIntent.create(
        customer=customer, 
        payment_method=payment_method_id,  
        currency='pln', # you can provide any currency you want
        amount=1500, #
        confirm=True)
    
    return JsonResponse(status=status.HTTP_200_OK, 
    data={'message': 'Success', 'data': {
        'customer_id': customer.id, 'extra_msg': extra_msg}
   })                                                        

"""
  [OrderedDict([('date', 'day_1'), ('names', ['tommy'])]), 
  OrderedDict([('date', 'day_2'), ('names', ['tommy'])]), 
  OrderedDict([('date', 'morning_1'), ('names', ['vincent', 'tommy'])]), 
  OrderedDict([('date', 'morning_2'), ('names', ['vincent', 'tommy'])]), 
  OrderedDict([('date', 'morning_3'), ('names', ['vincent'])]), 
  OrderedDict([('date', 'morning_4'), ('names', ['vincent'])]), 
  OrderedDict([('date', 'morning_5'), ('names', ['vincent'])]), 
  OrderedDict([('date', 'morning_6'), ('names', ['vincent'])]), 
  OrderedDict([('date', 'morning_7'), ('names', ['vincent'])])]
  """
from django.shortcuts import render
from django.contrib.auth.models import User, Group
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from .serializers import UserSerializer #,GroupSerializer
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from .models import courseAgenda, courseSubmissionText
import json

# Create your views here.



@csrf_exempt
def authenticateAPI(request):

    status = {
        'success': True,
    }

    if request.user.is_authenticated:
        print("Already logged in")
        return JsonResponse(status)


    if(request.method == 'GET'):
        print("GET user..")
        status['success'] = False
        return JsonResponse(status)
    elif(request.method == 'POST'):
        print("POST user..", request.body)
    else:
        print("Request is:", request.method)
        status['success'] = False
        return JsonResponse(status)

    userData = json.loads(request.body)

    if(not User.objects.filter(username=userData['mail']).exists()):
        print("creating user...")
        User.objects.create_user(username=userData['mail'], password=userData['ID'])
    
    auth = authenticate(username=userData['mail'], password=userData['ID'])
    print("Auth: ", auth)
    if auth is not None:
        login(request, auth)
        return JsonResponse(status)
    else:
        status['success'] = False
        return JsonResponse(status)

    return JsonResponse(status)

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


@csrf_exempt
def courseData():
    pass


@csrf_exempt
def saveAgenda(request):

    user = request.user
    print("Hello mr", user.username, "!")

    agenda = json.loads(request.body)
    print("Course", agenda['courseID'])
    print("Agenda: ", agenda['text'])

    if(not courseAgenda.objects.filter(userKey=user, courseKey=agenda['courseID']).exists()):
        newAgendaEntry = courseAgenda(userKey=user, courseKey=agenda['courseID'], text="")
        newAgendaEntry.save()

        print("No such course")

    agendaEntry = courseAgenda.objects.get(userKey=user, courseKey=agenda['courseID'])
    agendaEntry.text = agenda['text']
    agendaEntry.save()
    print("saved agenda entry")

    # Check if agenda exist for course
        #Create
    #Update Values



    return JsonResponse({})

@csrf_exempt
def loadAgenda(request):
    requestData = json.loads(request.body)
    
    user = request.user
    print("request data:")
    print("User:", user)
    print("Request", requestData['courseID'])

    try:
        agendaEntry = courseAgenda.objects.get(userKey=user, courseKey=requestData['courseID'])
        print("Agenda: ", agendaEntry)

        agenda = {
            'text' : agendaEntry.text,
        }
        return JsonResponse(agenda)
    except:
        return JsonResponse({})

@csrf_exempt
def loadSubmissionText(request):
    requestData = json.loads(request.body)
    print("Submission Text Request:")
    print(requestData)

    try:
        user = request.user

        if (courseSubmissionText.objects.filter(userKey=user, student=requestData['stu'], submission=requestData['sub']).exists()):
            submissionText = courseSubmissionText.objects.get(userKey=user, student=requestData['stu'], submission=requestData['sub'])
            subText = {
                'sub' : requestData['sub'],
                'text' : submissionText.text,
            }
            return JsonResponse(subText)
    except:
        print("E: Cant save submission. :(")

    return JsonResponse({})

@csrf_exempt
def saveSubmissionText(request):
    requestData = json.loads(request.body)
    print("Submission Save Text Request:")
    print(requestData)
    
    try:
        user = request.user

        if (courseSubmissionText.objects.filter(userKey=user, student=requestData['stu'], submission=requestData['sub']).exists()):
            submissionText = courseSubmissionText.objects.get(userKey=user, student=requestData['stu'], submission=requestData['sub'])
            submissionText.text = requestData['text']
            submissionText.save()
        else:
            submissionText = courseSubmissionText(userKey=user, student=requestData['stu'], submission=requestData['sub'], text=requestData['text'])
            submissionText.save()
    except:
        print("E: Cant save submission. :(")


    return JsonResponse({})
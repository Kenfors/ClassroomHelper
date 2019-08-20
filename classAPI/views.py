from django.shortcuts import render
from django.contrib.auth.models import User, Group
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from .serializers import UserSerializer #,GroupSerializer
from django.contrib.auth import authenticate
from django.http import JsonResponse
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
        User.objects.create_user(username=userData['mail'], password=userData['ID'])
    
    auth = authenticate(username=userData['mail'], password=userData['ID'])
    if auth is not None:
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
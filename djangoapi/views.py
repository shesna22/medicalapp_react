from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.status import (HTTP_400_BAD_REQUEST,HTTP_404_NOT_FOUND,HTTP_200_OK,HTTP_201_CREATED)
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from djangomain.models import medicine_register
from .serializers import MedicineListSerializer
from rest_framework import serializers
from django.db.models import Q

# Create your views here.

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))

def signupapi(request):
    username=request.data.get("username")
    email=request.data.get("email")
    password=request.data.get("password")
    password_confirmation=request.data.get("password_confirmation")

    if username is None or email is None or password is None or password_confirmation is None:
        return Response({'error':'please provide username,email,password and confirm password'},status=HTTP_400_BAD_REQUEST)
    if password!=password_confirmation:
        return Response({'error':"Your password and confirm password are not same!!"},status=HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({"error":"Username already taken"},status=HTTP_400_BAD_REQUEST)
    if User.objects.filter(email=email).exists():
        return Response({"error":"email already taken"},status=HTTP_400_BAD_REQUEST)
    user=User.objects.create_user(username=username,password=password,email=email)
    user.save()
    return Response({'success':'user created successfully'},status=HTTP_201_CREATED)

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))

def loginapi(request):
    email = request.data.get("email")
    password = request.data.get("password")
    if email is None or password is None:
        return Response({'error': 'Please provide both email and password'},
                        status=HTTP_400_BAD_REQUEST)
    try:
        user=User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error':'invalid credential'},
                        status=HTTP_404_NOT_FOUND)
    user = authenticate(username=user.username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key}, status=HTTP_200_OK)
@csrf_exempt
@api_view(["POST"])
def logoutapi(request):
    request.user.auth_token.delete()
    return Response({"Status":"User Logout Sucessfully"},status=HTTP_200_OK)


@csrf_exempt
@api_view(["POST"])
@permission_classes([IsAuthenticated])

def add_medicine(request):
    if request.method=='POST':
        serializer=MedicineListSerializer(data=request.data)
        if serializer.is_valid():
            medicine=serializer.save()
            response_data={
                "id":medicine.id,
                "name":medicine.name,
                "company":medicine.company,
                "expiry_date":medicine.expiry_date,
            }
            return Response(response_data,status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(["GET"])
@permission_classes([IsAuthenticated]) 


def list_medicine(request):
    if request.method=="GET":
        medicine=medicine_register.objects.all()
        serializer=MedicineListSerializer(medicine,many=True)
        return Response(serializer.data)
    

@csrf_exempt
@api_view(["PUT"])
@permission_classes((AllowAny,))  

def update_medicine(request,id):
    medicine=medicine_register.objects.get(id=id)
    serializer=MedicineListSerializer(instance=medicine,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=HTTP_200_OK)
    else:
        return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)    
    

@csrf_exempt
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])  

def delete_medicine(request,id):
    medicine=medicine_register.objects.get(id=id)
    medicine.delete()
    return Response("Deleted")


@csrf_exempt
@api_view(["GET"])
@permission_classes((AllowAny,))  

def search(request,query):
        medicines=medicine_register.objects.filter(name=query)
        serializer=MedicineListSerializer(medicines,many=True)
        return Response(serializer.data,status=HTTP_200_OK)
@csrf_exempt
@api_view(["GET"])
@permission_classes((AllowAny,)) 
def viewapi(request,id):
    try:
        viewdetails=medicine_register.objects.get(id=id)
        view=MedicineListSerializer(viewdetails)
        return Response(view.data,status=HTTP_200_OK)
    except medicine_register.DoesNotExist:
        return Response({"error":"Medicin not found"},status=HTTP_404_NOT_FOUND)
    
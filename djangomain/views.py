from django.shortcuts import render,redirect
from . models import *
from django.contrib.auth.models  import User,auth
from django.contrib.auth import logout
from django.contrib import messages
from django.contrib.auth import authenticate

from .forms import Updateform
from django.contrib.auth.decorators import login_required


def login(request):
    if request.method == "POST":
        username=request.POST['username']
        password=request.POST['password']
        user=auth.authenticate(username=username, password=password)
        if user is not None:
           # redirect to a success page

            auth.login(request,user)
            return redirect('list_medicin')
        else:
            messages.info(request,"invalid login")
            return redirect('login')
    else:
            # User is authenticated
       return render(request,"login.html")    
    
    
def logout(request):
    auth.logout(request)
    return redirect('login')  
 
def register(request):
    if request.method == "POST":
        username=request.POST['username']
        email=request.POST['email']
        password=request.POST['password']
        if User.objects.filter(username=username).exists():
            messages.info(request,"username already exists")
            return redirect('register')
        elif User.objects.filter(email=email).exists():
            messages.info(request,"email taken")  
            return redirect('register')
        else:  
            user=User.objects.create_user(username=username,email=email,password=password)
            user.save();
        return redirect('login')
        
    else:
        return render(request,"register.html")


@login_required
def add_medicin(request):
    if request.method=="POST":
        medicin_rec=medicine_register()
        medicin_rec.id=request.POST['id']
        medicin_rec.mname=request.POST['name']
        medicin_rec.company=request.POST['company']
        medicin_rec.expiry_date=request.POST['expiry_date']
        medicin_rec.save()
        return redirect(list_medicin)
    return render(request,'add_medicin.html')

@login_required
def list_medicin(request):
    medicin_rec=medicine_register.objects.all()
    return render(request,'list_medicin.html',{'medicin_rec':medicin_rec})

@login_required
def delete(request,id):
    medicine=medicine_register.objects.all().get(id=id)
    medicine.delete()
    return redirect(list_medicin)

@login_required
def update(request,id):
    edit=medicine_register.objects.get(id=id)
    f=Updateform(instance=edit)
    if request.method=='POST':
        f=Updateform(request.POST,instance=edit)
        if f.is_valid():
            f.save()
        return redirect(list_medicin)
    return render(request,'update.html',{'f':f}) 

def search(request):
    medicin_rec=medicine_register.objects.all()
    if request.method=="GET":
        st=request.GET.get('mname')
        if st!=None:
            medicin_rec=medicine_register.objects.filter(mname=st)
        return render(request,'search.html',{'medicin_rec':medicin_rec})
    
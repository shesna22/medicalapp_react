from django.urls import path
from.import views
from django.contrib import admin
urlpatterns = [
    path('register/',views.register,name="register"),
    path('logout/',views.logout,name="logout"),
    path('',views.login,name="login"),
    path('add_medicin/',views.add_medicin,name="add_medicin"),
    path('delete/<int:id>',views.delete),
    path('update/<int:id>',views.update),
    path('search/',views.search,name="search"),
    path('list_medicin/',views.list_medicin,name="list_medicin") ,
    
]

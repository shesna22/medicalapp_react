from django.urls import path
from.import views
urlpatterns = [
    path("signupapi",views.signupapi,name='signupapi'),
    path("loginapi",views.loginapi,name='loginapi'),
    path("add",views.add_medicine,name="add_medicine"),
    path("list",views.list_medicine,name="list_medicine"),
    path("update/<int:id>",views.update_medicine,name="update_medicine"),
    path("delete/<int:id>",views.delete_medicine,name="delete_medicine"),
    path("search/<str:query>",views.search,name="search"),
    path("logoutapi",views.logoutapi,name='logoutapi'),
    path("viewapi/<int:id>",views.viewapi,name='viewapi'),


]
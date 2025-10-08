"""
URL configuration for workshopDjango project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', views.login_api, name='login_api'),
    path('api/register/', views.register_api, name='register_api'),
     # 🎮 Routes du jeu
    #path('api/create-session/', views.create_session, name='create_session'),
    path('api/join-session/', views.join_session, name='join_session'),
    path('api/solve-puzzle/', views.solve_puzzle),
    path('api/progress/<str:session_id>/', views.get_progress),
    path('api/add-players/', views.add_players_to_session, name='add_players_to_session'),
    path('api/player-ready/', views.player_ready, name='player_ready'),
    path('api/start-game/', views.start_game, name='start_game'),
    path('api/session-status/', views.session_status, name='session_status'),

]

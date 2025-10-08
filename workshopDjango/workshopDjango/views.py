from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import ChatMessage, Session, Player, Progress
from django.utils import timezone

import json

@csrf_exempt
def login_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)

                # ✅ Création automatique de session si elle n'existe pas
                session = Session.objects.filter(creator=user, started_at__isnull=True).first()
                if not session:
                    session = Session.objects.create(creator=user)
                    Player.objects.create(session=session, user=user, role="joueur")
                    Progress.objects.create(session=session, room_state={}, fragments={}, time_remaining=0)

                # Récupérer les joueurs déjà dans la session
                players = Player.objects.filter(session=session)
                players_list = [{"id": p.user.id, "username": p.user.username, "ready": p.ready} for p in players]

                return JsonResponse({
                    "status": "success",
                    "message": "Connexion réussie",
                    "user": user.username,
                    "user_id": user.id,
                    "session_id": str(session.id),
                    "players_in_session": players_list
                }, status=200)

            else:
                return JsonResponse({
                    "status": "error",
                    "message": "Nom d'utilisateur ou mot de passe incorrect"
                }, status=401)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Format JSON invalide"}, status=400)

    return JsonResponse({"error": "Méthode non autorisée"}, status=405)


@csrf_exempt
def register_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            # Vérifier si l'utilisateur existe déjà
            if User.objects.filter(username=username).exists():
                return JsonResponse({"status": "error", "message": "Ce nom d'utilisateur existe déjà"}, status=400)

            # Créer l'utilisateur
            user = User.objects.create_user(username=username, password=password)
            return JsonResponse({"status": "success", "message": "Utilisateur créé avec succès", "user": user.username}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"status": "error", "message": "Format JSON invalide"}, status=400)

    return JsonResponse({"status": "error", "message": "Méthode non autorisée"}, status=405)



@csrf_exempt
def join_session(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        session_id = data.get('session_id')
        user_id_to_add = data.get('user_id')

        try:
            session = Session.objects.get(id=session_id)
        except Session.DoesNotExist:
            return JsonResponse({"status": "error", "message": "Session non trouvée"}, status=404)

        if Player.objects.filter(session=session).count() >= session.max_players:
            return JsonResponse({"status": "error", "message": "Session complète"}, status=400)

        try:
            user_to_add = User.objects.get(id=user_id_to_add)
        except User.DoesNotExist:
            return JsonResponse({"status": "error", "message": "Utilisateur à ajouter non trouvé"}, status=404)

        if Player.objects.filter(session=session, user=user_to_add).exists():
            return JsonResponse({"status": "error", "message": "Utilisateur déjà dans la session"}, status=400)

        Player.objects.create(session=session, user=user_to_add, role="joueur")
        return JsonResponse({"status": "success", "message": f"Utilisateur {user_to_add.username} ajouté à la session"})
    
    return JsonResponse({"status": "error", "message": "Méthode non autorisée"}, status=405)


@csrf_exempt
def solve_puzzle(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            session_id = data.get('session_id')
            fragment_name = data.get('fragment')

            progress = Progress.objects.get(session__id=session_id)
            fragments = progress.fragments
            fragments[fragment_name] = True
            progress.fragments = fragments
            progress.save()

            return JsonResponse({"status": "success", "message": f"Fragment {fragment_name} résolu"}, status=200)

        except Progress.DoesNotExist:
            return JsonResponse({"status": "error", "message": "Session non trouvée"}, status=404)

def get_progress(request, session_id):
    try:
        progress = Progress.objects.get(session__id=session_id)
        return JsonResponse({
            "status": "success",
            "fragments": progress.fragments,
            "time_remaining": progress.time_remaining
        })
    except Progress.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Progression non trouvée"}, status=404)

@csrf_exempt
def start_game(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        session_id = data.get('session_id')

        try:
            session = Session.objects.get(id=session_id)
            players = Player.objects.filter(session=session)

            # Vérifier que tous les joueurs sont prêts
            if any(not p.ready for p in players):
                not_ready = [p.user.username for p in players if not p.ready]
                return JsonResponse({
                    "status": "error",
                    "message": "Tous les joueurs ne sont pas prêts",
                    "not_ready_players": not_ready
                }, status=400)

            # Démarrer le jeu
            session.started_at = timezone.now()
            session.save()

            progress = Progress.objects.get(session=session)
            progress.time_remaining = 45 * 60  # 45 minutes en secondes
            progress.save()

            return JsonResponse({
                "status": "success",
                "message": "Le jeu a commencé",
                "time_remaining": progress.time_remaining
            })

        except Session.DoesNotExist:
            return JsonResponse({"status": "error", "message": "Session non trouvée"}, status=404)

    return JsonResponse({"status": "error", "message": "Méthode non autorisée"}, status=405)



@csrf_exempt
def add_players_to_session(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            session_id = data.get('session_id')
            user_ids = data.get('user_ids', [])  # Liste des IDs des utilisateurs à ajouter

            session = Session.objects.get(id=session_id)
            current_players = Player.objects.filter(session=session)
            current_players_count = current_players.count()

            # Liste des joueurs déjà présents
            existing_players = [{"id": p.user.id, "username": p.user.username} for p in current_players]

            # Vérifier que la session ne dépasse pas 4 joueurs
            if current_players_count + len(user_ids) > 4:
                return JsonResponse({
                    "status": "error",
                    "message": "Limite de 4 joueurs par session dépassée",
                    "current_players": existing_players
                }, status=400)

            added_users = []
            already_in_session = []

            for uid in user_ids:
                try:
                    user = User.objects.get(id=uid)
                except User.DoesNotExist:
                    continue  # Ignorer si utilisateur inexistant

                if Player.objects.filter(session=session, user=user).exists():
                    already_in_session.append({"id": user.id, "username": user.username})
                    continue  # Ignorer si déjà dans la session

                Player.objects.create(session=session, user=user, role="joueur")
                added_users.append({"id": user.id, "username": user.username})

            response = {
                "status": "success",
                "added_users": added_users,
                "already_in_session": already_in_session,
                "current_players": [{"id": p.user.id, "username": p.user.username} for p in Player.objects.filter(session=session)]
            }

            return JsonResponse(response, status=200)

        except Session.DoesNotExist:
            return JsonResponse({"status": "error", "message": "Session non trouvée"}, status=404)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"status": "error", "message": "Méthode non autorisée"}, status=405)

@csrf_exempt
def player_ready(request):
    print(f"🎯 player_ready appelé - Méthode: {request.method}")
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            session_id = data.get('session_id')
            user_id = data.get('user_id')
            print(f"📝 Données reçues - session_id: {session_id}, user_id: {user_id}")

            session = Session.objects.get(id=session_id)
            player = Player.objects.get(session=session, user__id=user_id)

            player.ready = True
            player.save()
            print(f"✅ Joueur {player.user.username} marqué comme prêt")

            return JsonResponse({
                "status": "success",
                "message": f"Utilisateur {player.user.username} est prêt",
            })

        except Session.DoesNotExist:
            print(f"❌ Session non trouvée: {session_id}")
            return JsonResponse({"status": "error", "message": "Session non trouvée"}, status=404)
        except Player.DoesNotExist:
            print(f"❌ Joueur non trouvé: user_id={user_id}, session_id={session_id}")
            return JsonResponse({"status": "error", "message": "Joueur non trouvé dans la session"}, status=404)
        except Exception as e:
            print(f"❌ Erreur inattendue: {e}")
            return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"status": "error", "message": "Méthode non autorisée"}, status=405)


# views.py - Add this new endpoint
@csrf_exempt
def session_status(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        session_id = data.get('session_id')
        
        try:
            session = Session.objects.get(id=session_id)
            players = Player.objects.filter(session=session)
            
            players_list = [{
                'id': p.user.id,
                'username': p.user.username,
                'ready': p.ready
            } for p in players]
            
            return JsonResponse({
                'status': 'success',
                'players': players_list,
                'all_ready': all(p.ready for p in players),
                'game_started': session.started_at is not None
            })
        except Session.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Session not found'}, status=404)
    
    return JsonResponse({'status': 'error'}, status=405)

@csrf_exempt
def send_message(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            session_id = data.get('session_id')
            message = data.get('message')

            if not message:
                return JsonResponse({"status": "error", "message": "Message vide"}, status=400)

            try:
                session = Session.objects.get(id=session_id)
            except Session.DoesNotExist:
                return JsonResponse({"status": "error", "message": "Session non trouvée"}, status=404)

            # Vérifier que l'utilisateur est authentifié
            if not request.user.is_authenticated:
                return JsonResponse({"status": "error", "message": "Utilisateur non authentifié"}, status=401)

            # Vérifier que l'utilisateur fait partie de la session
            if not Player.objects.filter(session=session, user=request.user).exists():
                return JsonResponse({"status": "error", "message": "Utilisateur non autorisé"}, status=403)

            chat = ChatMessage.objects.create(session=session, sender=request.user, content=message)

            return JsonResponse({
                "status": "success",
                "message": "Message envoyé",
                "data": {
                    "id": chat.id,
                    "sender": chat.sender.username,
                    "content": chat.content,
                    "timestamp": chat.timestamp.strftime("%Y-%m-%d %H:%M:%S")
                }
            }, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"status": "error", "message": "Format JSON invalide"}, status=400)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"status": "error", "message": "Méthode non autorisée"}, status=405)


@csrf_exempt
def get_messages(request, session_id):
    try:
        print(f"🔍 get_messages called with session_id: {session_id}")
        print(f"👤 User authenticated: {request.user.is_authenticated}")
        print(f"👤 User: {request.user}")
        
        try:
            session = Session.objects.get(id=session_id)
            print(f"✅ Session found: {session.id}")
        except Session.DoesNotExist:
            print(f"❌ Session not found: {session_id}")
            return JsonResponse({"status": "error", "message": "Session non trouvée"}, status=404)

        # Vérifier que l'utilisateur est authentifié
        if not request.user.is_authenticated:
            print(f"❌ User not authenticated")
            return JsonResponse({"status": "error", "message": "Utilisateur non authentifié"}, status=401)

        # Vérifier que l'utilisateur appartient à cette session
        player_exists = Player.objects.filter(session=session, user=request.user).exists()
        print(f"🎮 Player exists in session: {player_exists}")
        
        if not player_exists:
            print(f"❌ User not in session")
            return JsonResponse({"status": "error", "message": "Utilisateur non autorisé"}, status=403)

        messages = ChatMessage.objects.filter(session=session).order_by("timestamp")
        print(f"💬 Found {messages.count()} messages")
        
        data = [
            {
                "sender": msg.sender.username,
                "content": msg.content,
                "timestamp": msg.timestamp.strftime("%Y-%m-%d %H:%M:%S")
            }
            for msg in messages
        ]

        return JsonResponse({"status": "success", "messages": data}, status=200)
    except Exception as e:
        print(f"💥 Exception in get_messages: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        return JsonResponse({"status": "error", "message": str(e)}, status=500)
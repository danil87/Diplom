from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import authenticate

from diplom.permissions import IsOwnerOrReadOnly, AllAccess
from .models import User
from .serializers import *
from .filters import UserFilter
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken

from django_filters.rest_framework import DjangoFilterBackend

def get_refresh(user):
    refresh = RefreshToken.for_user(user)

    refresh.payload.update({
        'user_id': user.id,
        'username': user.username
    })

    return refresh

# Create your views here.
class UserAPIList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = UserFilter
    
class UserAPICreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializerRegister
    permission_classes = [AllAccess]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = get_refresh(user)

        headers = self.get_success_headers(serializer.data)

        response = Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED, headers=headers)

        response.set_cookie('refresh', str(refresh))

        return response

class UserAPIUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsOwnerOrReadOnly]

class UserAPILogin(generics.CreateAPIView):
    permission_classes = [AllAccess]
    serializer_class = UserSerializerLogin

    def post(self, request, *args, **kwargs):
        data = request.data

        username = data.get('username', None)
        password = data.get('password', None)

        if username is None or password is None:

            return Response({'error': 'Нужен и логин, и пароль'},
                            status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if user is None:

            return Response({'error': 'Неверные данные'},
                            status=status.HTTP_401_UNAUTHORIZED)
            
        refresh = get_refresh(user)

        response = Response({
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data

        }, status=status.HTTP_200_OK)

        response.set_cookie('refresh', str(refresh))

        return response
    
class UserAPILogout(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializerLogout

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        
        if not refresh_token:

            return Response({'error': 'Необходим Refresh token'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:

            return Response({'error': 'Неверный Refresh token'}, 
                            status=status.HTTP_400_BAD_REQUEST)

        return Response({'success': 'Выход успешен'}, 
                        status=status.HTTP_200_OK)
        
class RefreshTokenView(TokenRefreshView):
    
    def post(self, request: Request, *args, **kwargs) -> Response:
        serializer = self.get_serializer(data=request.COOKIES)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)
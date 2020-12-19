from django.urls import path
from .views import PostList, PostDetail,CreatePost,CreateComment,Thumbs

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = 'blog_api'

urlpatterns = [
    path('thumbs/',Thumbs, name='thumbs'),
    path('<str:pk>/', PostDetail.as_view(), name='detailpost'),
    path('', PostList.as_view(), name='listcreate'),
    path('admin/create/', CreatePost.as_view(), name='createpost'),
    path('<slug>/create/', CreateComment, name='creatcomment'),

]

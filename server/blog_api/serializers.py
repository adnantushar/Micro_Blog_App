from rest_framework import serializers
from blog.models import Post, Comment
from django.conf import settings
from datetime import datetime


class PostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ('id', 'title','category','slug', 'author', 'content',
                  'status','published','image',)
    def get_author(self, obj):
        return str(obj.author)



class PostDetailSerializer(serializers.ModelSerializer):
    author=serializers.SerializerMethodField()
    comments =serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ('id', 'title','category','slug', 'author', 'content',
                  'status','published','image','thumbsup','thumbsdown','comments')

    def get_author(self, obj):
        return str(obj.author)

    def get_comments(self, obj):
        c_qs = Comment.objects.filter(post=obj)
        comments = CommentSerializer(c_qs, many=True).data
        return comments

class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title','slug', 'content','image')




class CommentSerializer(serializers.ModelSerializer):
    user=serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = [
            'id',
            'post',
            'user',
            'parent',
            'content',
            'publish',
        ]
    def get_user(self, obj):
        return str(obj.user)

class CommentCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model=Comment
        fields = [
            'id',
            'content',
        ]

    def save(self, *args, **kwargs):
        Comment.objects.rebuild()
        return super().save(*args, **kwargs)

from django.db import models
from django.db.models.signals import pre_save
from django.utils import timezone
from django.utils.text import slugify
from django.conf import settings
from mptt.models import MPTTModel, TreeForeignKey




def upload_location(instance, filename):
    PostModel = instance.__class__
    new_id = PostModel.objects.order_by("id").last().id + 1
    return "%s/%s" %(new_id, filename)

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Post(models.Model):

    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset() .filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, default=1)
    title = models.CharField(max_length=250)
    content = models.TextField()
    slug = models.SlugField(max_length=250, unique_for_date='published')
    published = models.DateTimeField(default=timezone.now)
    image = models.ImageField(upload_to=upload_location,default='default.jpg')
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='blog_posts')
    status = models.CharField(
        max_length=10, choices=options, default='published')
    thumbsup = models.IntegerField(default='0')
    thumbsdown = models.IntegerField(default='0')
    thumbs = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name='thumbs', default=None, blank=True)
    objects = models.Manager()  # default manager
    postobjects = PostObjects()  # custom manager

    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.title
'''
def create_slug(instance, new_slug=None):
    slug = slugify(instance.title)
    if new_slug is not None:
        slug = new_slug
    qs = Post.objects.filter(slug=slug).order_by("-id")
    exists = qs.exists()
    if exists:
        new_slug = "%s-%s" %(slug, qs.first().id)
        return create_slug(instance, new_slug=new_slug)
    return slug

def pre_save_post_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_slug(instance)

pre_save.connect(pre_save_post_receiver, sender=Post)
'''

class Comment(MPTTModel):
    post = models.ForeignKey(Post,
                             on_delete=models.CASCADE,
                             related_name='comments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                                  on_delete=models.CASCADE,
                                  default=1)
    parent = TreeForeignKey('self', on_delete=models.CASCADE,
                            null=True, blank=True, related_name='children')
    content = models.TextField()
    publish = models.DateTimeField(auto_now_add=True)

    class MPTTMeta:
        order_insertion_by = ['publish']

    def __unicode__(self):
        return str(self.user)

    def __str__(self):
        return str(self.user)

class Vote(models.Model):
    post = models.ForeignKey(Post, related_name='postid',
                             on_delete=models.CASCADE, default=None, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='userid',
                             on_delete=models.CASCADE, default=None, blank=True)
    vote = models.BooleanField(default=True)
from django.db import models
from accounts.models import Account


class School(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10)
    lat  = models.CharField(max_length=15)
    long = models.CharField(max_length=15)

    def __str__(self):
        return f'{self.name.title()} - {self.code}'

    class Meta:
        db_table = 'schools'


class Course(models.Model):
    name = models.CharField(max_length=100)
    number = models.PositiveSmallIntegerField()
    dept = models.CharField(max_length=5)
    school = models.ForeignKey(School, on_delete=models.CASCADE,
                               related_name='courses', null=True)

    def __str___(self):
        return f'{self.name.title()} - {self.dept.upper()} {self.number}'

    class Meta:
        db_table = 'courses'


class Category(models.Model):
    name = models.CharField(max_length=50)
    image = models.URLField(null=True)

    class Meta:
        db_table = 'categories'

    def __str__(self):
        return f'{self.name} ({self.id})'


class Topic(models.Model):
    name = models.CharField(max_length=50)
    image = models.URLField(null=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, related_name='topics', null=True)

    class Meta:
        db_table = 'topics'

    def __str__(self):
        return self.name


class Event(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    time = models.DateTimeField()
    topic = models.ForeignKey(Topic, on_delete=models.SET_NULL, null=True)
    organizer = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)
    attendees = models.ManyToManyField(Account, related_name='events')
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    campus = models.ForeignKey(School, on_delete=models.CASCADE,
                               related_name='events', null=True)
    location = models.CharField(max_length=100, default='')
    capacity = models.PositiveSmallIntegerField(default=20)

    class Meta:
        db_table = 'events'

    def __str__(self):
        return self.name

class Comment(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE, null=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    message = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    upvote = models.IntegerField(default=0)

    class Meta:
        db_table = 'comments'

    def __str__(self):
        return self.message

from rest_framework import serializers
from .models import Event, School, Topic, Course, Category, Comment
from accounts.serializers import AccountSerializer
from accounts.models import Account


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ('__all__')


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ('__all__')


class CategorySerializer(serializers.ModelSerializer):
    topics = TopicSerializer(read_only=True, many=True)

    class Meta:
        model = Category
        fields = ('__all__')


class EventSerializer(serializers.ModelSerializer):
    organizer = AccountSerializer(read_only=True)

    class Meta:
        model = Event
        fields = ('id', 'name', 'description', 'time', 'topic',
                  'capacity', 'campus', 'organizer')


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('__all__')

class CommentSerializer(serializers.ModelSerializer):
    user = AccountSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('__all__')

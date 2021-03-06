# Generated by Django 2.1.2 on 2018-12-02 10:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('image', models.URLField(null=True)),
            ],
            options={
                'db_table': 'categories',
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=500)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('upvote', models.IntegerField(default=0)),
            ],
            options={
                'db_table': 'comments',
            },
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('number', models.PositiveSmallIntegerField()),
                ('dept', models.CharField(max_length=5)),
            ],
            options={
                'db_table': 'courses',
            },
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=1000)),
                ('time', models.DateTimeField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('location', models.CharField(default='', max_length=100)),
                ('capacity', models.PositiveSmallIntegerField(default=20)),
                ('attendees', models.ManyToManyField(related_name='events', to='accounts.Account')),
            ],
            options={
                'db_table': 'events',
            },
        ),
        migrations.CreateModel(
            name='School',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('code', models.CharField(max_length=10)),
                ('lat', models.CharField(max_length=15)),
                ('long', models.CharField(max_length=15)),
            ],
            options={
                'db_table': 'schools',
            },
        ),
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('image', models.URLField(null=True)),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='topics', to='events.Category')),
            ],
            options={
                'db_table': 'topics',
            },
        ),
        migrations.AddField(
            model_name='event',
            name='campus',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='events', to='events.School'),
        ),
        migrations.AddField(
            model_name='event',
            name='organizer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.Account'),
        ),
        migrations.AddField(
            model_name='event',
            name='topic',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='events.Topic'),
        ),
        migrations.AddField(
            model_name='course',
            name='school',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='events.School'),
        ),
        migrations.AddField(
            model_name='comment',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.Event'),
        ),
        migrations.AddField(
            model_name='comment',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.Account'),
        ),
    ]

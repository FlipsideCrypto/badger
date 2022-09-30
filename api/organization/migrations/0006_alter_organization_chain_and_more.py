# Generated by Django 4.1.1 on 2022-09-30 08:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organization', '0005_alter_organization_badges'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organization',
            name='chain',
            field=models.CharField(default='eth', max_length=50),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='organization',
            name='description',
            field=models.TextField(blank=True, max_length=4000, null=True),
        ),
    ]

# Generated manually

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='description',
            field=models.TextField(blank=True, help_text='Short description or summary for the client modal.'),
        ),
        migrations.AddField(
            model_name='client',
            name='project_type',
            field=models.CharField(blank=True, help_text='e.g. Branding, Business Cards, Packaging', max_length=200),
        ),
    ]

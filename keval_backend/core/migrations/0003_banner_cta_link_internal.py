from django.db import migrations, models
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_teammember'),
    ]

    operations = [
        migrations.AlterField(
            model_name='banner',
            name='cta_link',
            field=models.CharField(
                blank=True,
                default='/',
                max_length=255,
                null=True,
                help_text="Internal URL path (e.g., '/contact'). Leave blank for homepage.",
                validators=[
                    django.core.validators.RegexValidator(
                        regex='^/[^\\s]*$',
                        message="CTA link must be an internal path starting with '/'."
                    )
                ],
            ),
        ),
    ]

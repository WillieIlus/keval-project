"""
Create sample portfolio categories and projects with print-relevant data.
Run: python manage.py seed_portfolio
"""
from django.core.management.base import BaseCommand
from gallery.models import ServiceCategory, Project


class Command(BaseCommand):
    help = 'Create sample portfolio categories and projects'

    def handle(self, *args, **options):
        categories_data = [
            ('Branding', 'Business cards, stationery, and brand identity materials'),
            ('Digital Print', 'Brochures, flyers, posters, and marketing collateral'),
            ('Large Format', 'Banners, roll-ups, and exhibition graphics'),
            ('Packaging', 'Custom boxes, product packaging, and branded materials'),
            ('Books', 'Book printing, annual reports, and publications'),
        ]

        created_cats = []
        for name, desc in categories_data:
            cat, _ = ServiceCategory.objects.get_or_create(
                name=name,
                parent=None,
                defaults={'description': desc, 'order': len(created_cats)}
            )
            created_cats.append(cat)

        project_titles = [
            ('Premium Business Cards', 'Branding'),
            ('Corporate Brochure Printing', 'Digital Print'),
            ('Roll-Up Banner Display', 'Large Format'),
            ('Product Packaging Set', 'Packaging'),
            ('Annual Report Printing', 'Books'),
            ('Event Branding Materials', 'Branding'),
            ('Marketing Collateral Set', 'Digital Print'),
            ('Exhibition Stand Graphics', 'Large Format'),
        ]

        for title, cat_name in project_titles:
            cat = next((c for c in created_cats if c.name == cat_name), created_cats[0])
            slug = title.lower().replace(' ', '-').replace(',', '')
            Project.objects.get_or_create(
                slug=slug,
                defaults={
                    'title': title,
                    'client': 'Sample Client',
                    'description': f'Professional {title.lower()} project.',
                    'category': cat,
                    'is_featured': True,
                }
            )

        self.stdout.write(self.style.SUCCESS('Portfolio sample data created.'))

from django.db import migrations


def seed_projects(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.bulk_create([
        Project(
            name='ExireQuran',
            name_fa='اکسیر قرآن',
            description=(
                'Online Quran learning platform with courses, subscriptions, payments, SMS, '
                'and live online classes. Built with Django and Next.js on Docker with Redis, '
                'PostgreSQL, and Celery. Features a plugin system, advanced admin editors, '
                'multiple caching layers, and a fully customizable CMS.'
            ),
            description_fa=(
                'پلتفرم آموزش آنلاین قرآن با سیستم دوره‌های آموزشی، اشتراک، پرداخت، پیامک و کلاس آنلاین. '
                'ساخته‌شده با Django و Next.js روی Docker با Redis، PostgreSQL و Celery. '
                'دارای سیستم پلاگین، ویرایشگرهای پیشرفته مدیریتی، لایه‌های چندگانه کش '
                'و سیستم مدیریت محتوای کاملاً قابل تنظیم.'
            ),
            url='https://exirequran.ir',
            github_url='https://github.com/HjtDev/Rattel',
            tags=['Django', 'Next.js', 'PostgreSQL', 'Redis', 'Celery', 'Docker'],
            status='active',
            order=1,
        ),
        Project(
            name='ZekreMobin',
            name_fa='ذکر مبین',
            description=(
                'Social media web application for religious content, similar to Instagram. '
                'Built with Django and React. Features multiple caching layers, lazy loading, '
                'advanced category filtering, full-text search, a CMS panel, a blog with '
                'rich text editors, and an advanced content suggestion engine.'
            ),
            description_fa=(
                'وب‌اپلیکیشن شبکه اجتماعی برای محتوای مذهبی، مشابه اینستاگرام. '
                'ساخته‌شده با Django و React. دارای لایه‌های چندگانه کش، بارگذاری تنبل، '
                'فیلترینگ پیشرفته، جستجوی متنی، پنل CMS، وبلاگ با ویرایشگر متن غنی '
                'و موتور پیشنهاد محتوای پیشرفته.'
            ),
            url='https://zekremobin.ir',
            github_url='https://github.com/HjtDev/ZekrMobin',
            tags=['Django', 'React', 'PostgreSQL', 'Redis'],
            status='active',
            order=2,
        ),
    ])


def reverse_seed(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.filter(name__in=['ExireQuran', 'ZekreMobin']).delete()


class Migration(migrations.Migration):
    dependencies = [
        ('portfolio', '0002_bilingual_fields'),
    ]

    operations = [
        migrations.RunPython(seed_projects, reverse_seed),
    ]

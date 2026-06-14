from django.db import migrations


def seed_projects(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.bulk_create([
        Project(
            name='Portfolio & CV',
            name_fa='پورتفولیو و رزومه',
            description=(
                'Bilingual (English / Farsi) personal portfolio and CV site with automatic RTL layout switching. '
                'Built with Next.js 16, Django 5, PostgreSQL, Redis, and Docker. '
                'Features a dedicated CV page with scroll-driven timeline animations, downloadable PDF resume, '
                'interactive physics-based orb backgrounds, a live availability badge, contact form, '
                'and self-hosted Umami analytics — all with full SEO optimisation.'
            ),
            description_fa=(
                'پورتفولیو و رزومه شخصی دوزبانه (فارسی / انگلیسی) با تغییر خودکار چیدمان RTL. '
                'ساخته‌شده با Next.js 16، Django 5، PostgreSQL، Redis و Docker. '
                'دارای صفحه رزومه اختصاصی با انیمیشن تایم‌لاین اسکرول‌محور، دانلود PDF رزومه، '
                'پس‌زمینه تعاملی فیزیک‌محور، نشانگر وضعیت زنده، فرم تماس '
                'و آنالیتیکس خودمیزبان Umami — همراه با بهینه‌سازی کامل SEO.'
            ),
            url='https://mhnikoobakht.ir',
            github_url='https://github.com/HjtDev/CV-V2',
            tags=['Next.js', 'Django', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
            status='active',
            order=3,
        ),
        Project(
            name='Neyanbar',
            name_fa='نی عنبر',
            description=(
                'E-commerce platform for rare colognes, perfumes, and fragrance products targeting the Iranian market. '
                'Built with Django and features a full shopping experience including product catalogue, shopping cart, '
                'order management, user accounts, and a blog. '
                'Integrates Melipayamak for SMS notifications and Postex for shipping and delivery tracking.'
            ),
            description_fa=(
                'پلتفرم فروشگاهی برای عطرها، ادکلن‌ها و محصولات خوشبوکننده نادر، ویژه بازار ایران. '
                'ساخته‌شده با Django و دارای تجربه خرید کامل شامل کاتالوگ محصولات، سبد خرید، '
                'مدیریت سفارش، حساب کاربری و وبلاگ. '
                'یکپارچه با ملی‌پیامک برای اطلاع‌رسانی پیامکی و پستکس برای ارسال و ردیابی مرسولات.'
            ),
            url='',
            github_url='https://github.com/HjtDev/neyanbar',
            tags=['Django', 'PostgreSQL', 'E-commerce', 'Melipayamak', 'Postex'],
            status='active',
            order=4,
        ),
        Project(
            name='Django LiveChat',
            name_fa='چت زنده با جنگو',
            description=(
                'Real-time chat application built as a learning project to explore WebSockets and Django Channels. '
                'Supports multiple chat rooms, user authentication, and live message delivery without page refresh. '
                'Frontend styled with Tailwind CSS; superusers can monitor all active chat rooms from the admin panel.'
            ),
            description_fa=(
                'اپلیکیشن چت زنده ساخته‌شده به‌عنوان پروژه آموزشی برای یادگیری WebSocket و Django Channels. '
                'پشتیبانی از چند اتاق گفتگو، احراز هویت کاربر و ارسال پیام لحظه‌ای بدون بارگذاری مجدد صفحه. '
                'فرانت‌اند با Tailwind CSS طراحی شده؛ مدیران می‌توانند تمام اتاق‌های فعال را از پنل مدیریت مشاهده کنند.'
            ),
            url='',
            github_url='https://github.com/HjtDev/django-live-chat',
            tags=['Django', 'WebSockets', 'Django Channels', 'Tailwind CSS'],
            status='archived',
            order=5,
        ),
    ])


def reverse_seed(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.filter(name__in=['Portfolio & CV', 'Neyanbar', 'Django LiveChat']).delete()


class Migration(migrations.Migration):
    dependencies = [
        ('portfolio', '0003_seed_projects'),
    ]

    operations = [
        migrations.RunPython(seed_projects, reverse_seed),
    ]

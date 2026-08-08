Deploying keval_project to PythonAnywhere

This file contains step-by-step instructions and example bash commands to deploy the Django backend at kevalinvestmentltd.pythonanywhere.com.

Before you start
- Ensure you have a PythonAnywhere account and have created a Web app using the "Manual configuration" option (choose the correct Python version, e.g., 3.9).
- Keep SECRET_KEY and other secrets out of the repository. Use the PythonAnywhere Web tab "Environment variables" to set them.

Example bash steps (run on your local machine or PythonAnywhere console after git clone):

# Show current directory
pwd

# Clone the repo (run where you want the project stored on PythonAnywhere)
git clone https://github.com/kevalinvestmentsltd-creator/keval-project.git
cd keval-project/keval_backend

# Create and activate virtualenv (example using virtualenvwrapper's mkvirtualenv)
# On PythonAnywhere, you can create virtualenvs in ~/.virtualenvs
mkvirtualenv --python=/usr/bin/python3.9 env
workon env

# Alternatively using venv:
# python3.9 -m venv ~/venv-keval
# source ~/venv-keval/bin/activate

# Install requirements
pip install --upgrade pip
pip install -r requirements.txt

# Set environment variables (recommended using PythonAnywhere Web → Environment variables):
# SECRET_KEY, DEBUG=False, ALLOWED_HOSTS=kevalinvestmentltd.pythonanywhere.com, EMAIL_HOST_PASSWORD

# Run migrations and collectstatic
python manage.py migrate
python manage.py collectstatic --noinput

# Create superuser
python manage.py createsuperuser

PythonAnywhere web app configuration
1) WSGI file
- Open the PythonAnywhere Web tab → enter the WSGI configuration file editor.
- Replace the default WSGI file contents with the contents of keval_backend/pythonanywhere_wsgi.py (update PROJECT_HOME and VENV_PATH to match your account).
- Ensure DJANGO_SETTINGS_MODULE is set to 'keval_site.settings'.

2) Virtualenv
- In the Web tab, set the path to your virtualenv (e.g., /home/<your-username>/.virtualenvs/env).

3) Static files
- In the Web tab, add static mappings:
  URL: /static/  -> /home/<your-username>/keval-project/keval_backend/staticfiles
  URL: /media/   -> /home/<your-username>/keval-project/keval_backend/media

4) Environment variables
- In the Web tab, add environment variables:
  SECRET_KEY = <your secret>
  DEBUG = False
  ALLOWED_HOSTS = kevalinvestmentltd.pythonanywhere.com
  EMAIL_HOST_PASSWORD = <your email password>

5) HTTPS / security flags
- If you serve over HTTPS on PythonAnywhere, add to settings.py or via env:
  SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
  SESSION_COOKIE_SECURE = True
  CSRF_COOKIE_SECURE = True

6) Restart the web app using the button on the Web tab and visit:
https://kevalinvestmentltd.pythonanywhere.com

Notes
- The project currently uses SQLite by default; this is fine for small sites on PythonAnywhere. If you plan to scale, switch to a managed DB and update DATABASES accordingly.
- Keep secrets out of Git. Use the Web tab env vars or a server-only .env file.

If you want, I can:
- Fill in the pythonanywhere_wsgi.py PROJECT_HOME/VENV_PATH with your PythonAnywhere username and push again.
- Add SECURE_* settings into settings.py.

Tell me which of those you'd like next.

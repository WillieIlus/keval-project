"""PythonAnywhere WSGI template for keval_project

Copy the contents of this file into the PythonAnywhere Web app WSGI configuration file (or use as a starting point).
Replace <your-username> and the path as needed.
"""
import os
import sys

# Change this to your PythonAnywhere username and repo path
PROJECT_HOME = '/home/<your-username>/keval-project/keval_backend'

if PROJECT_HOME not in sys.path:
    sys.path.insert(0, PROJECT_HOME)

# If you use a virtualenv, set its path here (recommended)
VENV_PATH = '/home/<your-username>/.virtualenvs/env'
if VENV_PATH and os.path.exists(VENV_PATH):
    activate_this = os.path.join(VENV_PATH, 'bin/activate_this.py')
    # activate_this.py may not exist on some virtualenv layouts; PythonAnywhere sets virtualenv in Web UI instead

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'keval_site.settings')

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()

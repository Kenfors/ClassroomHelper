# ClassroomHelper



# Dependancies
### pip
- django==2.2.1
- django-webpack-loader==0.6.0

### npm
- @vue/cli==3.0


# Setup

root/  
├── site/
│---└── settings.py    # Django settings  
├── webapp/          # Vue project  
│---├── src/          # Webpack build folder  
|---│   └── index.html # Vue HTML file  
│---├── package.json   # Node dependencies  
│---└── vue.config.js  # Vue configuration  
├── static/            # Django's collected static files  
│---├── static/        # Vue's collected assets  
│---└── index.html     # Vue's collected HTML file  
└── manage.py*  

### Development
- Django dev server on 127.0.0.1:8080
- Npm dev server on 127.0.0.1:8000

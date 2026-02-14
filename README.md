#я использовал для проверки работоспособности Ubuntu.
#На чистую Ubuntu устанавливаем обновление apt. sudo apt update
#после устанавливаем Python и PostgreSQL
sudo apt install -y git python3 python3-pip python3-venv postgresql postgresql-contrib
#устанавливаем NODE.JS на 18 версии он отказывался запускать я и делал на 20
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
# установил ангуляр 
npm install -g @angular/cli
#После склонировал репозиторий https://github.com/MaxWars/file-storage.git
git clone https://github.com/MaxWars/file-storage.git
# переходим в репозиторий там создаём базу данных и пользователя
sudo -u postgres psql
CREATE DATABASE file_storage;
ALTER USER postgres PASSWORD 'root';
GRANT ALL PRIVILEGES ON DATABASE file_storage TO postgres;
\q
# после переходим в бэк
cd ~/backend
# там создаю виртуальное окружение
python3 -m venv venv
source venv/bin/activate
# После устанавливаю модули используемые в бэке
pip install -r requirements.txt
# после установки создаём файл .env
nano .env
# В нём должно быть так
DB_HOST=localhost
DB_PORT=5432
DB_NAME=file_storage
DB_USER=postgres
DB_PASSWORD=root
SECRET_KEY=я генерировал рандомный ключ HEX-32 
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
# после провёл миграцию
alembic upgrade head
# запустил бэк
uvicorn app.main:app --host 127.0.0.1 --port 8000
# Дальше перходим в front
cd ..
cd front
# там установил модули 
nmp install
# и запуск front
ng serve --host 127.0.0.1 --port 4200
# ну если у вас ip отличается то просто ставим localhost

#я использовал для проверки работоспособности Ubuntu.
#На чистую Ubuntu устанавливаем обновление apt. sudo apt update
#после устанавливаем Python и PostgreSQL
sudo apt install -y git python3 python3-pip python3-venv postgresql postgresql-contrib
#устанавливаем NODE.JS на 18 версии он отказывался запускать я и делал на 20
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
#После склонировал репозиторий 

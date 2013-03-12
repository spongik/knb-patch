@echo off
cd ..
git pull
cd deploy
python ./deploy.py ../src
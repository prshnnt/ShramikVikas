echo "cd frontend"
cd frontend

echo "npm ci"
npm ci 

echo "npm run build"
npm run build

echo "cd .."
cd ..

echo "cd backend"
cd backend

echo "pip install -r requirements.txt"
pip install -r requirements.txt
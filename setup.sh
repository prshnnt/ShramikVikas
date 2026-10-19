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

echo "uv sync"
uv sync
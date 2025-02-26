if [ -f .env ]; then
  export $(cat .env | xargs)
  echo "✅ Loaded envs"
else
  echo ".env file Not Found"
fi

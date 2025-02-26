if [ -f .env ]; then
  export $(cat .env | xargs)
  export CMS_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  echo "✅ Loaded envs"
else
  echo ".env file Not Found"
fi
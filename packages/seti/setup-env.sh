#!/bin/bash
# Creates an environment variable file for local development

# Create .env.developmnent file
echo -e "NEXT_PUBLIC_RUNTIME_ENV=dev\nPORT=3000" >".env.local"
echo "✅ Created .env.local"

#!/bin/bash

# Load environment variables
set -a
source .env
set +a

# Check if MongoDB is running
echo "Checking MongoDB connection..."
mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "MongoDB is running"
else
    echo "Error: MongoDB is not running. Please start MongoDB first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm run install:all
fi

# Start the development servers
echo "Starting development servers..."
npm run dev 
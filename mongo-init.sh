#!/bin/bash
set -e

# Read credentials from Docker secrets
MONGO_ROOT_USERNAME=$(cat /run/secrets/MONGO_USERNAME)
MONGO_ROOT_PASSWORD=$(cat /run/secrets/MONGO_PASSWORD)

# Start MongoDB with authentication
mongosh --quiet --eval "
  db.auth('$MONGO_ROOT_USERNAME', '$MONGO_ROOT_PASSWORD');
  
  // Create database if it doesn't exist
  use echomind;
  
  // Create collections if needed
  if (db.getCollectionNames().indexOf('users') === -1) {
    db.createCollection('users');
    print('Created users collection');
  }
  
  // Your initialization logic here
  // For example, creating indexes
  db.users.createIndex({ 'email': 1 }, { unique: true });
  
  print('MongoDB initialization completed');
"
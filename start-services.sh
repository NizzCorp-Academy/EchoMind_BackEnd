#!/bin/sh

# Start MongoDB in background
mongod --fork --logpath /var/log/mongodb.log --bind_ip_all

# Wait for MongoDB to start
sleep 5

# Start the Node.js application
node dist/server.js
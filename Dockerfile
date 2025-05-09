# FROM ubuntu:noble-20250415.1 AS creator
# RUN useradd -m limiteduser 
# RUN mkdir -p /logs 
# # RUN limiteduser:limiteduser /logs
# RUN chmod 700 /logs
# RUN chown limiteduser:limiteduser /logs
# # RUN usermod -s /usr/sbin/nologin limiteduser 

# USER limiteduser
# WORKDIR /logs

# Use specific Node.js slim version
# FROM node:20.18.3-alpine3.21 AS builder
# FROM node-with-limited-user

# ARG PYTHON_VERSION=3.11.6
# ARG DEBIAN_BASE=bookworm
# FROM python:${PYTHON_VERSION}-slim-${DEBIAN_BASE} AS base

FROM node:20.18.3-bookworm-slim

LABEL org.opencontainers.image.title="Echomind backend app"

RUN useradd -u 1006 limiteduser
RUN mkdir -p app/logs
RUN chown -R limiteduser:limiteduser /app/logs

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY tsconfig.json ./

# RUN npm install 
# make sure to install the exact same packages as the packages.lcok have 
# and the --only=production is to say don't install dev depentency
RUN npm ci 

# node have a user named node
# USER node  
# --chown=node:node
COPY src/ ./src/
# COPY .env ./.env
# COPY --from=creator /logs ./logs/
# COPY --from=creator /etc/passwd /etc/passwd
# RUN chown -R limiteduser:limiteduser /logs

RUN npm run build
RUN npm prune --production

# Creating and switching app user
# RUN useradd -u 1001 appuser
# USER appuser

# USER node

# Expose the port your app uses , JUST for documentation 
EXPOSE 5000

# ENV NODE_ENV=production
# ENV PORT=5000
# ENV AI_ENDPOIND=http://localhost:1234/v1
# ENV AI_MODEL=e1
# ENV LOG_LEVEL=info
# ENV FRONTEND_ENDPOINT=http://localhost:5173
# or you could 
ENV NODE_ENV=production \
    PORT=5000 \
    AI_ENDPOIND=http://localhost:1234/v1 \
    AI_MODEL=e1 \
    LOG_LEVEL=info \
    FRONTEND_ENDPOINT=http://localhost:5173 


# FROM scratch

# COPY --from=builder /etc/passwd /etc/passwd
# COPY --from=builder /app .

# changing to the bash
# CMD [ "/bin/sh" ]

# USER node
USER  limiteduser

# Run the compiled JavaScript (assuming it's already built)
CMD ["node", "dist/server.js"]



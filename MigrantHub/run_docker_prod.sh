#!/usr/bin/env bash
cp ./server/.env_docker ./server/.env
cp ./client/.env_docker ./client/.env.local

docker-compose -f docker-compose-production.yml up --build

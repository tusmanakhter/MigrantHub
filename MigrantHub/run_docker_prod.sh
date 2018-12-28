#!/usr/bin/env bash

if [ ! -f ./server/.env ]; then
  cp ./server/.env_docker ./server/.env
fi

if [ ! -f ./client/.env.local ]; then
  cp ./client/.env_docker ./client/.env.local
fi

docker-compose -f docker-compose-production.yml up --build

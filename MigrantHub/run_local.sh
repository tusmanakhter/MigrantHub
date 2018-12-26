#!/usr/bin/env bash

if [ ! -f ./server/.env ]; then
  cp ./server/.env_local ./server/.env
fi

if [ ! -f ./client/.env.local ]; then
  cp ./client/.env_local ./client/.env.local
fi

cd ./server
npm run dev

#!/usr/bin/env bash

cp ./server/.env_local ./server/.env
cp ./client/.env_local ./client/.env.local

cd ./server
npm run dev

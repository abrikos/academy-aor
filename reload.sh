#!/bin/bash
git pull
yarn generate
pm2 restart all --update-env
pm2 logs
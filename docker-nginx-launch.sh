#!/bin/bash

docker run -d --name nginx-immo-calc -p 80:80 \
  -v /home/vincent/projects/perso/immo-calc:/usr/share/nginx/html \
  -v /home/vincent/projects/perso/immo-calc/conf/default.conf:/etc/nginx/conf.d/default.conf \
  nginx


#!/bin/bash

docker run -d --name nginx-immo-calc -p 443:443 \
  -v /home/vincent/projects/perso/immo-calc:/usr/share/nginx/html \
  -v /home/vincent/projects/perso/immo-calc/conf/default.conf:/etc/nginx/conf.d/default.conf \
  -v /home/vincent/projects/perso/immo-calc/conf/certs/:/etc/nginx/certs/ \
  nginx


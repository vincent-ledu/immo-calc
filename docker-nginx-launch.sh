#!/bin/bash

docker run -d --name nginx-immo-calc -p 1080:80 -v /home/vincent/projects/perso/immo-calc-front:/usr/share/nginx/html -v /home/vincent/projects/perso/immo-calc-front/conf/default.conf:/etc/nginx/conf.d/default.conf nginx
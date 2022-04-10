#!/bin/sh
for file in /usr/share/nginx/html/js/app.*.js;
do
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi
  envsubst '$VUE_APP_API_URL' < $file.tmpl.js > $file
done
cp etc/nginx/nginx.conf etc/nginx/nginx.tmpl.conf
envsubst '$PORT' < etc/nginx/nginx.tmpl.conf > etc/nginx/nginx.conf

echo "Starting Nginx"
nginx -g 'daemon off;'
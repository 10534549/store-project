server {
       listen 80;
       server_name store.smartofferdeal.com;
       location / {
               root /home/projects/smart-offer-deal/smart-offer-deal-store-web/dist;
               index index.html index.htm;
               try_files $uri $uri/ /index.html =404;
               add_header X-Frame-Options "";
       }
}

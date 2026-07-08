# Deploy Hostinger — Sweet Cheesecake (porta 3020 + PM2)

## Pré-requisitos no servidor

- Node.js 20+
- npm
- PM2 (`npm i -g pm2`)
- Git
- Nginx (já existe no seu servidor)

---

## 1) Clone o repositório

```bash
cd /var/www
git clone https://github.com/marcosg432/sweetxcake.git
cd sweetxcake
```

Se a pasta já existir:

```bash
cd /var/www/sweetxcake
git pull origin master
```

---

## 2) Instale e faça o build

```bash
npm install
npm run build
```

---

## 3) Suba com PM2 (porta 3020)

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Comandos úteis:

```bash
pm2 status
pm2 logs sweetxcake
pm2 restart sweetxcake
pm2 stop sweetxcake
```

Confirme a porta:

```bash
ss -ltnp | grep :3020
```

---

## 4) Nginx (proxy reverso)

Crie/edite um site, por exemplo:

`/etc/nginx/sites-available/sweetxcake`

```nginx
server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;

    location / {
        proxy_pass http://127.0.0.1:3020;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Ative e recarregue:

```bash
ln -s /etc/nginx/sites-available/sweetxcake /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

## 5) Atualizar o projeto no futuro

```bash
cd /var/www/sweetxcake
git pull origin master
npm install
npm run build
pm2 reload ecosystem.config.cjs
```

---

## Observações

- O `ecosystem.config.cjs` usa `cwd: /var/www/sweetxcake`.
- Se clonar em outro caminho, altere o `cwd` nesse arquivo antes do `pm2 start`.
- Porta configurada: **3020**.

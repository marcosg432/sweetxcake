# Sweet Cheesecake

Catálogo inteligente multilojas da Sweet Cheesecake.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- PM2 (produção)

## Porta de produção

Aplicação configurada para rodar na **porta 3020**.

## Scripts locais

```bash
npm install
npm run build
npm start
```

## Produção com PM2

Arquivo: `ecosystem.config.cjs`

```bash
npm install
npm run build
pm2 start ecosystem.config.cjs
pm2 save
```

## Deploy Hostinger

Veja o guia completo em [`DEPLOY.md`](./DEPLOY.md).

## Repositório

https://github.com/marcosg432/sweetxcake

# Reward Backend

Backend en Node.js para interactuar con el contrato inteligente `RewardDistributor` desplegado en EVM.

## Requisitos

- Node.js 18+
- npm
- PM2 (opcional, para producción)

## Instalación

```bash
git clone git@github.com:robeperezmarrero-crypto/draiper.git
cd draiper
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
RPC_URL=https://mainnet.infura.io/v3/TU_PROYECTO_ID
CONTRACT_ADDRESS=0xTuContrato
PRIVATE_KEY=0xTuClavePrivada
ADMIN_API_KEY=tu-api-key-secreta
CHAIN_ID=1
PORT=3000
```

## Uso

```bash
# Desarrollo
node index.js

# Producción con PM2
pm2 start index.js --name reward-backend
pm2 save
pm2 startup
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /health | Estado del servidor |
| GET | /api/reward/redeemable/:user/:token | Cantidad canjeable |
| POST | /api/reward/redeem | Canjear un token |
| POST | /api/reward/batch-redeem | Canje masivo |
| POST | /api/reward/set-admin | Cambiar admin |
| POST | /api/reward/set-recipient | Cambiar destinatario |
| GET | /api/reward/admin | Ver admin actual |
| GET | /api/reward/recipient | Ver recipient actual |

## Autenticación

Todas las rutas requieren el header `x-api-key` con tu `ADMIN_API_KEY`.

```bash
curl -H "x-api-key: tu-api-key" http://localhost:3000/health
```

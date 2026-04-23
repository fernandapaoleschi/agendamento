# Painel Administrativo de Agendamento

Frontend em React + Vite + TypeScript + Tailwind para consumir API de agendamentos.

## Stack
- React
- Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios

## Configuração
1. Copie `.env.example` para `.env`
2. Defina `VITE_API_URL`
3. Instale dependências: `npm install`
4. Rode em desenvolvimento: `npm run dev`

## Observação
As rotas e payloads foram estruturados para endpoints REST convencionais (`/auth/login`, `/appointments`, `/clients`, `/services`, `/professionals`, `/users`, `/logs`).
Caso seu Swagger use paths diferentes, ajuste os arquivos em `src/services`.

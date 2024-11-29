# Usa uma imagem do Node.js como base
FROM node:18

# Define o diretório de trabalho na imagem
WORKDIR /usr/src/app

# Copia os arquivos necessários
COPY package.json yarn.lock ./

# Instala as dependências
RUN yarn install

COPY . .

# Exponha a porta padrão da aplicação (ajuste conforme necessário)
EXPOSE 3000

# Comando padrão para rodar o app
CMD ["yarn", "start"]

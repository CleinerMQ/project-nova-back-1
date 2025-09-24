FROM node:21-alpine3.19

WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando por defecto (será sobrescrito por docker-compose)
CMD ["npm", "run", "start:dev"]
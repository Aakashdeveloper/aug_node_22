FROM node
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
EXPOSE 9800
CMD ["npm","start"]
FROM node:18-alpine

WORKDIR app

COPY --chown=node:node package*.json ./

#“npm ci” command is more efficient and clean than “npm install“. The second command cleans out the NPM cache.
RUN npm ci && npm cache clean --force


COPY --chown=node:node . .

RUN npm run build

USER node

EXPOSE 8080

CMD [ "node", "dist/main.js" ]
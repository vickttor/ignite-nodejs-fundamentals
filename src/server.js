'use strict'

// const http = require('http') // CommonJS (default)

import http from 'http' // ESModule
import { randomUUID } from "node:crypto";
import { json } from './middlewares/json.js';
import { DataBase } from './database.js';

const PORT = process.env.PORT || 8080

/* GET | POST | PUT | PATCH | DELETE */

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso específico.

/* Stateful | Stateless */

// Stateful => Persite dados.
// Stateless => Não persiste dados.

// Headers (Cabeçalhos) - Requisição/resposta => Metadados
// Informações adicionais de como os dados enviados podem ser interpretados pelo interceptor.

// HTTP Status Code

const database = new DataBase();

const server = http.createServer(async (req, res)=> {

  const {method, url} = req // retriving informations from request.

  await json(req, res);

  if(method === 'GET' && url === '/users') {

    const users = database.select('users')

    return res
      .setHeader("Content-type", 'application/json')
      .end(JSON.stringify(users))
  }
  
  if(method === 'POST' && url === '/users') {
    const {name, email} = req.body;
    
    const user = {
      id: randomUUID(),
      name: name,
      email: email
    }

    database.insert("users", user);

    return res.writeHead(201).end()
  }
  
  return res.writeHead(404).end()
})

server.listen(PORT, () => {
  console.log("Running at http://localhost:" + PORT);
});
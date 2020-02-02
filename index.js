const express = require('express');
const server = express();

//Variaveis de ambiente
require('dotenv').config();

//Porta
const port = process.env.PORT || 3000;

// Lista todos os projetos
server.get('/projects', (req, res) => {
    return res.json({projects: 'Projetos'}); 
});

// Rota usada caso uma url não mapeada seja usada 
server.get('*', (req, res) => {
    return res.json({message: 'Página não encontrada'}); 
});


server.listen(port)


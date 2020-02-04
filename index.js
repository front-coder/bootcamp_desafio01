const express = require('express');
const server = express();
server.use(express.json());

// Contador de requisições
let count = 0;

//Variaveis de ambiente
require('dotenv').config();

//Porta
const port = process.env.PORT || 3000;

//Variável para armazenamento dos projetos
const projects = [];

/*  ===== Middlewares ===== */

server.use((req, res, next) => {
    count++;
    console.log(`Foram feitas ${count} requisições até o momento`);
    return next();
});

function checkProjectExists(req, res, next) {
    const { id } = req.params;
    let exists = false;

    projects.forEach((project) => {
        if(project.id === id){
            exists = true;
        }
    });    

    if(!exists){
        return res.status(400).json({error: 'Project does not exists'});
    }

    return next();

}

/*  ===== Middlewares ===== */

// Lista todos os projetos
server.get('/projects', (req, res) => {
    return res.json(projects); 
});

// Cria um novo projeto
server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    let project = {
        id,
        title,
        tasks: []
    }

    projects.push(project);

    return res.json(projects); 
});

// Edita o título de um projeto existente
server.put('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    projects.forEach((project) => {
        if(project.id === id){
            project.title = title
        }
    });

    return res.json(projects); 
});

// Remove o projeto com o id selecionado
server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;

    projects.forEach((project, idx) => {
        if(project.id === id){
            projects.splice(idx, 1)
        }
    });

    return res.send(); 
});

// Adiciona tarefas para um projeto
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    projects.forEach((project) => {
        if(project.id === id){
            project.tasks.push(title)
        }
    });

    return res.json(projects); 
});

// Rota usada caso uma url não mapeada seja digitada 
server.get('*', (req, res) => {
    return res.json({message: 'Página não encontrada'}); 
});


server.listen(port)


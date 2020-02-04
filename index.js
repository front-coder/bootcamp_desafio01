const express = require('express');
const server = express();
server.use(express.json());

//Variaveis de ambiente
require('dotenv').config();

//Porta
const port = process.env.PORT || 3000;

//Variável para armazenamento dos projetos
const projects = [];

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
server.put('/projects/:id', (req, res) => {
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
server.delete('/projects/:id', (req, res) => {
    const { id } = req.params;

    projects.forEach((project, idx) => {
        if(project.id === id){
            projects.splice(idx, 1)
        }
    });

    return res.send(); 
});

// Adiciona tarefas para um projeto
server.post('/projects/:id/tasks', (req, res) => {
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


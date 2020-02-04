const express = require('express');
const server = express();
server.use(express.json());

//Variaveis de ambiente
require('dotenv').config();

//Porta
const port = process.env.PORT || 3000;

//Variável para armazenamento dos projetos
const projects = [];

/*  ===== Middlewares ===== */

/* Middleware que loga o número de requisições efetuadas */
server.use((req, res, next) => {
    console.count("Número de requisições");
    return next();
});

/* Middleware que verifica se o existe um projeto com o id passado na rota */
function checkProjectExists(req, res, next) {
    const { id } = req.params;
    const project = projects.find(p => p.id === id);

    if (!project) {
        return res.status(400).json({ error: 'Project not found' });
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

    return res.json(project); 
});

// Edita o título de um projeto existente
server.put('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id === id);
    
    project.title = title;

    return res.json(project); 
});

// Remove o projeto com o id selecionado
server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;

    const projectIdx = projects.findIndex(p => p.id === id);

    projects.splice(projectIdx, 1);

    return res.send(); 
});

// Adiciona tarefas para um projeto
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id === id);

    project.tasks.push(title)
    
    return res.json(project); 
});

// Rota usada caso uma url não mapeada seja digitada 
server.get('*', (req, res) => {
    return res.json({message: 'Página não encontrada'}); 
});


server.listen(port)


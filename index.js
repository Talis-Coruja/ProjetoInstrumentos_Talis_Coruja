
const express = require('express');
const mongoose = require('mongoose');
const Instrumento = require('./models/Instrumento');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

// Conexão com o banco de dados exclusivo do projeto
mongoose.connect('mongodb://127.0.0.1:27017/instrumentos_talis')
    .then(() => {
        console.log('MongoDB conectado com sucesso!');
        console.log('Banco: instrumentos_talis');

        // Inicia o servidor somente após conectar ao MongoDB
        app.listen(3000, () => {
            console.log('Servidor rodando em http://localhost:3000');
        });
    })
    .catch((erro) => {
        console.error('Erro na conexão:', erro);
    });

// Página inicial
app.get('/', (req, res) => {
    res.redirect('/instrumento/lst');
});

// Formulário de cadastro
app.get('/instrumento/add', (req, res) => {
    res.render('instrumento/add');
});

// Salvar instrumento
app.post('/instrumento/add', async (req, res) => {
    try {
        const instrumento = new Instrumento({
            nome: req.body.nome,
            fabricante: req.body.fabricante,
            preco: Number(req.body.preco),
            tipo: req.body.tipo
        });

        await instrumento.save();

        res.render('instrumento/addok', {
            instrumento: instrumento
        });

    } catch (erro) {
        res.status(500).send('Erro ao cadastrar instrumento: ' + erro.message);
    }
});

// Listar instrumentos
app.get('/instrumento/lst', async (req, res) => {
    try {
        const instrumentos = await Instrumento.find();

        res.render('instrumento/lst', {
            instrumentos: instrumentos
        });

    } catch (erro) {
        res.status(500).send('Erro ao consultar instrumentos: ' + erro.message);
    }
});
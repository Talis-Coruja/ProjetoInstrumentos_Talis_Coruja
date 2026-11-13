
const mongoose = require('mongoose');

const instrumentoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    fabricante: {
        type: String,
        required: true
    },
    preco: {
    type: Number,
    required: true
    },
    tipo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Instrumento', instrumentoSchema);

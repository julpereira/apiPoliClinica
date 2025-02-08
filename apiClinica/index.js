import express from 'express';

import { retornaMedicos, retornaMedicosNome, retornaMedicosEspecialidade } from './servico/retornaMedicos_servico.js';

const app = express();
const porta = 3000;

app.get('/medicos', async (req, res) => {
    const { nome, especialidade } = req.query;
    let medicos;

    if (nome) {
        medicos = await retornaMedicosNome(nome);
    } else if (especialidade) {
        medicos = await retornaMedicosEspecialidade(especialidade);
    } else {
        medicos = await retornaMedicos();
    }

    res.json(medicos);
});

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});

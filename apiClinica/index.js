import express from 'express';

import { retornaMedicos, retornaMedicosID, retornaMedicosNome, retornaMedicosEspecialidade } from './servico/retornaMedicos_servico.js';

const app = express();

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

app.get('/medicos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const medicos = await retornaMedicosID(id);
    if (medicos.length > 0) {
        res.json(medicos);
    } else{
        res.status(404).json({ Mensagem: "Nenhum médico encontrado"})
    }
});

app.listen(9000, async () => {
    const data = new Date();
    console.log("Servidor node iniciado em:" +data);
})

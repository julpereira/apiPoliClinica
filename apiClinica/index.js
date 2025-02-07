import express from 'express';
import { retornaMedicos, retornaMedicosID, retornaMedicosEspecialidade, retornaMedicosNome } from './servico/retornaMedicos_servico.js';

const app = express();

app.get('/medicos', async (req, res) => {
    let medicos;
    const nome = req.query.nome;
    const especialidade = req.query.especialidade;

    try {
        if (!nome && !especialidade) {
            medicos = await retornaMedicos();
        } else if (nome) {
            medicos = await retornaMedicosNome(nome);
        } else if (especialidade) {
            medicos = await retornaMedicosEspecialidade(especialidade);
        }

        if (!medicos || medicos.length === 0) {
            return res.status(404).json({ mensagem: "Nenhum médico encontrado." });
        }

        res.json(medicos);

    } catch (erro) {
        console.error("Erro ao buscar médicos:", erro);
        res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
});

app.get('/medicos/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ mensagem: "ID inválido." });
    }

    try {
        const medico = await retornaMedicosID(id);
        
        if (!medico) {
            return res.status(404).json({ mensagem: "Nenhum médico encontrado." });
        }

        res.json(medico);
    } catch (erro) {
        console.error("Erro ao buscar médico:", erro);
        res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
});

app.listen(9000, () => {
    const data = new Date();
    console.log("Servidor node iniciado em: " + data);
}); 
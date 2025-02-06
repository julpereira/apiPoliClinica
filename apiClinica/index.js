import express from 'express';
import pool from './servico/conexao.js';
import { retornaMedicos, retornaMedicosEspecialidade, retornaMedicosNome} from './servico/retornaMedicos_servico.js';

const app = express();

app.get('/medicos', async (req, res) => {
    let medicos;
    const nome = req.query.nome;
    const especialidade = req.query.especialidade;

    if (typeof nome === 'undefined' && typeof especialidade === 'undefined') {
        medicos = await retornaMedicos();
    } else if (typeof ano !== 'undefined') {
        medicos = await retornaMedicosNome(nome);
    
    }else if (typeof time !== 'undefined') {
        medicos = await retornaMedicosEspecialidade(especialidade);
    }
});

// app.get('/medicos/:id', async (req, res) => {
//     const id = parseInt(req.params.id);
//     const medico = await retornaMedicosID(id);
//     if (medico.length > 0) {
//         res.json(medico);
//     } else{
//         res.status(404).json({ Mensagem: "Nenhum médico encontrado"})
//     }
// });

app.listen(9000, async () => {
    const data = new Date();
    console.log("Servidor node iniciado em:" +data);
    const conexao = await pool.getConnection();
    console.log(conexao.threadId);
    conexao.release();
})
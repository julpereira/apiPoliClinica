import pool from './conexao.js';

export async function retornaMedicos() {
    const conexao = await pool.getConnection();
    const query = 'SELECT id, nome,  telefone, especialidade FROM medicos';
    const medicos = executaQuery(conexao, query);
    conexao.release();
    return medicos;
}

export async function retornaMedicosNome(nome) {
    const conexao = await pool.getConnection();
    const query = 'SELECT id, nome, telefone, especialidade FROM medicos WHERE nome = ' + nome;
    const medicos = executaQuery(conexao, query);
    conexao.release();
    return medicos;
} 

export async function retornaMedicosID(id) {
    const conexao = await pool.getConnection();
    const query = 'SELECT id, nome, telefone, especialidade FROM medicos WHERE id = ' + id;
    const medicos = executaQuery(conexao, query);
    conexao.release();
    return medicos;
}

export async function retornaMedicosEspecialidade(especialidade) {
    const conexao = await pool.getConnection();
    const query = 'SELECT id, nome, telefone, especialidade FROM medicos WHERE especialidade like "%' + especialidade + '%"';
    const medicos = executaQuery(conexao, query);
    conexao.release();
    return medicos;
}

async function executaQuery(conexao,query) {
    const resultado_query = await conexao.execute(query);
    const resposta = resultado_query[0];
    return resposta;
}
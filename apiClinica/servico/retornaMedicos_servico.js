import pool from './conexao.js';

export async function retornaMedicos() {
    const conexao = await pool.getConnection();
    const query = 'SELECT id, nome, telefone, especialidade FROM medicos';
    try {
        const medicos = await executaQuery(conexao, query);
        return medicos;
    } finally {
        conexao.release();
    }
}

export async function retornaMedicosNome(nome) {
    const conexao = await pool.getConnection();
    const query = 'SELECT id, nome, telefone, especialidade FROM medicos WHERE nome = ?';
    try {
        const medicos = await executaQuery(conexao, query, [nome]);
        return medicos;
    } finally {
        conexao.release();
    }
} 

export async function retornaMedicosID(id) {
    const conexao = await pool.getConnection();
    const query = 'SELECT id, nome, telefone, especialidade FROM medicos WHERE id = ?';
    try {
        const medicos = await executaQuery(conexao, query, [id]);
        return medicos.length > 0 ? medicos[0] : null; // Retorna o médico ou null se não encontrado
    } finally {
        conexao.release();
    }
}

export async function retornaMedicosEspecialidade(especialidade) {
    const conexao = await pool.getConnection();
    const query = 'SELECT id, nome, telefone, especialidade FROM medicos WHERE especialidade LIKE ?';
    try {
        const medicos = await executaQuery(conexao, query, [`%${especialidade}%`]);
        return medicos;
    } finally {
        conexao.release();
    }
}

async function executaQuery(conexao, query, params = []) {
    const resultado_query = await conexao.execute(query, params);
    return resultado_query[0]; // Retorna o resultado da consulta
}
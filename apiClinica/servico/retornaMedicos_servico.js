import pool from './conexao.js';

export async function retornaMedicos() {
    const resultado = await pool.execute('SELECT id, nome, telefone, email, especialidade FROM medicos ORDER BY id');
    return resultado[0]; // Resultado da consulta ordenado pelo id
}

export async function retornaMedicosNome(nome) {
    const resultado = await pool.execute('SELECT id, nome, telefone, email, especialidade FROM medicos WHERE nome LIKE ? ORDER BY id', [`%${nome}%`]);
    return resultado[0]; // Resultado da consulta ordenado pelo id
}

export async function retornaMedicosEspecialidade(especialidade) {
    const resultado = await pool.execute('SELECT id, nome, telefone, email, especialidade FROM medicos WHERE especialidade = ? ORDER BY id', [especialidade]);
    return resultado[0]; // Resultado da consulta ordenado pelo id
}

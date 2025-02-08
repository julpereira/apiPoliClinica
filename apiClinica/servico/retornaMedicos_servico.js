import pool from './conexao.js';

export async function retornaMedicos() {
    const resultado = await pool.execute('SELECT id, nome, telefone, email, especialidade FROM medicos ORDER BY id');
    return resultado[0]; 
}

export async function retornaMedicosNome(nome) {
    const resultado = await pool.execute('SELECT id, nome, telefone, email, especialidade FROM medicos WHERE nome LIKE ? ORDER BY id', [`%${nome}%`]);
    return resultado[0]; 
}

export async function retornaMedicosEspecialidade(especialidadeParcial) {
    try {
        const [resultadoMedicos] = await pool.execute(
            `SELECT m.id, m.nome, m.telefone, m.email, e.especialidade 
             FROM medicos m
             JOIN especialidades e ON m.especialidade = e.id
             WHERE LOWER(e.especialidade) LIKE CONCAT('%', LOWER(?), '%')
             ORDER BY m.id`,
            [especialidadeParcial]
        );

        return resultadoMedicos;
    } catch (erro) {
        console.error('Erro ao buscar médicos por especialidade:', erro);
        res.status(500).json({ mensagem: "Erro interno do servidor."});
    }
}

const pool = require('../config/database');

const createTables = async () => {
    const client = await pool.connect();

    try {
        await client.query(`
      CREATE TABLE IF NOT EXISTS toDoList (
        id SERIAL PRIMARY KEY,
        name varchar(255),
        description varchar(255),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        console.log('Tabelas criadas com sucesso!');
    } catch (error) {
        console.error('Erro ao criar tabelas:', error);
    } finally {
        client.release();
    }
};

const insertToDo = async (name, description) => {
    const query = 'INSERT INTO toDoList (name, description) VALUES ($1, $2) RETURNING *';
    const values = [name, description];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao inserir dados na tabela toDoList:', error);
    }
};

const listToDo = async () => {
    const query = 'SELECT * FROM toDoList';
    try {
        const client = await pool.connect();
        const result = await client.query(query);
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Erro ao listar dados da tabela toDoList:', error);
    }
};

const updateToDo = async (id, name, description) => {
    const query = 'UPDATE toDoList SET name = $1, description = $2 WHERE id = $3 RETURNING *';
    const values = [name, description, id];
    try {
        const client = await pool.connect();
        const result =  await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao inserir dados na tabela toDoList:', error);
    }
};

const deleteToDo = async (id) => {
    const query = 'DELETE FROM toDoList WHERE id = $1 RETURNING *';
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao inserir dados na tabela toDoList:', error);
    }
};

createTables();

module.exports = {
    insertToDo,
    listToDo,
    updateToDo,
    deleteToDo
};

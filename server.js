const express = require('express');
const { insertToDo, listToDo, updateToDo, deleteToDo } = require('./database/database');
const app = express();
const port  = 3333;

app.use(express.json());

app.post('/create', async (req, res) => {
    const {name, description} = req.body;

    try {
        const result = await insertToDo(name, description);

        res.status(201).json({ message: 'Criado com sucesso', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar ToDo', error });
    }
});

app.get('/listToDo', async (req, res) => {

    try {
        const result = await listToDo();

        res.status(201).json({ message: 'Listado com sucesso', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar', error });
    }
});

app.put('/update', async (req, res) => {
    const {id, name, description} = req.body;

    try {
        const result = await updateToDo(id , name, description);

        res.status(201).json({ message: 'Atualizado com sucesso', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar', error });
    }
});

app.delete('/delete', async (req, res) => {
    const { id } = req.body;

    try {
        const result = await deleteToDo(id);

        res.status(201).json({ message: 'Removido com sucesso', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar', error });
    }
});

app.listen(port, () => {
    console.log(`SERVIDOR RODANDO NA PORTA ${port}`);
});

const fs = require('fs');
const localDoBanco = 'banco/pets.json'; // local do banco de dados

function pegarPets(res, next) {
    fs.readFile(`${localDoBanco}`, (err, data) => {
        if (err) {
            console.error(err);
            return next(err); // uso do next para retornar o erro > está localizado em app.js
        }
        const endpoint = JSON.parse(data);
        return res.json(endpoint);
    });
}

function pegarPetPorId(req, res, next) {
    const id = Number(req.params.id);
    fs.readFile(`${localDoBanco}`, (err, data) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        const endpoint = JSON.parse(data);
        const elementoEncontrado = endpoint.find(elem => elem.id === id);

        if (elementoEncontrado) {
            return res.json(elementoEncontrado);
        } else {
            return res.json('Não encontrado');
        }
    });
}

function criarPet(req, res) {
    fs.readFile(`${localDoBanco}`, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao processar o arquivo' });
        }
        const endpoint = JSON.parse(data);

        const idPresentes = endpoint.map(elem => elem.id); // mapeia todos os ids dentro do array
        let id = 1;
        while (idPresentes.includes(id)) { // enquanto encontrar um id presente, incrementa o id
            id++;
        }
        const novoElemento = { // construi o novo elemento
            id: id, // adiciona o id
            ...req.body, // pega todos os campos do body (corpo da requisição)
        };

        endpoint.push(novoElemento);
        fs.writeFile(`${localDoBanco}`, JSON.stringify(endpoint, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao salvar os dados' });
            }
            res.json(endpoint);
        });
    });
};

function atualizarPet(req, res, id) {
    fs.readFile(`${localDoBanco}`, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao processar o arquivo' });
        }
        const endpoint = JSON.parse(data);
        const procurarElemento = endpoint.find(elem => elem.id === id);
        if (procurarElemento) {
            // o map procura o id do elemento e o retorna > ...elem é uma operação spread que copia todos os campos > ...req.body é a requisição
            const elementoAtualizado = endpoint.map(elem => elem.id === id ? { ...elem, ...req.body } : elem);
            fs.writeFile(`${localDoBanco}`, JSON.stringify(elementoAtualizado, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Erro ao salvar os dados' });
                }
                res.json(elementoAtualizado);
            });
        } else {
            res.status(404).json({ error: 'Elemento não encontrado' });
        }
    });
};

function apagarPet(req, res, id) {
    fs.readFile(`${localDoBanco}`, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao processar o arquivo' });
        }
        const endpoint = JSON.parse(data);
        const procurarElemento = endpoint.find(elem => elem.id === id);
        if (procurarElemento) {
            const elementoAtualizado = endpoint.filter(elem => elem.id !== id);
            fs.writeFile(`${localDoBanco}`, JSON.stringify(elementoAtualizado, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Erro ao salvar os dados' });
                }
                res.json(elementoAtualizado);
            });
        } else {
            res.status(404).json({ error: 'Elemento não encontrado' });
        }
    });
};

module.exports = {
    pegarPets,
    pegarPetPorId,
    criarPet,
    atualizarPet,
    apagarPet
};
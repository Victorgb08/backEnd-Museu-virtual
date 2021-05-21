//geramos um texto aleatorio com o crypto
const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    //index é para listar os users
    async index (request, response) {
        const users = await connection ('user').select('*');

    return response.json(users);
    },

    async create(request, response) {
    const { name, email, password, address, question} = request.body;

    const user_id = crypto.randomBytes(4).toString('HEX');

    //entre parenteses fica a tabela que eu quero inserir dados
    //com o await o node vai esperar esse codigo do connection terminar para ai chegar no return
    await connection('user').insert({
        user_id,
        name,
        address,
        email,
        password,
        question,
    })

    return response.json({ user_id });
    }
};
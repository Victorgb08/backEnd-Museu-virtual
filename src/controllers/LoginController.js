//Eles chamam de session, mas prefiro login msm
const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        //esse id é oq vai vir no params e vou verificar se ele existe
        const { id } = request.body;
//esse where é basicamente, o user_id é igual ao id (variavel q criamos agora) q veio por params
        const user_id = await connection('user')
        .where('user_id', id)
        .select('name')
        .first();

        if (!user_id) {
            return response.status(400).json({ eror: 'No User found with this ID' });
        }
    return response.json(user_id);
    }
}
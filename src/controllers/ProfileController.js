//este perfil será responsável por todas as pinturas de um usuário
const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const user_id = request.headers.authorization;

        const pinturas = await connection('pintura')
            .where('user_id', user_id)
            .select('*');

        return response.json(pinturas);
    }
}
const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const { page = 1 } = request.query;
        const [count] = await connection('comentarios').count();
             
        const comentario = await connection ('comentarios')
            .join('pintura', 'pintura.images_id', '=', 'comentarios.images_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'comentarios.*',
                'pintura.images_id'
            ]);

//para retornar count vamos usar o cabeçalho da resposta, com o header
        response.header('X-Total-Count', count['count(*)']);
        
        return response.json(comentario);
    },
    
    async create(request, response){
        const { comment } = request.body;
        
        const comment_id = crypto.randomBytes(8).toString('HEX');
        const images_id = request.headers.authorization;

        await connection('comentarios').insert({
            comment_id,
            images_id,
            comment,
        });

        return response.json({ comment_id });
    },

    async delete (request, response) {
//este id é o comments_id q é passado pelo params, vamos usar ele pra deletar depois
        const { id }  = request.params;
        const images_id = request.headers.authorization;

        const comentarios = await connection('comentarios')
            .where('comment_id', id)
            .select('images_id')
            .first();

        if (comentarios.images_id != images_id){
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('comentarios').where('comment_id', id).delete();
        return response.status(204).send();
    },
};
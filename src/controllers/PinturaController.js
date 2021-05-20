const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
//Para nao retornar todas as pinturas de uma vez, vamos fazer uma logica de paginação
//vamos buscar com o query o pages e se ele nao existir vamos inicia-lo com 1
//vai ficar assim por exemplo: http://localhost:3333/pinturas?page=2
        const { page = 1 } = request.query;
//esse cout vai se para contar quantas pinturas estao cadastradas, da pra fazer isso com os comentarios
        const [count] = await connection('pintura').count();
        
//para relacionar dados de duas tabelas usamos o join, podemos ler ele assim: quero trazer dados
//da tabela de user, apenas dados da tabela q o user_id da tabela user seja igual ao user_id da tabela de pinturas
//no select eu escolhi todas as categorias de pintura mais algumas de user        
        const pinturas = await connection ('pintura')
            .join('user', 'user.user_id', '=', 'pintura.user_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'pintura.*',
                'user.name',
                'user.email'
            ]);

//para retornar count vamos usar o cabeçalho da resposta, com o header
        response.header('X-Total-Count', count['count(*)']);
        
        return response.json(pinturas);
    },
    
    async create(request, response){
        const { title, description, numComments, objective, url_img, category } = request.body;
        //informações como qual usuario ta logado vem atraves do cabeçalho e nao do corpo da
        //requisição e para acessar o cabeçalho usamos o headers, nele vem tudo q tem a ver com
        //o contexto da requisição, local, id, etc
        //request.headers

        const images_id = crypto.randomBytes(6).toString('HEX');
        const user_id = request.headers.authorization;

        await connection('pintura').insert({
            images_id,
            user_id,
            title,
            description,
            numComments,
            objective,
            url_img,
            category,
        });

        return response.json({ images_id, numComments });
    },

    async delete (request, response) {
        //este id é o images_id q é passado pelo params, vamos usar ele pra deletar depois
        const { id }  = request.params;
        const user_id = request.headers.authorization;

        const pintura = await connection('pintura')
            .where('images_id', id)
            .select('user_id')
            .first();
//o codigo 401 é de nao autorizado, ou seja, estamos verificando se o user_id q pediu para deletar
//a imagem é o mesmo user_id da imagem!!

//Nao to conseguindo deletar, nao sei como é o sinal de diferente aqui
        if (pintura.user_id != user_id){
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('pintura').where('images_id', id).delete();
        //status 204 é um q teve sucesso mas nao tem conteudo para passar
        return response.status(204).send();
    },
};
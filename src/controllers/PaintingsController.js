const { getByUserId } = require("../models/PaintingsModel");
const PaintingsModel = require("../models/PaintingsModel");

module.exports = {
    //aqui nao passa nada na rota so passa no body todas os campos q precisa menos o id da pintura(q vai ser gerado automaticamente e salvo junto)
    async create(request, response){
        try{
            const NewPainting = request.body;
            const result = await PaintingsModel.create(NewPainting);

            return response.status(200).json({painting_id: result});
        } catch (err) {
            console.warn("Painting creation failed: " + err);
            return response.status(500).json({
                notification: "Internal server error while trying to create Painting",
            });           
        }
    },

    //aqui passa o id da pintura como params que vc quer pegar todas as informações
    async getById(request, response){
        try {
            const { painting_id } = request.params;
            const result = await PaintingsModel.getById(painting_id);

            return response.status(200).json(result);
        } catch (err) {
            console.warn("Painting getById failed: " + err);
            return response.status(500).json({
                notification: "Internal server error while trying to getById Painting",
            });
        }
    },

    //aqui passa o user_id como params e mostra todas as sua pinturas
    async getByUserId(request, response){
        try {
            const { user_id } = request.params;
            const result = await PaintingsModel.getByUserId(user_id);

            return response.status(200).json(result);
        } catch (err) {
            console.warn("Painting getByUserId failed: " + err);
            return response.status(500).json({
                notification: "Internal server error while trying to getByUserId Painting",
            });
        }
    },

    //aqui passa nada e mostra todos as pinturas com todas info
    async index(request, response){
        const painting = await PaintingsModel.index();
        return response.json(painting);
    },

    //aqui recebe na rota o id da painting que quer mudar e passa no body oq vai mudar(pode ser tudo, ou so um campo se quiser)
    async update(request, response){
        try {
            const { painting_id } = request.params;
            const NewPainting = request.body;

            await PaintingsModel.updateById(painting_id, NewPainting);

            return response.status(200).json({ notification: "Painting update sucesfully" });
        } catch (err) {
            console.warn("Painting update failed: " + err);
            return response.status(500).json({
                notification: "Internal server error while trying to update Painting",
            });
        }
    },

    //aqui passa na rota o id da painting q quer deletar (e do usuario para nao deletar de outra pessoa - depois atualiza isso aqui)
    async delete(request, response){
        try {
            const { painting_id } = request.params;
            const result = await PaintingsModel.deleteById(painting_id);

            if (result===0)
                return response.status(400).json({ notification: "painting_id not found"});
            return response.status(200).json({ notification: "Painting deleted sucesfully" });
        } catch (err) {
            console.warn("Painting delete failed: " + err);
            return response.status(500).json({
                notification: "Internal server error while trying to delete Painting",
            });
        }
    }
}
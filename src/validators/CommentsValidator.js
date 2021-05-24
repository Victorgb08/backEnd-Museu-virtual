//O validator é para quando o body vier, por exemplo, com o campo title escrito errado e aparece tite, ai 
//vai vir dai o uso do validator, para q nao aconteça o erro 500, se tiver faltando info tmb.
const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
    create: celebrate({
        [Segments.BODY]: Joi.object().keys({
            painting_id: Joi.string().required(),
            comment: Joi.string().required(),
        })
    }),
    getById: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            comments_id: Joi.string().required(),
        })
    }),
    getByPaintingId: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            painting_id: Joi.string().required(),
        })
    }),
    update: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            comments_id: Joi.string().required(),
        }),
        [Segments.BODY]: Joi.object().keys({
            comment: Joi.string().optional(),
        })
    }),
    delete: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            comments_id: Joi.string().required(),
        })
    }),
};
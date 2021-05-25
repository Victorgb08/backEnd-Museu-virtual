//O validator é para quando o body vier, por exemplo, com o campo title escrito errado e aparece tite, ai 
//vai vir dai o uso do validator, para q nao aconteça o erro 500, se tiver faltando info tmb.
const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
    create: celebrate({
        [Segments.BODY]: Joi.object().keys({
            user_id: Joi.string().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            objective: Joi.string().required(),
            src: Joi.string().required(),
            category: Joi.string().required(),
            width: Joi.required(),
            height: Joi.required(),
        }),
        [Segments.HEADERS]: Joi.object()
        .keys({
            authorization: Joi.string().required(),
        })
        .unknown(),
    }),
    
    getByUserId: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            user_id: Joi.string().required(),
        })
    }),
    getById: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            painting_id: Joi.string().required(),
        })
    }),
    update: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            painting_id: Joi.string().required(),
        }),
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().optional(),
            description: Joi.string().optional(),
            objective: Joi.string().optional(),
            url_img: Joi.string().optional(),
            category: Joi.string().optional(),
            width: Joi.optional(),
            height: Joi.optional(),
        })
        .min(1),
    }),
    delete: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            painting_id: Joi.string().required(),
        })
    }),
};
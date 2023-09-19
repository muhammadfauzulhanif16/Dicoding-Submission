const Joi = require('joi')

exports.AlbumPayloadSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  year: Joi.number()
    .min(1900)
    .max(new Date().getFullYear())
    .positive()
    .required(),
})

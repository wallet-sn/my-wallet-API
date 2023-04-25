import Joi from "joi";

export const transactionSchema = Joi.object({
  description: Joi.string().required(),
  value: Joi.number().required(),
  type: Joi.string().valid("withdraw", "deposit").required(),
  date: Joi.string()
    .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
    .optional(),
});

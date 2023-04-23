export default function validationMiddleware(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const errors = validation.details.map((detail) => detail.message);
      return res.status(422).json({ errors });
    }

    next();
  };
}

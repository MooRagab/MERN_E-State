import joi from "joi";

const dataMethod = ["body", "query", "headers", "params"];

export const validation = (schema) => {
  return (req, res, next) => {
    const validationArr = [];
    dataMethod.forEach((key, i) => {
      if (schema[key]) {
        const validationResult = schema[key].validate(req[key], {
          abortEarly: false,
        });
        if (validationResult?.error?.details) {
          validationArr.push(validationResult.error.details);
        }
      }
    });
    if (validationArr.length) {
      res.json({ message: "Validation Error", err: validationArr });
    } else {
      next();
    }
  };
};

export const signUp = {
  body: joi
    .object()
    .required()
    .keys({
      username: joi.string().required().min(3).max(15),
      email: joi.string().required().email().messages({
        "any.required": "Plz Send Your Email",
        "any.empty": "Plz Send Your Email",
        "string.email": "Plz Enter Valid Email",
        "string.base": "Email Accept String Value Only",
      }),
      password: joi
        .string()
        .pattern(
          new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        )
        .required(),
      cpassword: joi.string().valid(joi.ref("password")).required(),
    }),
};

import * as yup from "yup";

export const createProductSchema = yup.object().shape({
  name: yup.string().required().max(100),
  price: yup.number().required().positive().integer(),
  updateDate: yup.date().notRequired(),
});

export const updateProductSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required().max(100),
  price: yup.number().required().positive().integer(),
  updateDate: yup.date().notRequired(),
});

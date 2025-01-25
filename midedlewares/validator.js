import Joi from "joi";

const ArticleSourceSchema = Joi.object({
  id: Joi.string().allow(null).optional(),
  name: Joi.string().required()
});

const ArticleSchema = Joi.object({
  source: ArticleSourceSchema.required(),
  author: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  url: Joi.string().uri().required(),
  urlToImage: Joi.string().uri().optional(),
  publishedAt: Joi.date().iso().required(),
  content: Joi.string().required()
});

const NewsResponseSchema = Joi.object({
  articles: Joi.array().items(ArticleSchema).min(1).required()
});

export default NewsResponseSchema;

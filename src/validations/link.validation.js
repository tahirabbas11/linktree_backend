const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createLinkTree = {
  body: Joi.object().keys({
    // email: Joi.string().required().email(),
    name: Joi.string().required(),
    links :  Joi.array().required()
  }),
};

const getLink = {
  params: Joi.object().keys({
    // id: Joi.string().custom(objectId),
    name: Joi.string(),
  }),
};

const updateLinkTree = {
  params: Joi.object().keys({
    // id: Joi.string().custom(objectId),
    name: Joi.string(),
  }),
  body: Joi.object().keys({
    slug: Joi.string().required(),
    link: Joi.string().required(),
  }),
};

const deleteLink = {
  params: Joi.object().keys({
    // id: Joi.string().custom(objectId),
    name: Joi.string(),
  }),
  body: Joi.object().keys({
    slug: Joi.string().required(),
  }),
};

module.exports = {
  createLinkTree,
  getLink,
  updateLinkTree,
  deleteLink,
};



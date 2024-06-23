const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const linkTreeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
      links: [{
        slug: {
          type: String,
          required: false,
          trim: true,
        },
        link: {
          type: String,
          required: false,
          trim: true,
        },
      }],
    },

  {
    timestamps: true,
  }
);

linkTreeSchema.set('toObject', { getters: true, virtuals: true });
linkTreeSchema.set('toJSON', { getters: true, virtuals: true });

// add plugin that converts mongoose to json
linkTreeSchema.plugin(toJSON);
linkTreeSchema.plugin(paginate);

/**
 * @typedef LinkTree
 */
const LinkTree = mongoose.model('LinkTree', linkTreeSchema);

module.exports = LinkTree;


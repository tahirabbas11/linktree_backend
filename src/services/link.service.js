const httpStatus = require('http-status');
const { LinkTree, User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a LinkTree
 * @param {Object} linkTreeBody
 * @returns {Promise<LinkTree>}
 */
const createLinkTree = async (linkTreeBody) => {
  return LinkTree.create(linkTreeBody);
};

/**
 * Query for LinkTree
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryLinkTrees = async (filter, options) => {
  const linkTrees = await LinkTree.paginate(filter, options);
  return linkTrees;
};

/**
 * Get LinkTree by name
 * @param {string} name
 * @returns {Promise<LinkTree>}
 */
const getLinkTreeByName = async (name) => {
  return LinkTree.findOne({ name });
};

/**
 * Update LinkTree by name
 * @param {string} name
 * @param {Object} updateBody
 * @returns {Promise<LinkTree>}
 */
const updateLinkTreeByName = async (name, updateBody) => {
  const linkTree = await getLinkTreeByName(name);
  if (!linkTree) {
    throw new ApiError(httpStatus.NOT_FOUND, 'LinkTree not found');
  }
  const { slug, link } = updateBody;

  if (slug) {
    const index = linkTree.links.findIndex((item) => item.slug === slug);
    if (index !== -1) {
      linkTree.links[index].link = link;
    } else {
      linkTree.links.push({ slug, link });
    }
  } else {
    linkTree.links.push({ slug, link });
  }

  await linkTree.save();
  return linkTree;
};

/**
 * Delete LinkTree by name
 * @param {string} name
 * @returns {Promise<LinkTree>}
 */
const deleteLinkTreeByName = async (name) => {
  const linkTree = await getLinkTreeByName(name);
  if (!linkTree) {
    throw new ApiError(httpStatus.NOT_FOUND, 'LinkTree not found');
  }
  await linkTree.remove();
  return linkTree;
};

/**
 * Get User's bio and displayName by name
 * @param {string} name
 * @returns {Promise<Object>}
 */
const getUserBioAndDisplayNameByName = async (name) => {
  const user = await User.findOne({ name }, 'bio displayName');
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return { bio: user.bio, displayName: user.displayName };
};

module.exports = {
  createLinkTree,
  queryLinkTrees,
  getLinkTreeByName,
  updateLinkTreeByName,
  deleteLinkTreeByName,
  getUserBioAndDisplayNameByName,
};

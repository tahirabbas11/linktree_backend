const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { linkService } = require('../services');

const createLinkTree = catchAsync(async (req, res) => {
  const linkTree = await linkService.createLinkTree(req.body);
  res.status(httpStatus.CREATED).send(linkTree);
});

const getLink = catchAsync(async (req, res) => {
  const linkTree = await linkService.getLinkTreeByName(req.params.name);
  if (!linkTree) {
    throw new ApiError(httpStatus.NOT_FOUND, 'LinkTree not found');
  }

  const user = await linkService.getUserBioAndDisplayNameByName(req.params.name);
  res.send({ linkTree, user });
});

const updateLinkTree = catchAsync(async (req, res) => {
  const linkTree = await linkService.updateLinkTreeByName(req.params.name, req.body);
  res.send(linkTree);
});

const deleteLink = catchAsync(async (req, res) => {
  const linkTree = await linkService.getLinkTreeByName(req.params.name);
  if (!linkTree) {
    throw new ApiError(httpStatus.NOT_FOUND, 'LinkTree not found');
  }
  const slug = req.body.slug;
  const index = linkTree.links.findIndex((item) => item.slug === slug);
  if (index !== -1) {
    linkTree.links.splice(index, 1);
  }
  await linkTree.save();
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createLinkTree,
  getLink,
  updateLinkTree,
  deleteLink,
};


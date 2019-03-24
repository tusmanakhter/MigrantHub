const PinnedService = require('../models/PinnedService');
const { ServerError } = require('../errors/ServerError');

module.exports = {

  createPinnedService(userId) {
    const pinnedService = new PinnedService();
    pinnedService._id = userId.toLowerCase();
    return pinnedService.save().then(() => Promise.resolve('Pinned service has been created.')).catch((error) => {
      throw new ServerError('There was an error creating pinned service.', 400, error);
    });
  },

  updatePinnedService(userId, query) {
    return PinnedService.findByIdAndUpdate({ _id: userId }, query,
      { new: true }).exec()
      .then(() => Promise.resolve('Pinned Service has been updated.')).catch((error) => {
        throw new ServerError('There was an error updating pinned service in db.', 400, error);
      });
  },

  getPinnedService(userId, serviceId, allowDeleted) {
    if (allowDeleted) {
      return PinnedService.findOne({
        _id: userId,
        pinnedList: { $elemMatch: { serviceId } },
      }).exec()
        .then(pinnedService => Promise.resolve(pinnedService)).catch((error) => {
          throw new ServerError('There was an error retrieving pinned service.', 400, error);
        });
    }
    return PinnedService.findOne({
      _id: userId,
      pinnedList: { $elemMatch: { serviceId, deleted: false } },
    }).exec()
      .then(pinnedService => Promise.resolve(pinnedService)).catch((error) => {
        throw new ServerError('There was an error retrieving pinned service.', 400, error);
      });
  },

  getPinnedServices(query, offset, limit) {
    if (offset !== undefined && limit !== undefined) {
      return PinnedService
        .aggregate([
          { $match: query },
          {
            $project: {
              pinnedList: {
                $filter: {
                  input: '$pinnedList',
                  as: 'pinnedService',
                  cond: { $eq: ['$$pinnedService.deleted', false] },
                },
              },
            },
          },
        ]).skip(parseInt(offset, 10)).limit(parseInt(limit, 10)).exec()
        .then(services => Promise.resolve(services))
        .catch((error) => {
          throw new ServerError('There was an error retrieving pinned services.', 400, error);
        });
    }
    return PinnedService.find(query).exec()
      .then(services => Promise.resolve(services)).catch((error) => {
        throw new ServerError('There was an error retrieving pinned services.', 400, error);
      });
  },

  updatePinnedServiceState(userId, serviceId, deleted) {
    return PinnedService.update({ _id: userId, 'pinnedList.serviceId': serviceId }, { $set: { 'pinnedList.$.deleted': deleted } },
      { new: true }).exec()
      .then(() => Promise.resolve('Pinned Service has been updated.')).catch((error) => {
        throw new ServerError('There was an error updating pinned service in db.', 400, error);
      });
  },
};

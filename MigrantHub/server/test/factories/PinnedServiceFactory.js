module.exports.validPinnedServiceData = function() {
  return {
    _id : "test@test.com",
    pinnedList : [
      {
        serviceId : "5c8c6f39785ab592cc0974d4",
        deleted : true,
        _id : "5c8eecccdd5e8fa8a0f6001f"
      },
      {
        serviceId : "5c8c6f39785ab592cc0974d9",
        deleted : false,
        _id : "5c8eeccddd5e8fa8a0f60020"
      },
  ]
  }
};
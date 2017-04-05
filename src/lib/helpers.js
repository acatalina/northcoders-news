function normaliseData(data) {
  return data.reduce((acc, item) => {
    acc[item._id] = item;
    return acc;
  }, {});
}

module.exports = {
  normaliseData
};
function normaliseData(data) {
  return data.reduce((acc, item) => {
    acc[item._id] = item;
    return acc;
  }, {});
}

function getTopic(props) {
  let {params} = props;
  
  switch (true) {
    case params.hasOwnProperty('topic'):
      return params['topic'];
    case params.hasOwnProperty('article'): {
      let artRequest = params['article'];
      let article = props.articles[artRequest];
      let topic;

      if (!article) {
        topic = 'all';
      } else {
        topic = article['belongs_to'];
      }

      return topic;
    }
    default:
      return 'all';
  }
}

module.exports = {
  normaliseData,
  getTopic
};
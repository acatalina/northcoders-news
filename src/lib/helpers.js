const getTopic = (props) => {
  let {params} = props;

  switch (true) {
    case params.hasOwnProperty('topic'):
      return params['topic'];
    case params.hasOwnProperty('article_id'): {
      let artRequest = params['article_id'];
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
};

const getTime = (date) => {
    let currentDate = new Date();
    let tweetDate = new Date(date);
    let diffHours = currentDate.getHours() - tweetDate.getHours();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (currentDate.toDateString() !== tweetDate.toDateString()) {
      return tweetDate.getDate() + ' ' + months[tweetDate.getMonth()];
    } else {
      return diffHours ? diffHours + 'h' : 'less than an hour ago';
    }
  }

module.exports = {
  getTopic,
  getTime
};
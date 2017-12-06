import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewsFeedItem from '../components/NewsFeedItem';
import * as actions from '../actions/actions';

const mapStateToProps = state => ({
  main: state.main
});

const mapDispatchToProps = actions;

class NewsContainer extends Component {
  render() {
    console.log('this.props.main.feedList is: ', this.props.main.feedList)
    const newsFeedItemArr = this.props.main.feedList.map((article, i) => {
      console.log('NewsFeedItemzzz', article);
      return <NewsFeedItem
        key={i}
        id={article._id}
        author={article.author}
        title={article.title}
        description={article.description}
        url={article.url}
        urlToImage={article.urlToImage}
      />
    });
    return (
      <div>
        <h3>NEWS CONTAINER</h3>
        {newsFeedItemArr}
      </div>
    );
  };

};

export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);

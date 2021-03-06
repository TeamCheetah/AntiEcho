import * as jsCookie from 'js-cookie';
import * as types from '../constants/actionTypes';
const sourcesObj = require('../../../sources');

let feedList = [];
let allFeed = [];

const initialState = {
  isFetching: false,
  allFeed: allFeed,
  feedList: feedList,
  sliderValue: 0,
  userLogin: '',
  userAvatar: '',
  userPrefrences: {},
};

// an array of obj obj = {}.source.id
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FILTER_ARTICLES:
      const range = 2;
      const min = state.sliderValue - range;
      const max = state.sliderValue + range;
      const sources = Object.keys(sourcesObj)
        .filter(key => sourcesObj[key] >= min && sourcesObj[key] <= max);
      feedList = state.allFeed.filter(article => sources.includes(article.source.id));
      feedList = feedList.sort((a, b) => { // sort by date so that most recent stories are on top
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      });
      return {
        ...state,
        isFetching: false,
        feedList: feedList
      }
    case types.SEARCH_ARTICLES:
      if (action.payload.length === 0) feedList = [];
      else {
        const range = 2;
        const min = state.sliderValue - range;
        const max = state.sliderValue + range;
        const sources = Object.keys(sourcesObj)
          .filter(key => sourcesObj[key] >= min && sourcesObj[key] <= max);
        allFeed = action.payload;
        feedList = action.payload.filter(article => sources.includes(article.source.id));
        feedList = feedList.sort((a, b) => { // sort by date so that most recent stories are on top
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        });
      }

      return {
        ...state,
        isFetching: false,
        allFeed: allFeed,
        feedList: feedList
      };

    case types.SLIDER_CHANGE:
      return {
        ...state,
        sliderValue: action.payload
      };

    case types.FETCH_POSTS:
      return {
        ...state,
        isFetching: true
      };

    case types.SET_USER:
      console.log(jsCookie);
      return {
        ...state,
        userLogin: jsCookie.get('login'),
        userAvatar: jsCookie.get('avatar'),
        userPrefrences: jsCookie.get('prefrences')
      };

    default:
      return state;
  }
}

export default mainReducer;

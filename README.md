# redux-prepare

define fetch methods for required props simply.

## usage

```js
// ./components/article.js

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class Article extends React.Component {
  static propTypes = {
     article: ImmutablePropTypes.record.isRequired,
     onClickDestroy: PropTypes.func.isRequired,
  }

  render() {
    const { name } = this.props;

    return (
      <div>
        <h1>{article.get('title')}</h1>
        <p>{article.get('content')}</p>
        <button onClick={this.props.onClickDestroy}>Destroy!</button>
      </div>
    );
  }
}
```

```js
// ./containers/article.js

import Article from '../components/article';
import { connect } from 'react-redux';
import { prepare } from 'redux-prepare';
import {
  fetchArticle,
  destroyArticle,
} from './actions/articles';

const mapStateToProps = (state, ownProps) => ({
  article: state.getIn('article', ownProps.id),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickDestroy: () => {
    dispatch(destroyArticle(ownProps.id));
  },
});

const fetch = (dispatch, ownProps) => ({
  article: () => {
    dispatch(fetchArticle(ownProps.id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(prepare(fetch)(Article));
```

```js
// ./actions/articles.js

export const fetchArticle = (id) => (dispatch, getState) => {
  axios.get(`/api/articles/${id}`).then((res) => {
    dispatch({ type: STORE_ARTICLE, article: res.data });
  });
}
```

When state does not have `['article', id]`, `prepare` calls `fetch.article()` automatically,
and it render nothing instead of `Article`.

## Why happy?

- I don't have to write null check in Component like `if (!article) { return null; }`
- I don't have to give up to use `isRequied`

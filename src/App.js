import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'

import TopicList from './TopicList/Container'

export default class App extends Component {
  render() {
    return (
      <Provider
        store={store} >
        <div>
          <TopicList />
        </div>
      </Provider>
    )
  }
}
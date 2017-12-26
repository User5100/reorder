import React from 'react'
import { Provider } from 'react-redux'
import store from '../../../store'
import {
  loadTags,
  updateOrderOfTags
} from '../../../TopicList/actions/creators'
import { render } from 'enzyme'
import { 
  Unwrapped as UnwrappedTopicList 
} from '../../../TopicList/Container'

test('TopicList presentation renders correctly', () => {
  const component = render(
    <Provider store={store}>
      <UnwrappedTopicList
        topics={[]}
      />
    </Provider>
  )

  expect(component).toMatchSnapshot()
})
import {
  LOAD_TAGS,
  UPDATE_ORDER_OF_TAGS
} from '../TopicList/actions'
import {
  UPDATE_TAG
} from '../TopicItem/actions'

const initialState = {
  topics: []
}

function loadTags(state, action) {
  return Object.assign({}, state, { topics: action.payload })
}

function updateTag(state, action) {
  let index = state.topics.findIndex(topic => topic.id === action.payload.id),
      topics = state.topics
      
  topics = [...topics.slice(0, index),
            action.payload,
            ...topics.slice(index + 1, topics.length)]

  return Object.assign({}, state, { topics })
}

function updateOrderOfTags(state, action) {
  return Object.assign({}, state, { topics: action.payload })
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_TAGS:
      return loadTags(state, action)
    case UPDATE_TAG:
      return updateTag(state, action)
    case UPDATE_ORDER_OF_TAGS:
      return updateOrderOfTags(state, action)
    default:
      return state
  }
}

export default reducer
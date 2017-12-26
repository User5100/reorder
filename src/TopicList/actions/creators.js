import {
  LOAD_TAGS,
  UPDATE_ORDER_OF_TAGS
} from './index'

export function loadTags(tags) {
  return {
    type: LOAD_TAGS,
    payload: tags
  }
}

export function updateOrderOfTags(tags) {
  return {
    type: UPDATE_ORDER_OF_TAGS,
    payload: tags
  }
}
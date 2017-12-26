import {
  UPDATE_TAG
} from './index'

export function updateTag(tag) {
  return {
    type: UPDATE_TAG,
    payload: tag
  }
}
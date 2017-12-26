import { createStore } from 'redux'
import reducer from '../reducers'

const store = createStore(
	reducer,
	typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)

export default store
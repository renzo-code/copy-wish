import { combineReducers } from 'redux'

import edit from './edit'
import create from './create'

export default combineReducers({
  edit,
  create
})
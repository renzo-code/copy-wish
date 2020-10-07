import { combineReducers } from 'redux'

import list from './list'
import create from './create'
import edit from './edit'

export default combineReducers({
  list,
  create,
  edit
})
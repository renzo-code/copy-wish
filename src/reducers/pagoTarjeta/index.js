import { combineReducers } from 'redux'

import create from './create'
import list from './list'
import edit from './edit'

export default combineReducers ({
  create,
  list,
  edit
})
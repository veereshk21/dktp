/*
 *
 * Confirmation reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CN_ACTION_DONE,
  CN_ACTION_NOT_NOW,
  CN_ACTION_LEARN_HOW,
} from './constants';

export function confirmationReducer(state, action) {
  switch (action.type) {
    case CN_ACTION_DONE:
      return state.merge(fromJS(action.data.output));
    case CN_ACTION_NOT_NOW:
      return state.merge(fromJS(action.data.output));
    case CN_ACTION_LEARN_HOW:
      return state.merge(fromJS(action.data.output));
    default:
      return state;
  }
}

export default confirmationReducer;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Confirmation from './../components';
import * as actions from './../actions';

/* eslint-disable arrow-body-style */
const mapStatetoProps = (state) => {
  return state.toJS().confirmationView;
};

const dispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStatetoProps, dispatchToProps)(Confirmation);

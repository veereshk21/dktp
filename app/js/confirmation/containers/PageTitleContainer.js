/**
 * Created by gautam on 2/5/2017.
 */

import { connect } from 'react-redux';
import PageTitle from '../components/PageTitle';

/* eslint-disable arrow-body-style */
const mapStateToProps = (state) => {
  return {
    confirmationView: state.get('confirmationView').toJS(),
  };
};

const PageTitleContainer = connect(mapStateToProps)(PageTitle);

export default PageTitleContainer;

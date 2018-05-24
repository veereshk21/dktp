/**
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

/**
 * This component communicates with store and retreive the notificationbar state,so as to position the
 * main section down accordingly.
 */

import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationBar from '../NotificationBar';
import ScrollToTop from './ScrollToTop';


const App = (props) => {
  const footer = document.getElementById('vzw-gf');
  footer.style.display = 'block';
  // const ele = document.getElementsByClassName('promo-ribbon');
  // const topHeight = (window.myOffersBannerJSON && !_.isEmpty(window.myOffersBannerJSON) && props.isNotificationVisible) ? gnHeight + 144 : ((window.myOffersBannerJSON && !_.isEmpty(window.myOffersBannerJSON)) ? 42 : ((props.isNotificationVisible) ? gnHeight + 102 : 0));
  return (
    <div className="grid">
      {<NotificationBar page={props.location} section="page-header" />}
      <main
        id="page-wrap"
        role="main"
      >
        <section className="contentstuff">
          <ScrollToTop />
          <Switch>
            {props.routemap.map((route, i) =>
              (<Route key={i} path={route.path} component={route.component} exact={route.exact} />))}
          </Switch>
        </section>
      </main>
    </div>
  );
};


App.propTypes = {
  routemap: PropTypes.array,
  location: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isNotificationVisible: state.get('notification').isNotificationVisible,
});
export default withRouter(connect(mapStateToProps)(App));

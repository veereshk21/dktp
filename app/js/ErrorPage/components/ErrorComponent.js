/**
 * Created by sgumma on 22-02-2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ActionButton from './ActionButton';
import ChatAndC2C from '../../common/ChatAndC2C';

const ErrorComponent = (props) => (
  <div className="section group grid vh70">
    <ChatAndC2C />
    <div className="">
      <div className="pad24  margin42 onlyTopMargin">
        <h1 className="margin6 onlyTopMargin">{props.errorMap.title}</h1>
        <p className="fontSize_6 bold margin18 onlyTopMargin">{props.errorMap.message}</p>
      </div>
    </div>
    <div className="pad10">
      {props.errorMap.secondaryCTA && <ActionButton cta={props.errorMap.secondaryCTA} btnType="button secondary large" onAjaxRequest={props.onAjaxRequest} />}
      {props.errorMap.primaryCTA && <ActionButton cta={props.errorMap.primaryCTA} btnType="button primary large" onAjaxRequest={props.onAjaxRequest} />}
    </div>
  </div>
);

ErrorComponent.propTypes = {
  errorMap: PropTypes.object,
  onAjaxRequest: PropTypes.func,
};

export default ErrorComponent;

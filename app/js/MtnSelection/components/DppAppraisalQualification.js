import PropTypes from 'prop-types';
import React from 'react';
import renderHTML from 'react-render-html';
import { Row, Col } from 'react-flexbox-grid';
import ChatAndC2C from '../../common/ChatAndC2C';

// TODO: REFACTOR
const DppAppraisalQualification = (props) => (
  <div className="pad12 onlyTopPad">
    <div className="pad18">
      <Row>
        <Col xsOffset={9} xs={3}>
          <ChatAndC2C />
        </Col>
      </Row>
      <div className="pad24 onlyTopPad">
        <div className="fontSize_8  pad5 onlyBottomPad">{props.cqJSON.label.DT_OD_MDN_DPP_QUALIFICATIONS_TITLE}</div>
        <p className="color_666 fontSize_3">{props.cqJSON.label.DT_OD_MDN_DPP_QUALIFICATIONS_SUBTITLE}</p>
      </div>
      <div className="pad24 onlyTopPad margin30 onlyLeftMargin">
        <ul className="plainList pad6 sidePadOnly color_666" dangerouslySetInnerHTML={{ __html: renderHTML(props.cqJSON.html.DT_OD_MDN_DPP_QUALIFICATIONS_DESCRIPTION) }} />
      </div>
    </div>
  </div>
);

DppAppraisalQualification.propTypes = {
  cqJSON: PropTypes.object,
};

export default DppAppraisalQualification;

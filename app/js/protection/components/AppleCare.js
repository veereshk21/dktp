import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';

const AppleCare = ({ cqContent, appleCare, selectedAppleCareOpt, appleCareSelected, onAppleCareChange }) => (
  <Row className="pad30 noSidePad borderSize_4 border_black onlyTopBorder margin20 onlyTopMargin">
    <Col sm={4} md={4} className="textAlignCenter">
      <img src={appleCare.imageurl} alt={`${appleCare.desc}`} />
    </Col>
    <Col sm={8} md={8}>
      <Row>
        <Col md={10} sm={10}>
          <Row className="pad40 onlyRightPad">
            <h3 className="margin15 onlyBottomMargin" dangerouslySetInnerHTML={{ __html: appleCare.name }} />
            <p className="margin15 onlyBottomMargin" dangerouslySetInnerHTML={{ __html: appleCare.desc }} />
          </Row>
          <Row>
            <Col md={12} sm={12}>
              <Row className="margin15 onlyBottomMargin">
                <input
                  id="appleCareRadio_1"
                  className="radioCustom"
                  type="radio"
                  name="appleCareRadio"
                  value=""
                  checked={selectedAppleCareOpt === 'None'}
                  role="radiogroup"
                  onChange={() => { onAppleCareChange('None'); }}
                />
                <label htmlFor="appleCareRadio_1" className="radioCustom_label m-priceLabel width80">
                  <div className="priceLabel floatNone displayInlineBlock margin12 onlyLeftMargin verticalAlignMiddle">
                    <p>{cqContent.label.DT_OD_APPLE_CARE_NONE_LABEL} {selectedAppleCareOpt !== 'None' && `[ Subtract $${appleCare.price} ]`}</p>
                  </div>
                </label>
              </Row>
              <Row>
                <input
                  id="appleCareRadio_2"
                  className="radioCustom"
                  type="radio"
                  name="appleCareRadio"
                  value={appleCare}
                  checked={selectedAppleCareOpt === appleCare.skuid}
                  role="radiogroup"
                  onChange={() => { onAppleCareChange(appleCare); }}
                />
                <label htmlFor="appleCareRadio_2" className="radioCustom_label m-priceLabel width80">
                  <div className="priceLabel floatNone displayInlineBlock margin12 onlyLeftMargin verticalAlignMiddle">
                    <p>Add <span className="bold" dangerouslySetInnerHTML={{ __html: appleCare.name }} /> {appleCareSelected === 'None' && `[ Add $${appleCare.price} due today ]`}</p>
                  </div>
                </label>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  </Row>
);

AppleCare.propTypes = {
  cqContent: PropTypes.object,
  appleCare: PropTypes.object,
  selectedAppleCareOpt: PropTypes.string,
  appleCareSelected: PropTypes.any,
  onAppleCareChange: PropTypes.func,
};

export default AppleCare;

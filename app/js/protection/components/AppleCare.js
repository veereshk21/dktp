import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import RadioButton from '../../common/RadioButton/index';

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
              <fieldset className="noMargin noPad" style={{ border: 'none' }}>
                <legend className="is-hidden">{cqContent.label.DT_OD_APPLE_CARE_TITLE}</legend>
                <Row className="margin15 onlyBottomMargin">
                  <RadioButton
                    name="appleCareRadio"
                    id="appleCareRadio_1"
                    value=""
                    containerClassName=" "
                    labelClassName="verticalTop displayInlineBlock pad12 onlyLeftPad"
                    checked={selectedAppleCareOpt === 'None'}
                    onChange={() => { onAppleCareChange('None'); }}
                  >
                    <div className="fontSize_4">{cqContent.label.DT_OD_APPLE_CARE_NONE_LABEL} {selectedAppleCareOpt !== 'None' && `[ Subtract $${appleCare.price} ]`}</div>
                  </RadioButton>
                </Row>
                <Row>
                  <RadioButton
                    name="appleCareRadio"
                    id="appleCareRadio_2"
                    value={appleCare}
                    containerClassName=" "
                    labelClassName="verticalTop pad12 onlyLeftPad displayInlineBlock width90"
                    checked={selectedAppleCareOpt === appleCare.skuid}
                    onChange={() => { onAppleCareChange(appleCare); }}
                  >
                    <div className="fontSize_4">Add <span className="bold" dangerouslySetInnerHTML={{ __html: appleCare.name }} /> {appleCareSelected === 'None' && `[ Add $${appleCare.price} due today ]`}</div>
                  </RadioButton>
                </Row>
              </fieldset>
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

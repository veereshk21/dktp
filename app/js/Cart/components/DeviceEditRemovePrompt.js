import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
} from 'react-flexbox-grid';
import Anchor from './../../common/A/A';

class DeviceEditRemovePrompt extends Component {
  constructor(props) {
    super(props);
    this.toggleRemovePromptHandler = this.toggleRemovePromptHandler.bind(this);
    this.state = { isPrompted: false };
  }

  componentWillReceiveProps() {
    this.setState({ isPrompted: false });
  }

  toggleRemovePromptHandler() {
    const { isPrompted } = this.state;
    this.setState({ isPrompted: !isPrompted });
  }

  render() {
    const {
      showEdit, promptMsg, onEdit, onRemove, cqContent,
    } = this.props;
    return (
      <div>
        {!this.state.isPrompted ?
          <div>
            {showEdit === true &&
              <div className="displayInlineBlock">
                <Anchor
                  className="color_333 fontSize_4 textDecUnderline"
                  onClick={onEdit}
                >
                  {cqContent.label.DT_OD_CART_EDIT_TEXT}
                </Anchor>
                <span className="margin6 onlySideMargin">|</span>
              </div>
            }
            <Anchor
              className="color_333 fontSize_4 textDecUnderline"
              onClick={this.toggleRemovePromptHandler}
            >
              {cqContent.label.DT_OD_CART_REMOVE_TEXT}
            </Anchor>
          </div>
          :
          <div>
            <Row>
              <Col xs={7}>
                <p
                  className="fontSize_5 bold"
                  dangerouslySetInnerHTML={{ __html: promptMsg }}
                />
              </Col>
            </Row>
            <div className="margin6 onlyTopMargin">
              <Row>
                <Col md={12}>
                  <Row className="pad18 onlyBottomPad">
                    <Col xs={4}>
                      <button
                        className="button width100 primary"
                        onClick={onRemove}
                      >
                        {cqContent.label.DT_OD_CART_REMOVE_DEVICE_CTA_TEXT}
                      </button>
                    </Col>
                    <Col xs={4}>
                      <button
                        className="button width100 secondary"
                        onClick={this.toggleRemovePromptHandler}
                      >
                        {cqContent.label.DT_OD_CART_CANCEL_CTA_TEXT}
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        }
      </div>
    );
  }
}

DeviceEditRemovePrompt.propTypes = {
  showEdit: PropTypes.bool,
  promptMsg: PropTypes.string,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  cqContent: PropTypes.object,
};
export default DeviceEditRemovePrompt;

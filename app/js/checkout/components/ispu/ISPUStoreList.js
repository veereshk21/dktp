import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
// import { hashHistory } from './../../../store';

export default class ISPUStoreList extends Component {
  selectStore = (store) => {
    if (store.deviceAvailable) {
      this.props.storeSelected(store);
    }
  }
  showAllClicked = () => {
    this.props.showAll(true);
  }
  calculateAvailability = (store) => (
    store.deviceAvailable ?
      <Col xs={12} className="bold arrowCTA fontSize_6">{this.props.cqContent.label.DT_OD_CHECKOUT_STORE_AVAILABLE_TEXT}</Col> :
      <Col xs={12} className="color_959595 fontSize_6">{this.props.cqContent.label.DT_OD_CHECKOUT_STORE_NOT_AVAILABLE_TEXT}</Col>
  )

  createListOfStores = () => {
    const { cqContent } = this.props;
    return this.props.storeList.map((store, index) => (
      <Row className="border_grayThree onlyBottomBorder" key={store.storeId}>
        <Col xs={12}>
          <Row className="pad12 onlyBottomPad">
            <Col xs={12}>
              <span className="fontSize_8 bold">{index + 1} {store.storeName}</span>
            </Col>
          </Row>
          <Row className="pad12 onlyBottomPad">
            <Col xs={12} className="bold">
              {`(${store.distance} Miles Away)`}
            </Col>
          </Row>
          <Row className="pad12 onlyBottomPad">
            <Col xs={12}>
              {store.storeAddress}
            </Col>
          </Row>
          <Row className="pad12 onlyBottomPad">
            <Col xs={12} className="bold">
              Phone Number
            </Col>
          </Row>
          <Row className="pad12 onlyBottomPad">
            <Col xs={12}>
              {store.appendedStoreTiming}
            </Col>
          </Row>
          <Row className="pad12 onlyBottomPad">
            {this.calculateAvailability(store)}
          </Row>
          <Row className="pad12 onlyBottomPad">
            <Col xs={12}>
              <button
                className="button primary"
                onClick={() => this.selectStore(store)}
                disabled={!store.deviceAvailable}
              >
                {cqContent.label.DT_OD_CHECKOUT_ISPU_PICKUP_FROM_STORE}
              </button>
            </Col>
          </Row>
        </Col>
      </Row>
    ));
  }

  render() {
    const { cqContent } = this.props;
    return (
      <Row style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: '300px' }}>
        <Col xs={12} style={{ overflowX: 'hidden', overflowY: 'auto' }} id="storeList">
          {this.createListOfStores()}
        </Col>
        {
          (typeof this.props.selectedStoreId !== 'undefined' && this.props.selectedStoreId !== null && !this.props.navigateToStoreDetail) &&
            <button
              className="margin10 displayBlock clearfix background_transparent borderSize_0 fontSize_4 link noPad"
              onClick={this.onShowAllClicked}
            >
              {cqContent.label.OD_CHECKOUT_ISPU_SEE_ALL_RESULTS_TEXT}
            </button>
        }
      </Row>

    );
  }
}

ISPUStoreList.propTypes = {
  cqContent: PropTypes.object,
  showAll: PropTypes.func,
  storeSelected: PropTypes.func,
  storeList: PropTypes.array,
  selectedStoreId: PropTypes.string,
  navigateToStoreDetail: PropTypes.bool,
};

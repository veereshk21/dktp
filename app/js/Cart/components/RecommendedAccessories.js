import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import RecommAccProductDetailsModal from './RecommAccProductDetailsModal';
import Modal from '../../common/Modal/index';
import './../../../css/pages/cart/cartAccessories.scss';

class Accessory extends Component {
  constructor(props) {
    super(props);

    this.state = { isProductDetailsModalVisible: false };

    this.addAccessoryToCart = this.addAccessoryToCart.bind(this);
    this.onShowAccessoryDetails = this.onShowAccessoryDetails.bind(this);
    this.onToggleProductDetailsModal = this.onToggleProductDetailsModal.bind(this);
  }


  onShowAccessoryDetails() {
    const { productID, accessoryPDPURL } = this.props;

    const { isProductDetailsModalVisible } = this.state;
    this.setState({ isProductDetailsModalVisible: !isProductDetailsModalVisible });
    this.props.recommAccPDPInvalidateAsyncFetch();
    this.props.getProductDetails({ url: accessoryPDPURL, productID });
  }

  onToggleProductDetailsModal() {
    const { isProductDetailsModalVisible } = this.state;
    this.setState({ isProductDetailsModalVisible: !isProductDetailsModalVisible });
  }

  addAccessoryToCart(accQty) {
    const { productID, connectedDevice, displayName, skuDetails } = this.props;
    const { id } = skuDetails[0];
    if (connectedDevice && connectedDevice === true) {
      window.location.href = `/od/cust/auth/mtnDetail?ignoreCache=false&deviceProdId=${productID}&deviceSkuId=${id}&connectedDevice=true`;
    } else {
      this.props.onAddToCart(
        { accProdId: productID, accSkuId: id, accName: displayName, accQty });
    }
    this.setState({ isProductDetailsModalVisible: false });
  }
  render() {
    const { cqContent, displayName, skuDetails, recommAccessProductDetails, productID } = this.props;
    const { price, discountedPrice, imageUrl } = skuDetails[0];
    const { isFetching, data } = recommAccessProductDetails;
    return (
      <div>
        <Modal
          mounted={this.state.isProductDetailsModalVisible === true &&
          (isFetching === false && Object.keys(data).length > 0 &&
            data.output.accId === productID)}
          closeFn={() => {
            this.onToggleProductDetailsModal();
          }}
          style={{ width: '40%' }}
          showCloseX
        >
          <RecommAccProductDetailsModal
            onAddToCart={this.addAccessoryToCart}
            {...data.output}
          />
        </Modal>

        <Row>
          <Col md={7} lg={7}>
            <Row>
              <Col xs={12}>
                <div className="accessoryTitle_left">
                  <span
                    className="bold block accessoryTitle_title fontSize_5 margin12 onlyBottomMargin"
                    // onClick={this.onShowAccessoryDetails}
                    dangerouslySetInnerHTML={{ __html: displayName }}
                    style={{ lineHeight: '19px' }}
                  />
                  <div className="accessory_price textAlignLeft">
                    {(discountedPrice && price > discountedPrice) ? <div><span
                      className="bold fontSize_5"
                    >${discountedPrice}</span><br /><span
                      className="legal color_gray_six"
                    >was <span className="textDecLineThrough">${price}</span></span></div> : <div><span className="bold">${price}</span></div>}
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="pad12 onlyTopPad">
              <Col xs={12}>
                <button
                  className="button secondary"
                  onClick={() => this.addAccessoryToCart(1)}
                  style={{
                    padding: '8px 20px',
                    fontSize: '10px',
                  }}
                >
                  {cqContent.label.DT_OD_CART_ACCESSORIES_ADD_TO_CART_CTA_TEXT}
                </button>
              </Col>
            </Row>
          </Col>
          <Col md={5} lg={5}>
            <div className="accessoryTitle_right">
              <img
                alt={displayName}
                src={imageUrl}
                itemProp="image"
                className="textAlignCenter accessory_img"
              />
            </div>
          </Col>
        </Row>
      </div>);
  }
}

Accessory.propTypes = {
  displayName: PropTypes.string,
  productID: PropTypes.string,
  connectedDevice: PropTypes.bool,
  skuDetails: PropTypes.array,
  cqContent: PropTypes.object,
  onAddToCart: PropTypes.func,
  recommAccessProductDetails: PropTypes.object,
  recommAccPDPInvalidateAsyncFetch: PropTypes.func,
  getProductDetails: PropTypes.func,
  accessoryPDPURL: PropTypes.string,
};
export default Accessory;

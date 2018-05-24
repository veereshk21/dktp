import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
} from 'react-flexbox-grid';
import RecommendedAccessories from './RecommendedAccessories';
import './../../../css/pages/cart/cartAccessories.scss';


class RecommendedAccesoriesWrapper extends Component {
  constructor(props) {
    super(props);
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.swiper = null;

    this.goToAccessoryProductDetail = this.goToAccessoryProductDetail.bind(this);
  }

  goNext() {
    if (this.swiper) this.swiper.slideNext();
  }

  goPrev() {
    if (this.swiper) this.swiper.slidePrev();
  }

  goToAccessoryProductDetail() {
    window.location = this.props.accessoryShopURL;
  }

  render() {
    const { recommendedAccessories, recommAccessProductDetails, addRecommAccessoryToCart, getRecommendedAccProductDetails, recommAccPDPInvalidateAsyncFetch, cqContent, accessoryPDPURL } = this.props;
    const { isFetching, data } = recommendedAccessories;
    const params = {
      slidesPerView: '3',
      breakpoints: {
        // when window width is <= 640px
        640: {
          slidesPerView: 'auto',
        },
        // when window width is <= 800px
        800: {
          slidesPerView: 2,
        },
      },
    };
    return (
      <div className="recAccessoryPanel">

        {(isFetching === false && Object.keys(data).length > 0) && <Row>
          <Col md={4} lg={3} style={{ paddingRight: 0 }}>
            <div className="background_black recAccessoryPanel pad12">
              <h2 className="color_FFF fontSize_9">{cqContent.label.DT_OD_CART_SHOP_ALL_ACCESSORIES_TEXT}</h2>
            </div>
          </Col>
          <Col md={8} lg={9} style={{ paddingLeft: 0 }}>
            <div className="border_e6 onlyTopBorder positionRelative">
              <div
                className="accessoryNavigate"
                style={{
                  height: '214px',
                  display: 'flex',
                  webkitBoxAlign: 'center',
                  msFlexAlign: 'center',
                  alignItems: 'center',
                }}
              >
                <span className="accessoryNavigate_prev" onClick={this.goPrev} />
                <span className="accessoryNavigate_next" onClick={this.goNext} />
              </div>

              <Swiper
                {...params}
                ref={(node) => {
                  if (node && node.swiper) {
                    this.swiper = node.swiper;
                  }
                }}
              >
                {data.output.recommendedAccessoriesDetails.map((accessory, id) => (accessory.skuDetails !== null && <div key={`recommendedAcc_${id}`} className="pad12 accessoryTile">
                  <RecommendedAccessories recommAccessProductDetails={recommAccessProductDetails} getProductDetails={getRecommendedAccProductDetails} recommAccPDPInvalidateAsyncFetch={recommAccPDPInvalidateAsyncFetch} onAddToCart={addRecommAccessoryToCart} {...accessory} accessoryPDPURL={accessoryPDPURL} cqContent={cqContent} />
                </div>))}
              </Swiper>

            </div>
          </Col>
        </Row>}
      </div>);
  }
}
RecommendedAccesoriesWrapper.propTypes = {
  cqContent: PropTypes.object,
  recommendedAccessories: PropTypes.object,
  addRecommAccessoryToCart: PropTypes.func,
  getRecommendedAccProductDetails: PropTypes.func,
  recommAccPDPInvalidateAsyncFetch: PropTypes.func,
  accessoryPDPURL: PropTypes.string,
  recommAccessProductDetails: PropTypes.object,
  accessoryShopURL: PropTypes.string,
};
export default RecommendedAccesoriesWrapper;

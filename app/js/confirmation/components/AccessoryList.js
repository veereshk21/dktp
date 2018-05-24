import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

/* eslint-disable arrow-body-style */
class DeviceListWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { featureTypeText: 'Show', featureTypeCSS: 'hide', displayFeatureType: false };
  }

DeviceListFeatureData = (e) => {
  e.preventDefault();
  this.setState({ displayFeatureType: !this.state.displayFeatureType });

  if (this.state.featureTypeText === 'Show') {
    this.setState({ featureTypeText: 'Hide' });
    this.setState({ featureTypeCSS: 'block' });
  } else {
    this.setState({ featureTypeText: 'Show' });
    this.setState({ featureTypeCSS: 'hide' });
  }
}

renderSaveContent(list) {
  const accessoryData = list;
  const imageWidthHeight = '&wid=110&hei=130';
  const { cqKeys } = this.props;
  return (
    <section>
      {accessoryData.map((accessory) => (
        <Row key={accessory.id} >
          <Col md={2} lg={2} >
            {accessory.imageUrl && <div className="textAlignCenter">
              <img src={`${accessory.imageUrl}${accessory.imageUrl.indexOf('?') === -1 ? '?' + imageWidthHeight : imageWidthHeight}`} alt={accessory.name} />
            </div>}
          </Col>

          <Col md={6} lg={6} >
            <div className="pad10 onlySidePad color_666">
              <p> {accessory.name}</p>
              <div className="pad5 noSidePad margin5 onlyTopMargin">
                {accessory.discounted ?
                  <div>
                    <span className="textDecLineThrough">${accessory.originalPrice}</span>
                    <span className="bold">&nbsp;${accessory.price}</span>
                  </div>
                  :
                  <span className="bold">${accessory.price}</span>
                }
              </div>
              <div className="pad5 noSidePad color_666">
                <span>{cqKeys.label.DT_OD_CONFIMARTION_QTY_TEXT}</span>
                <span className="pad5 onlyLeftPad">{accessory.quantity}</span>
              </div>
            </div>
          </Col>

          <Col md={4} lg={4} className="fontSize_5">
            <div className="textAlignRight bold color_666">{cqKeys.label.DT_OD_CONFIMARTION_DUE_TODAY_TITLE}*</div>
            <div className="textAlignRight color_666">
              ${accessory.discounted ? accessory.price : accessory.originalPrice}
            </div>
          </Col>
        </Row>
      ))}
    </section>
  );
}

render() {
  const {
    cqKeys,
    accessoryBundleData,
    accessoryData,
  } = this.props;
  const imageWidthHeight = '&wid=110&hei=130';

  return (
    <section className="">
      {accessoryData && accessoryData.length > 0 && <div>
        {this.renderSaveContent(accessoryData)}
      </div>}
      {accessoryBundleData &&
        accessoryBundleData.map((accessory) => (
          <Row key={accessory.id} >
            <Col md={2} lg={2} >
              {accessory.imgUrl && <div className="textAlignCenter">
                <img src={`${accessory.imgUrl}${accessory.imgUrl.indexOf('?') === -1 ? '?' + imageWidthHeight : imageWidthHeight}`} alt={accessory.displayName} />
              </div>}
            </Col>

            <Col md={6} lg={6} >
              <div className="pad10 onlySidePad color_666">
                <p> {accessory.displayName}</p>
                <p className="pad5 noSidePad margin5 onlyTopMargin">
                  {accessory.savedPrice > 0 ?
                    <div>
                      <span className="textDecLineThrough">${accessory.regularPrice}</span>
                      <span className="bold">&nbsp;${accessory.discountedPrice}</span>
                    </div>
                    :
                    <span className="bold">${accessory.regularPrice}</span>
                  }
                </p>
                {accessory.discountPercentage > 0 &&
                  <p className="positionRelative margin5 onlyTopMargin">
                    <span className="font-icon_tag" />
                    <span className="margin30 onlyLeftMargin">Sale {accessory.discountPercentage}% off</span>
                  </p>
                }
              </div>
            </Col>

            <Col md={4} lg={4} className="fontSize_5">
              <div className="textAlignRight bold color_666">{cqKeys.label.DT_OD_CONFIMARTION_DUE_TODAY_TITLE}*</div>
              <div className="textAlignRight color_666">
                ${accessory.savedPrice > 0 ? accessory.discountedPrice : accessory.regularPrice}
              </div>
            </Col>
          </Row>
        ))
      }
    </section>
  );
}
}


DeviceListWrapper.propTypes = {
  cqKeys: PropTypes.object,
  accessoryData: PropTypes.array,
  accessoryBundleData: PropTypes.array,
};
export default DeviceListWrapper;

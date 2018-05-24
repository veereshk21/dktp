import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StandAloneAccessory from './StandAloneAccessory';
import AccessoriesBundle from './AccessoriesBundle';

class StandAloneAccessoriesWrapper extends Component {
  constructor(props) {
    super(props);

    this.removeStandAloneAccessory = this.removeStandAloneAccessory.bind(this);
    this.removeAccessoryBundle = this.removeAccessoryBundle.bind(this);
  }

  removeStandAloneAccessory(params) {
    this.props.removeStandAloneAccessory(params);
  }
  removeAccessoryBundle(params) {
    this.props.removeAccessoryBundle(params);
  }

  render() {
    const { accessories, accessoriesBundle, cqContent, discountPercentage } = this.props;
    return (<div className="fontSize_4">
      {accessories && accessories.map((accessory, id) => (
        <StandAloneAccessory
          onRemove={this.removeStandAloneAccessory}
          cqContent={cqContent}
          key={id}
          {...accessory}
        />))}
      {accessoriesBundle && accessoriesBundle.map((accessoryBundle, id) => (
        <div className="pad20 noSidePad fontSize_4"><AccessoriesBundle
          childAccessory={false}
          onRemove={this.removeAccessoryBundle}
          cqContent={cqContent}
          key={id}
          {...accessoryBundle}
        >
          <div className="margin20 onlyTopMargin">
            {accessoryBundle.accessoriesDetails && accessoryBundle.accessoriesDetails.map((accessoriesDetails) => (
              <AccessoriesBundle
                showRemoveCTA={false}
                imgUrl={accessoriesDetails.skuDetails[0].imageUrl}
                displayName={accessoriesDetails.skuDetails[0].name}
                discountedPrice={accessoriesDetails.skuDetails[0].discountedPrice}
                regularPrice={accessoriesDetails.skuDetails[0].price}
                cqContent={cqContent}
                discountPercentage={discountPercentage}
              />))
            }
            {accessoryBundle.bundleBreakdown && accessoryBundle.bundleBreakdown.map((accessoriesDetails) => (
              <AccessoriesBundle
                showRemoveCTA={false}
                imgUrl={accessoriesDetails.skuDetails[0].imageUrl}
                displayName={accessoriesDetails.skuDetails[0].name}
                discountedPrice={accessoriesDetails.skuDetails[0].discountedPrice}
                regularPrice={accessoriesDetails.skuDetails[0].price}
                cqContent={cqContent}
                discountPercentage={discountPercentage}
              />))
            }
          </div>
        </AccessoriesBundle></div>))}
    </div>);
  }
}

StandAloneAccessoriesWrapper.propTypes = {
  accessories: PropTypes.array,
  cqContent: PropTypes.object,
  removeStandAloneAccessory: PropTypes.func,
  removeAccessoryBundle: PropTypes.func,
  accessoriesBundle: PropTypes.oneOfType([PropTypes.object, null]),
  discountPercentage: PropTypes.string,
};
export default StandAloneAccessoriesWrapper;

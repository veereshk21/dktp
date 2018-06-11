import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationBar from '../../../common/NotificationBar';
import { NOTIFICATIONS, EDIT_STATE } from '../../constants';
import AsyncComponent from '../../../common/AsyncComponent';

const DeviceInfo = AsyncComponent(() => import('./deviceInfo'));
const DeviceEdit = AsyncComponent(() => import('./deviceEdit'));

class DevicesSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editDeviceOpened: props.npanxxError,
      [`editDevice_${props.npanxxError ? props.npanxxErrorIndex : 0}`]: props.npanxxError,
    };
  }

  componentWillReceiveProps = (newProps) => {
    const {
      deviceInfoUpdated, deviceIndex,
    } = newProps.asyncCallStatus.data;

    if (deviceInfoUpdated) {
      // close EditState
      this.setEditState(deviceIndex, false);
      this.props.invalidateAsyncFetch();
    }
    if (newProps.npanxxError && !this.state[`editDevice_${newProps.npanxxErrorIndex}`]) {
      newProps.showErrorNotification(newProps.cqContent.error.DT_OD_NPANXX_NO_NUMBERS_ZIPCODE_TEXT);
      this.setEditState(newProps.npanxxErrorIndex, newProps.npanxxError);
      document.getElementById('devicesSection').scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
    }
  };
  setEditState = (index, state) => {
    this.setState({
      [`editDevice_${index}`]: state,
      editDeviceOpened: state,
    });
    this.props.updateEditState(EDIT_STATE.DEVICE, state);
  }
  getInitialNewNumber = (device, npaNxxdetails) => {
    let number = device.npaNxxnumber;
    if (!number && npaNxxdetails && npaNxxdetails.mtns && npaNxxdetails.mtns.length > 0) {
      number = npaNxxdetails[0];
    }
    return number;
  }
  getInitialCustomerSelection = (device, npaNxxdetails) => {
    let selection = 'default';
    if (device.npnxxCustomerSelection) {
      selection = device.npnxxCustomerSelection;
    } else if (!(npaNxxdetails && npaNxxdetails.mtns && npaNxxdetails.mtns.length > 0) && !device.npaNxxnumber) {
      selection = 'new';
    }
    return selection;
  }
  render() {
    const { cqContent, devices, npaNxxdetails, devicesOuter } = this.props;
    return (
      <div id="devicesSection">
        <NotificationBar section={NOTIFICATIONS.DEVICE} />
        <div className="pad24 border_grayThree borderSize_2 noTopBorder noLeftBorder">
          <h2 className="h1 margin24 onlyBottomMargin"> {cqContent.label.DT_OD_CHECKOUT_DEVICES_TITLE} </h2>
          {devices.map((device, index) => (
            <div key={`editDevice-${index}`} className={index !== devices.length - 1 ? 'margin24 noSideMargin' : 'margin24 onlyTopMargin'}>
              {this.state[`editDevice_${index}`] ?
                (<DeviceEdit
                  index={index}
                  cqContent={cqContent}
                  device={device}
                  form={`editDevice_${index}`}
                  setEditState={this.setEditState}
                  {...this.props}
                  initialValues={{
                    npnxx: this.getInitialCustomerSelection(device, npaNxxdetails),
                    sameNumber: true,
                    numberZipCode: npaNxxdetails.zipCode,
                    newNumber: this.getInitialNewNumber(device, npaNxxdetails),
                  }}
                  required={this.props.npanxxError && this.props.npanxxErrorIndex === index}
                />)
                :
                (<DeviceInfo
                  index={index}
                  cqContent={cqContent}
                  device={device}
                  displayImeiId={devicesOuter[index].displayImeiId ? devicesOuter[index].displayImeiId : null}
                  onEdit={() => this.setEditState(index, true)}
                  editDeviceOpened={this.state.editDeviceOpened}
                />)
              }
            </div>
          ))}
        </div>
      </div>
    );
  }
}

DevicesSection.propTypes = {
  cqContent: PropTypes.object,
  devices: PropTypes.array,
  devicesOuter: PropTypes.array,
  npanxxError: PropTypes.bool,
  npanxxErrorIndex: PropTypes.number,
  npaNxxdetails: PropTypes.object,
  invalidateAsyncFetch: PropTypes.func,
  updateEditState: PropTypes.func,
};
export default DevicesSection;

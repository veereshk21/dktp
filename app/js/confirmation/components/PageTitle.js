import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../common/Title/Title';

/* eslint-disable arrow-body-style  */
const PageTitle = ({ confirmationView }) => {
  const { cqJSON, billingInfo, devices, accessories } = confirmationView;
  const firstName = billingInfo.billingAddress.firstName ? billingInfo.billingAddress.firstName : '';
  const middleName = billingInfo.billingAddress.middleName ? billingInfo.billingAddress.middleName : '';
  const lastName = billingInfo.billingAddress.lastName ? billingInfo.billingAddress.lastName : '';
  const name = firstName + ' ' + middleName + ' ' + lastName;
  const isNotNSOFlow = () => {
    let isNotNSO = false;
    if (devices && devices.items) {
      for (const x in devices.items) {
        if (devices.items[x].flow !== 'NSO') {
          isNotNSO = true;
        }
      }
    }
    return isNotNSO;
  };
  return (
    <div className="pad12 onlyTopPad ">
      <Title className="fontSize_13">
        {cqJSON.label.DT_OD_CONFIMARTION_THANKS_TITLE} {name}.
      </Title>
      {(!isNotNSOFlow() && accessories) && <div>
        {(accessories.length > 1) ?
          <div className="fontSize_12 bold margin20 onlyTopMargin" dangerouslySetInnerHTML={{ __html: cqJSON.label.DT_OD_CONFIMARTION_SUB_TITLE_MULTI_DEVICE }} />
          :
          <div className="fontSize_12 bold margin20 onlyTopMargin" dangerouslySetInnerHTML={{ __html: `${cqJSON.label.DT_OD_CONFIMARTION_SUB_TITLE_SINGLE_DEVICE} ${accessories[0].name}` }} />
        }
      </div>
      }
      {isNotNSOFlow() && <div>
        {((devices && devices.items) && !accessories) && <div>
          {(devices.items.length > 1) ?
            <div className="fontSize_12 bold margin20 onlyTopMargin" dangerouslySetInnerHTML={{ __html: cqJSON.label.DT_OD_CONFIMARTION_SUB_TITLE_MULTI_DEVICE }} />
            :
            <div className="fontSize_12 bold margin20 onlyTopMargin" dangerouslySetInnerHTML={{ __html: `${cqJSON.label.DT_OD_CONFIMARTION_SUB_TITLE_SINGLE_DEVICE} ${devices.items[0].manufactureName} ${devices.items[0].deviceName}` }} />
          }
        </div>
        }
        {(accessories && !(devices && devices.items)) && <div>
          {(accessories.length > 1) ?
            <div className="fontSize_12 bold margin20 onlyTopMargin" dangerouslySetInnerHTML={{ __html: cqJSON.label.DT_OD_CONFIMARTION_SUB_TITLE_MULTI_DEVICE }} />
            :
            <div className="fontSize_12 bold margin20 onlyTopMargin" dangerouslySetInnerHTML={{ __html: `${cqJSON.label.DT_OD_CONFIMARTION_SUB_TITLE_SINGLE_DEVICE} ${accessories[0].name}` }} />
          }
        </div>
        }

        {((devices && devices.items) && accessories) && <div>
          {((devices.items.length + accessories.length) > 1) ?
            <div className="fontSize_12 bold margin20 onlyTopMargin" dangerouslySetInnerHTML={{ __html: cqJSON.label.DT_OD_CONFIMARTION_SUB_TITLE_MULTI_DEVICE }} />
            :
            <div className="fontSize_12 bold margin20 onlyTopMargin" dangerouslySetInnerHTML={{ __html: `${cqJSON.label.DT_OD_CONFIMARTION_SUB_TITLE_SINGLE_DEVICE} ${devices.items[0].manufactureName} ${devices.items[0].deviceName}` }} />
          }
        </div>
        }
      </div>
      }
    </div>
  );
};

PageTitle.propTypes = {
  confirmationView: PropTypes.object,
};

export default PageTitle;

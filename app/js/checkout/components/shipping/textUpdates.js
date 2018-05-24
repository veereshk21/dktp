import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import MSelect from '../../../common/Select/index';
import ToolTip from '../../../common/ToolTip/index';
import { normalizePhoneNumber } from '../../../common/validation';
import Checkbox from '../../../common/Checkbox/index';

const TextUpdates = (props) => {
  const { cqContent, activeSMSCapableMtnList } = props;
  return (
    <div>
      <fieldset className="noMargin noPad" style={{ border: 'none' }}>
        <legend className="is-hidden">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_TEXT_UPDATES}</legend>
        {/*
          <Checkbox
            className="checkbox"
            name="optInPaperFree"
            id="optInPaperFree"
            component="input"
            type="checkbox"
            checkboxClass="displayInlineBlock pad6 noLeftPad"
            labelClass="displayInlineBlock verticalCenter leftAlign pad6 checkboxLabel"
          >
            <div>
              <span className="h3 fontSize_5">
                {cqContent.label.DT_OD_CHECKOUT_PAPER_FREE_BILLING}
              </span>
              <ToolTip
                className="margin3 onlyLeftMargin displayInlineBlock"
                ariaLabel="Text updates information tooltip"
                text={cqContent.label.DT_OD_CHECKOUT_PAPER_FREE_BILLING_TOOLTIP}
                noRenderHTML
              />
            </div>
          </Checkbox>
        */}

        {activeSMSCapableMtnList && activeSMSCapableMtnList.length > 0 &&
          <div>
            <Checkbox
              className="checkbox"
              name="optInShippingSMS"
              id="optInShippingSMS"
              component="input"
              type="checkbox"
              checkboxClass="displayInlineBlock pad6 noLeftPad"
              labelClass="displayInlineBlock verticalCenter leftAlign pad6 checkboxLabel"
            >
              <div>
                <span className="h3 fontSize_5">
                  {cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_TEXT_UPDATES}
                </span>
                <ToolTip
                  className="margin3 onlyLeftMargin displayInlineBlock"
                  ariaLabel="Text updates information tooltip"
                  text={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_TEXT_UPDATES_TOOLTIP}
                  noRenderHTML
                />
              </div>
            </Checkbox>
            <div className="margin6 noSideMargin">
              <label
                htmlFor="optInMtn"
                className="fontSize_3 color_gray_six margin12 onlyBottomMargin"
              >
                {cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_TEXT_UPDATES_LABEL}
              </label>

              <MSelect
                name="optInMtn"
                aria-label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_TEXT_UPDATES}
                id="optInMtn"
                borderStyle
              >
                {
                  activeSMSCapableMtnList.map((number) => (
                    <option
                      key={number}
                      value={number}
                    >
                      {normalizePhoneNumber(number)}
                    </option>
                  ))
                }
              </MSelect>
            </div>
          </div>
        }
      </fieldset>
    </div>
  );
};


TextUpdates.propTypes = {
  cqContent: PropTypes.object,
  activeSMSCapableMtnList: PropTypes.array,
};
export default reduxForm({
  form: 'getTextUpdatesForm',
  destroyOnUnmount: false,
})(TextUpdates);


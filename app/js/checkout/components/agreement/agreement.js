import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../../../common/Checkbox/index';
import Printer from '../../../../images/print.svg';

const printAgreement = (id) => {
  const content = document.getElementById(id);
  const pri = document.getElementById('printFrame').contentWindow;
  pri.document.open();
  pri.document.write(content.innerHTML);
  pri.document.close();
  pri.focus();
  pri.print();
  pri.close();
};

const Agreement = (props) => {
  const {
    title,
    terms,
    name,
    id,
    labelId,
    label,
  } = props;

  return (
    <div className="margin10 onlyTopMargin background_FF">
      <form className="margin30 noSideMargin">
        <div className="clearfix">
          {title && <p className="bold floatLeft">{title}</p>}
          {terms &&
            <div className="floatRight">
              <p>
                <img className="verticalCenter" height="20px" src={Printer} alt="Printer" />
                <button
                  className="fontSize_3 link background_transparent displayInlineBlock borderSize_0"
                  type="button"
                  onClick={(() => printAgreement(`${id}_terms`))}
                >
                  Printer-friendly version
                </button>
              </p>
            </div>
          }
        </div>
        <div className="">
          {terms &&
            <div
              id={`${id}_terms`}
              className="height160 border_grayThree overflowScroll margin12 noSideMargin textAlignCenter terms_external"
              dangerouslySetInnerHTML={{ __html: terms }}
            />
          }
          <div>
            <Checkbox
              className="checkbox"
              name={name}
              id={id}
              component="input"
              type="checkbox"
              checkboxClass="displayInlineBlock pad6 noLeftPad"
              labelClass="displayInlineBlock verticalCenter leftAlign pad6 width90"
              aria-labelledby={labelId}
              aria-hidden
            >
              <p id={labelId} >
                {label}
              </p>
            </Checkbox>
          </div>
        </div>
      </form>
    </div>
  );
};
Agreement.propTypes = {
  title: PropTypes.string,
  terms: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  labelId: PropTypes.string,
  label: PropTypes.string,
};
export default Agreement;

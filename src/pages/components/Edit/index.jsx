import React, { useState, useEffect } from 'react';
import { Dialog } from '@progress/kendo-react-dialogs';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Error } from '@progress/kendo-react-labels';
import axios from 'axios';
import toObject from '../../utils/CATC';
import '../../../styles/kendoui.scss';

const minValueValidator = (value) =>
  value >= 0 ? '' : 'The value must be 0 or higher';
const NonNegativeNumericInput = (fieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <NumericTextBox {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

const Edit = (props) => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api-binance2.morbit.trade/api/proxy/candlestick?symbol=BTCUSDT&interval=1d&limit=12`,
        {
          withCredentials: false,
        }
      )
      .then((res) => {
        setDatas(() => toObject(res.data));
      });
  }, []);

  return (
    <Dialog title={`Edit ${props.item}`} onClose={props.cancelEdit}>
      <Form
        onSubmit={props.onSubmit}
        initialValues={props.item}
        render={(formRenderProps) => (
          <FormElement
            style={{
              width: 290,
              maxWidth: 700,
            }}
          >
            <fieldset className={'k-form-fieldset'}>
              {/* <div className="mb-3">
                <Field name={'ProductName'} component={Input} label={'Product Name'} />
              </div> */}
              <div className='mb-3'>
                <Field
                  name={'open'}
                  component={DropDownList}
                  data={datas}
                  textField={'open'}
                  label={'open'}
                />
              </div>
              <div className='mb-3'>
                <Field
                  name={'close'}
                  component={DropDownList}
                  data={datas}
                  textField={'close'}
                  label={'close'}
                />
              </div>
              <div className='mb-3'>
                <Field
                  name={'low'}
                  component={DropDownList}
                  data={datas}
                  textField={'low'}
                  label={'low'}
                />
              </div>
              <div className='mb-3'>
                <Field
                  name={'high'}
                  component={DropDownList}
                  data={datas}
                  textField={'high'}
                  label={'high'}
                />
              </div>
            </fieldset>
            <div className='k-form-buttons'>
              <button
                type={'submit'}
                className='k-submit k-primary'
                disabled={!formRenderProps.allowSubmit}
              >
                submit
              </button>
              <button
                type={'submit'}
                className='k-button'
                onClick={props.cancelEdit}
              >
                Cancel
              </button>
            </div>
          </FormElement>
        )}
      />
    </Dialog>
  );
};

export default Edit;

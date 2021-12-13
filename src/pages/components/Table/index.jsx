import React, { useState, useEffect } from 'react';
import axios from 'axios';

import EditForm from '../Edit';

import toObject from '../../utils/CATC';
import '@progress/kendo-theme-default/dist/all.css';

import { process } from '@progress/kendo-data-query';
import {
  GridColumn,
  Grid,
  GridToolbar,
  GridColumn as Column,
} from '@progress/kendo-react-grid';

const EditCommandCell = (props) => {
  return (
    <td>
      <button
        className='k-button k-primary'
        onClick={() => props.enterEdit(props.dataItem)}
      >
        Edit
      </button>
    </td>
  );
};

const Kendo = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api-binance2.morbit.trade/api/proxy/candlestick?symbol=BTCUSDT&interval=1d&limit=1`,
        {
          withCredentials: false,
        }
      )
      .then((res) => {
        setDatas(() => toObject(res.data));
      });
  }, []);

  const [dataState, setDataState] = React.useState({
    skip: 0,
    take: 12,
  });

  console.log(datas);
  const [openForm, setOpenForm] = React.useState(false);
  const [editItem, setEditItem] = React.useState({
    ProductID: 1,
  });
  // const [data, setData] = React.useState(products)

  const enterEdit = (item) => {
    setOpenForm(true);
    setEditItem(item);
  };

  const handleSubmit = (event) => {
    let newData = datas.map((item) => {
      if (event.open === item.open) {
        item = { ...event };
      }

      return item;
    });
    setDatas(newData);
    setOpenForm(false);
  };

  const handleCancelEdit = () => {
    setOpenForm(false);
  };

  const MyEditCommandCell = (props) => (
    <EditCommandCell {...props} enterEdit={enterEdit} />
  );

  return (
    <div dir='rtl' className='k-rtl'>
      <Grid
        style={{
          height: '58vh',
        }}
        filterable={true}
        sortable={true}
        pageable={true}
        data={process(datas, dataState)}
        total={datas.length}
        {...dataState}
        onDataStateChange={(e) => {
          setDataState(e.dataState);
          console.log(e.dataState);
        }}
      >
        <GridColumn field='open' title='open price' />
        <GridColumn field='close' title='close price' />
        <GridColumn field='low' title='low price' editor='numeric' />
        <GridColumn field='high' title='high price' editor='numeric' />
        <Column cell={MyEditCommandCell} />
      </Grid>
      {openForm && (
        <EditForm
          cancelEdit={handleCancelEdit}
          onSubmit={handleSubmit}
          item={editItem}
        />
      )}
      <style>
        {`.k-animation-container {
            z-index: 10003;
        }`}
      </style>
    </div>
  );
};

export default Kendo;

import React, { useState, useEffect } from 'react';

import { Radio } from 'antd';

import { AppleOutlined } from '@ant-design/icons';

const Index = (props) => {
  console.log(123, props);

  const onChange = (val) => {
    console.log(val);
    props.setFestiveTypeVal(val.target.value);
  };

  return (
    <>
      <p>系统提供传统节日、公众节日、生日类型节日中常见的节日信息</p>
      {props.festivalTypes.map((ele) => {
        return (
          <div key={ele.title}>
            <p>{ele.title}</p>
            {ele.value.map((item) => {
              return (
                <Radio.Group onChange={onChange} value={props.festiveTypeVal} key={item.title}>
                  <Radio value={item.title}>{item.title}</Radio>
                </Radio.Group>
              );
            })}
          </div>
        );
      })}
    </>
  );
};
export default Index;

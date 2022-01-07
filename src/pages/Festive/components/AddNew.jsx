import React, { useState, useEffect } from 'react';
import ProForm, {
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormRadio,
  ProFormUploadButton,
  ProFormDigit,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Button, Drawer, Form } from 'antd';
import SelectFestiveType from './SelectFestiveType.jsx';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Card, Modal } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export default (props) => {
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();
  const [festiveTypeVal, setFestiveTypeVal] = useState('');

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const handleChange = (val) => {
    console.log(val);
  };

  const formItemLayout = {
    labelCol: { span: 3 },
    // wrapperCol: { span: 14 },
  };

  const handleOk = () => {
    console.log(form);
    form.setFieldsValue({
      festiveType: festiveTypeVal,
    });
    setVisible(false);
  };

  const festivalTypes = [
    {
      title: '传统节日',
      value: [
        {
          title: '春节',
          value: '春节',
        },
        {
          title: '元宵节',
          value: '元宵节',
        },
        {
          title: '清明节',
          value: '清明节',
        },
        {
          title: '端午节',
          value: '端午节',
        },
        {
          title: '七夕',
          value: '七夕',
        },
        {
          title: '中秋节',
          value: '中秋节',
        },
        {
          title: '重阳节',
          value: '重阳节',
        },
      ],
      selected: '',
    },
    {
      title: '公众节日',
      value: [
        {
          title: '妇女节',
          value: '妇女节',
        },
        {
          title: '五一劳动节',
          value: '五一劳动节',
        },
        {
          title: '儿童节',
          value: '儿童节',
        },
        {
          title: '母亲节',
          value: '母亲节',
        },
        {
          title: '父亲节',
          value: '父亲节',
        },
        {
          title: '国庆节',
          value: '国庆节',
        },
        {
          title: '元旦',
          value: '元旦',
        },
      ],
      selected: '',
    },
    {
      title: '生日类节日',
      value: [
        {
          title: '成员生日',
          value: '成员生日',
        },
        {
          title: '党员政治生日',
          value: '党员政治生日',
        },
      ],
      selected: '',
    },
  ];

  return (
    <>
      <ProForm
        layout="horizontal"
        submitter={{
          onSubmit() {
            console.log(123);
          },
        }}
        form={form}
        onFinish={async (values) => console.log(values)}
      >
        <ProFormText
          name="roleName"
          label="规则名称"
          placeholder="请输入规则名称，例如：生日祝福"
          rules={[{ required: true, message: '规则名称不能为空！' }]}
        />
        <ProForm.Group>
          <ProFormText
            name="festiveType"
            label="节日类型"
            placeholder="请选择节日类型"
            width={350}
            rules={[{ required: true, message: '规则名称不能为空！' }]}
          />
          <Button type="primary" onClick={showDrawer}>
            选择节日
          </Button>
        </ProForm.Group>
        <ProFormDateRangePicker name={['contract', 'createTime']} label="合同生效时间" />
        <ProForm.Group>
          <ProFormSelect
            options={[
              {
                value: 'chapter',
                label: '盖章后生效',
              },
            ]}
            width="xs"
            name="chapter"
            label="合同约定生效方式"
          />
          <ProFormSelect
            width="xs"
            options={[
              {
                value: 'time',
                label: '履行完终止',
              },
            ]}
            name="unusedMode"
            label="合同约定失效效方式"
          />
        </ProForm.Group>
        <ProFormText width="sm" name="id" label="主合同编号" />
        <ProFormText name="project" label="项目名称" initialValue="xxxx项目" />
        <ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途" />
        <ProForm.Group>
          <ProFormSelect
            initialValue="money"
            options={[
              {
                value: 'money',
                label: '确认金额',
              },
            ]}
            width="xs"
            name="useMode"
            label="金额类型"
          />
          <ProFormSelect
            options={[
              {
                value: '6',
                label: '6%',
              },
              {
                value: '12',
                label: '12%',
              },
            ]}
            initialValue="6"
            width="xs"
            name="taxRate"
            label="税率"
          />
          <ProFormRadio.Group
            label="发票类型"
            name="invoiceType"
            initialValue="发票"
            options={['发票', '普票', '无票']}
          />
        </ProForm.Group>
        <ProFormUploadButton
          extra="支持扩展名：.jpg .zip .doc .wps"
          label="倒签报备附件"
          name="file"
          title="上传文件"
        />
        <ProFormDigit width="xs" name="num" label="合同份数" initialValue={5} />
        <ProFormTextArea width="xl" label="合同备注说明" name="remark" />
      </ProForm>

      <Modal title="新增节日祝福" visible={visible} onOk={handleOk} onCancel={onClose}>
        <SelectFestiveType
          festivalTypes={festivalTypes}
          festiveTypeVal={festiveTypeVal}
          setFestiveTypeVal={setFestiveTypeVal}
        />
      </Modal>
    </>
  );
};

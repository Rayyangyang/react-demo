import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Select, Input, Drawer } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';

// 新增节日祝福
import AddNew from './components/AddNew.jsx';

const { Option } = Select;

const columns = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: '标签',
    dataIndex: 'labels',
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const handleSearch = () => {};
export default () => {
  const actionRef = useRef();
  const [searchVal, setSearchVal] = useState('');

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const handleChange = (val) => {
    console.log(val);
  };

  return (
    <>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          console.log(sort, filter);
          return (
            request <
            {
              data: [],
            } >
            ('https://proapi.azurewebsites.net/github/issues',
            {
              params,
            })
          );
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        search={false}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
        }}
        options={false}
        dateFormatter="string"
        headerTitle={
          <Button key="primary" type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
            新增祝福
          </Button>
        }
        toolBarRender={() => [
          <Select
            defaultValue="全部状态"
            style={{ width: 120 }}
            onChange={handleChange}
            key="select"
          >
            <Option value="全部状态">全部状态</Option>
            <Option value="待生效">待生效</Option>
            <Option value="生效中">生效中</Option>
            <Option value="已失效">已失效</Option>
          </Select>,
          <Input
            placeholder="输入规则名称"
            key="input"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />,
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={handleSearch}>
            查询
          </Button>,
        ]}
      />
      <Drawer
        title="新增节日祝福"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={600}
      >
        <AddNew />
      </Drawer>
    </>
  );
};

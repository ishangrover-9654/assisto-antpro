import { PlusOutlined, InboxOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Input,
  Form,
  Select,
  Tooltip,
  Upload,
  message,
  InputNumber,
} from 'antd';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

let index = 0;

const MedicalForm = (props) => {
  const [problemTags, setProblemTags] = useState([]);
  const [persons, setPersons] = useState(['Ishan', 'Shweta']);
  const [personName, setPersonName] = useState('');

  useEffect(() => {
    const apiUrl = 'http://localhost:8080/problems/';
    axios.get(apiUrl).then((response) => {
      console.log(response);
      setProblemTags(response.data || []);
    });
  }, []);
  const { submitting } = props;
  const [form] = Form.useForm();
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 12,
      },
      md: {
        span: 10,
      },
    },
  };
  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };

  const onFinish = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'formAndbasicForm/submitRegularForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues) => {
    const { publicType } = changedValues;
    if (publicType) setShowPublicUsers(publicType === '2');
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="91">+</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const fileprops = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <PageHeaderWrapper content={<FormattedMessage id="medical-form.basic.description" />}>
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{
            marginTop: 8,
          }}
          form={form}
          name="basic"
          initialValues={{
            public: '1',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <Form.Item>
            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger name="files" action="/upload.do" {...fileprops}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="problem"
            rules={[
              {
                required: true,
                message: 'Please select Problem!',
                type: 'array',
              },
            ]}
          >
            <Select mode="tags" placeholder="Problems">
              {problemTags.map((prob) => {
                return (
                  <option key={prob.id} value={prob.name}>
                    {prob.name}
                  </option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="medicines"
            rules={[
              {
                type: 'array',
              },
            ]}
          >
            <Select mode="tags" placeholder="Medicines"></Select>
          </Form.Item>
          <Form.Item
            name="doctors"
            rules={[
              {
                type: 'array',
              },
            ]}
          >
            <Select mode="tags" placeholder="Doctors"></Select>
          </Form.Item>
          <Form.Item
            name="department"
            rules={[
              {
                type: 'array',
              },
            ]}
          >
            <Select mode="tags" placeholder="Department"></Select>
          </Form.Item>
          <Form.Item
            name="treatCenter"
            rules={[
              {
                type: 'array',
              },
            ]}
          >
            <Select mode="tags" placeholder="Hospital/Clinic"></Select>
          </Form.Item>
          <Form.Item
            name="person"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please Select Family Person',
              },
            ]}
          >
            <Select
              placeholder="Person"
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <Divider style={{ margin: '4px 0' }} />
                  <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                    <Input
                      style={{ flex: 'auto' }}
                      value={personName}
                      onChange={(event) => {
                        setPersonName(event.target.value);
                      }}
                    />
                    <a
                      style={{
                        flex: 'none',
                        padding: '8px',
                        display: 'block',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        console.log('addItem');
                        setPersons([...persons, personName || `New item ${index++}`]);
                        setPersonName('');
                      }}
                    >
                      <PlusOutlined /> Add Member
                    </a>
                  </div>
                </div>
              )}
            >
              {persons.map((item) => (
                <Option key={item}>{item}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="date-time-picker">
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="When?" />
          </Form.Item>

          <Form.Item name="phone">
            <Input style={{ width: '20%' }} placeholder="Phone number" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="fees" noStyle>
              <InputNumber
                placeholder="Fees"
                min={0}
                formatter={(value) => ` ₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\₹\s?|(,*)/g, '')}
              />
              <span className="ant-form-text">Fees</span>
            </Form.Item>
          </Form.Item>
          <FormItem name="remarks">
            <TextArea
              style={{
                minHeight: 32,
              }}
              placeholder={formatMessage({
                id: 'medical-form.remarks.placeholder',
              })}
              rows={4}
            />
          </FormItem>

          <FormItem
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit" loading={submitting}>
              <FormattedMessage id="formandbasic-form.form.submit" />
            </Button>
            <Button
              style={{
                marginLeft: 8,
              }}
            >
              <FormattedMessage id="formandbasic-form.form.save" />
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['formAndbasicForm/submitRegularForm'],
}))(MedicalForm);

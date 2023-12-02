import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom';
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 44 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 44 },
        sm: { span: 16 },
      },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 44,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUp: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    
    navigate('/home');
  };

  return (
    <><div className='box1'></div>
      <div className='box2'></div>
      <div className='box3'></div>
      <div className='box4'></div>
    <div className='signup_card'>
      <div className='form'>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}

          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select gender!' }]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{ position: 'absolute', left: '50%' }} onClick={handleLogin}>
              Register
            </Button>


          </Form.Item>
          <div style={{ marginLeft: '68%' }}>
            <span>Or</span>
            <Link to="/singin"> Login In </Link>
          </div>

        </Form>
      </div>
    </div></>
  );
};

export default SignUp;
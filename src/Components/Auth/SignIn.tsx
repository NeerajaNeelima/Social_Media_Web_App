import React from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import './Singin.css'
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};


const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    
    navigate('/home');
  };
  return(
    <div className='login_card'>
    <div className='form1'>
        <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item>
        <div className='flex_box'>
            <div className='left'>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
                </Form.Item>
            </div>
            <div className='right'>
            <Link className="login-form-forgot" to="">
                Forgot password
        </Link>
            </div>
        </div>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 13, span: 18 }}>
   
        <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleLogin}>
          Log in
        </Button>
        Or <Link to="/">register now!</Link>
    </Form.Item>
  </Form>

    </div>
    </div>
);
  };

export default SignIn;
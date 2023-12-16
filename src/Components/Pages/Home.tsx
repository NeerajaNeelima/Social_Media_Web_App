import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {
  HomeOutlined,
  HeartOutlined,
  FileTextOutlined,
  UserOutlined,
  BookOutlined,
  
} from '@ant-design/icons';

import { Layout, Menu as AntMenu, theme, Button,Modal ,Upload,Form,Input, message} from 'antd';
import type { UploadProps } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined,UploadOutlined } from '@ant-design/icons';
import Card from './Card'
import MyLikes from './MyLikes';
import MyBookMarks from './MyBookMarks';
import MyPosts from './MyPosts';
import MyProfile from './MyProfile'

const { Header, Content,Sider } = Layout;



const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  
const [activeMenuItem, setActiveMenuItem] = useState('home'); // Default to 'home'

const [open, setOpen] = useState(false);


  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  

  

  

  const handleMenuClick = (key: string) => {
    setActiveMenuItem(key);
  };

  const props: UploadProps = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if(info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const onFinish = (values: string) => {
    console.log('Success:', values);
  };
  
  /*const onfail = (errorInfo:string) => {
    console.log('Failed:', errorInfo);
  };*/
  
  type FieldType = {
    title?: string;
    description?: string;
    image?:string;
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={toggleSidebar}
      >
        <div className="demo-logo-vertical" />
        <AntMenu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['home']}
          selectedKeys={[activeMenuItem]}
          style={{position:'absolute',top:'20%'}}
        >
          <AntMenu.Item
            key="home"
            icon={<HomeOutlined />}
            onClick={() => handleMenuClick('home')}
            style={{marginBottom:'12%'}}
          >
            Home
          </AntMenu.Item>
          <AntMenu.Item
            key="likes"
            icon={<HeartOutlined />}
            onClick={() => handleMenuClick('likes')}
            style={{marginBottom:'12%'}}
          >
            My Likes
          </AntMenu.Item>
          <AntMenu.Item
            key="posts"
            icon={<FileTextOutlined />}
            onClick={() => handleMenuClick('posts')}
            style={{marginBottom:'12%'}}
          >
            My Posts
          </AntMenu.Item>
          <AntMenu.Item
            key="My BookMarks"
            icon={<BookOutlined />}
            onClick={() => handleMenuClick('My BookMarks')}
            style={{marginBottom:'12%'}}
          >
            My BookMarks
          </AntMenu.Item>
          <AntMenu.Item
            key="My Profile"
            icon={<UserOutlined />}
            onClick={() => handleMenuClick('My Profile')}
            
          >
            My Profile
          </AntMenu.Item>
        </AntMenu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin 0.2s' }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Link to="/"><Button style={{position:'absolute',right:'30px',top:'20px',backgroundColor:'red',color:'white'}}>Logout</Button></Link>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
            {activeMenuItem === 'home' && (
              <>
                <Button type="primary" onClick={() => setOpen(true)} style={{ marginBottom: 16 }}>
                  Create New Post
                </Button>
                
                <Modal
        title="New Post"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        
        
      >
        <div style={{display:'flex',flexDirection:'column'}}>
        
       
  <div style={{}}>
        <Form
    name="basic"
    style={{ maxWidth: 600, paddingTop:10 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    //onFinishFailed={onfail}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Upload Image"
      name="image"
      rules={[{ required: true, message: 'Please enter Title of the post' }]}
    >
      <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
    </Form.Item>
    <Form.Item<FieldType>
      label="Title"
      name="title"
      rules={[{ required: true, message: 'Please enter Title of the post' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Description"
      name="description"
      rules={[{ required: true, message: 'Please enter description' }]}
    >
      <Input />
    </Form.Item>

    

    </Form>

    </div>
        </div>
        
      </Modal>
                <Card/>
              </>
            )}
            {activeMenuItem === 'likes' && <MyLikes/>}
            {activeMenuItem === 'posts' && <MyPosts/>}
            {activeMenuItem === 'My BookMarks' && <MyBookMarks/>}
            {activeMenuItem === 'My Profile' && <MyProfile/>}
          </div>
        </Content>
        
      </Layout>
    </Layout>
  );
};

export default Home;

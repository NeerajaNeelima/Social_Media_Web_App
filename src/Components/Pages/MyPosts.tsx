import React,{useState} from 'react';
import { EditOutlined,DeleteOutlined} from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Badge,Table,Button ,Modal, Space,Form,Input} from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

interface DataType {
  key: React.Key;
  name: string;
  createdAt: string;
  comments:string
}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
 
}
const { confirm } = Modal;
const showDeleteConfirm = () => {
  confirm({
    title: 'Are you sure delete this Comment?',
    icon: <ExclamationCircleFilled />,
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};




const App: React.FC = () => {
  
  const [open, setOpen] = useState(false);
  
  

  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Status',
        key: 'state',
        render: () => <Badge status="success" text="Finished" />,
      },
      
      
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<DataType> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
      render: (_, record) => (
        <>
          <span>{record.comments}</span>
          <Space>
            <Button style={{margin:'10px'}} onClick={() => setOpen(true)}><EditOutlined style={{fontSize:'20px'}}/>
      </Button>
      <Modal
        title="Edit Comment"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Form>
        <Form.Item label="Comment">
          <Input
            
          />
        </Form.Item>
      </Form>
      </Modal>
            <Button onClick={() => showDeleteConfirm()}><DeleteOutlined style={{fontSize:'20px'}}/></Button>
          </Space>
        </>
      ),
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: 'Jack',
      createdAt: '2014-12-24 23:12:00',
      comments :'Good job!.....'
    });
  }

  return (
    <>
      <Table
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={data}
      />
      
    </>
  );
};

export default App;
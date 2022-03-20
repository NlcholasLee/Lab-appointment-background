/**
 * Routes:
 *      - src/routers/PrivateRouter
 */

import React, { useState,useEffect } from 'react'
import { Table, Space, Button } from 'antd';
import { userApply,setWhite,setBlack } from "../../services/index.js"
import router from 'umi/router';


export default function (props) {  
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [formNumber, setFromNumber] = useState(0);

  const handlePassRequest = (event) => {
    console.log(event.target.id);
    setWhite({ openId: event.target.id }).then(res => {
      setRefresh(Math.random());
    })
  }

  const handleRejectRequest = (event) => {
    setBlack({ openId: event.target.id }).then(res => {
      setRefresh(Math.random());
    })
  }

  useEffect(() => {
      userApply().then(res => {
        if(res.data.data){
          setData(res.data.data);
          setFromNumber(res.data.data.length);
        }else {
          router.push('/login')
        }
      })
  },[refresh])
  const columns = [
    {
      title: '微信名',
      dataIndex: 'vxName',
      key: 'vxName',
      render: vxName => (<a>{vxName}</a>),
    },
    {
      title: '电话号码',
      dataIndex: 'telephone',
      key: 'telephone',
    },
    {
      title: '',
      dataIndex: 'openId',
      key: 'openId',
      render: (openId) => (
        <Space size="small">
          <Button type='text' onClick={handlePassRequest} id={openId} style={{background: "#389e0d"}}><span id={openId} style={{ color:"#fff" }}>通过</span></Button>
          <Button type='danger' onClick={handleRejectRequest} id={openId}><span id={openId}>拉黑</span></Button>
        </Space>
      ),
    },
  ];
  
    return (
        <div>
          <Table columns={columns} dataSource={data} pagination={{ pageSize: 7 }} footer={() =>`共计有${formNumber}个正在申请授权的用户`} /> 
        </div>
    )
}

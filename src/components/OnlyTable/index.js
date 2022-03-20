import React, { useState,useEffect } from 'react'
import { Table, Tag, Space, Button } from 'antd';
import { changeStatus, asyCheckTable, setBlack } from "../../services/index.js"


export default function () {  
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [formNumber, setFromNumber] = useState(0);

  const handlePassRequest = (event) => {
    changeStatus({ id: event.target.id, state: 1 }).then(res => {
      setRefresh(Math.random());
    })
  }

  const handleRejectRequest = (event) => {
    changeStatus({ id: event.target.id, state: 2 }).then(res => {
      setRefresh(Math.random());
    })
  }

  const handleCancelRequest = (event) => {
    changeStatus({ id: event.target.id, state: 3 }).then(res => {
      setRefresh(Math.random());
    })
  }

  const handleBanRequest = (event) => {
    setBlack({ openId: event.target.id }).then(res => {
      setRefresh(Math.random());
    })
  }

  useEffect(() => {
    asyCheckTable().then(res => {
      console.log(res);
      const newTableObj = res.data.data.map(item => {
        const newObj = {
          specificTime: "",
          nowStatus: ""
        };
        item.projectName = [item.projectName];
        if(item.morningOrAfternoon){
          newObj.specificTime = `${item.date} 下午`
        }else {
          newObj.specificTime = `${item.date} 上午`
        }
        switch(item.state){
          case 1:
            newObj.nowStatus = "通过"
            break;
          case 2:
            newObj.nowStatus = "驳回"
            break;
          case 3:
            newObj.nowStatus = "应事取消"
            break;
          case 4:
            newObj.nowStatus = "已提交"
            break;
          default:
            newObj.nowStatus = "已取消"
        }
        return {
          key: item.id,
          ...item,
          ...newObj
        }
      })
      setFromNumber(newTableObj.length);
      setData(newTableObj)
    });

  },[refresh])
  const columns = [
    {
      title: '申请人姓名',
      dataIndex: 'name',
      key: 'name',
      render: name => (<a>{name}</a>),
    },
    {
      title: '所在部门',
      dataIndex: 'unitName',
      key: 'unitName',
    },
    {
      title: '电话号码',
      dataIndex: 'telephone',
      key: 'telephone',
    },
    {
      title: '参加人数',
      dataIndex: 'peopleNumber',
      key: 'peopleNumber',
    }, 
    {
      title: '日期',
      dataIndex: 'specificTime',
      key: 'specificTime',
    },
    {
      title: '申请项目',
      key: 'projectName',
      dataIndex: 'projectName',
      render: projectName => (
        <>
          {projectName.map(ap => {
            let color = ap.length > 5 ? 'geekblue' : 'green';
            if (ap === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={ap}>
                {ap}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '申请用途',
      dataIndex: 'action',
      key: 'action',
    },
    // {
    //   title: '当前状态',
    //   dataIndex: 'nowStatus',
    //   key: 'nowStatus',
    // },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <Space size="small">
          <Button type='text' onClick={handlePassRequest} id={id} style={{background: "#389e0d"}}><span id={id} style={{ color:"#fff" }}>通过</span></Button>
          <Button type='danger' onClick={handleRejectRequest} id={id}><span id={id}>驳回</span></Button>
          <Button type='warning' onClick={handleCancelRequest} id={id}><span id={id}>因事取消</span></Button>
        </Space>
      ),
    },
    {
      title: '',
      dataIndex: 'openId',
      key: 'openId',
      render: (openId) => (
        <Space size="small">
          <Button type='text' onClick={handleBanRequest} id={openId} style={{background: "#000"}}><span id={openId} style={{ color:"#fff" }}>黑名单</span></Button>
        </Space>
      ),
    },
  ];
  
    return (
        <div>
          <Table columns={columns} dataSource={data} pagination={{ pageSize: 7 }} footer={() =>`共计有${formNumber}个正在申请的表单`} /> 
        </div>
    )
}

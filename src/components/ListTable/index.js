import React, { useState, useEffect } from 'react'
import { Table, Space, Button, notification } from 'antd';
import { setOrdinary, setAppletAdmin, cancleAppletAdmin } from "../../services/index.js"
import { SmileOutlined } from '@ant-design/icons'

export default function (props) {  
    const [refresh, setRefresh] = useState(0);
    const [formNumber, setFromNumber] = useState(0);

    const ordinaryUser = (event) => {
        console.log(event.target.id);
        setOrdinary({ openId: event.target.id }).then(res => {
            props.reload(Math.random());
        })
    }

    const appletAdmin = (event) => {
        setAppletAdmin({ openId: event.target.id }).then(res => {
            props.reload(Math.random());
            if(res.data.code===200){
                notification.open({
                    message: '设置管理员成功！',
                    icon: <SmileOutlined style={{ color: '#52c41a' }} />,
                });
            }else {
                notification.open({
                    message: '设置管理员失败！',
                    icon: <SmileOutlined rotate={180} style={{ color: '#f4364c' }} />,
                });
            }
        })
    }

    const cancleAdmin = (event) => {
        cancleAppletAdmin({ openId: event.target.id }).then(res => {
            props.reload(Math.random());
            if(res.data.code===200){
                notification.open({
                    message: '取消管理员成功！',
                    icon: <SmileOutlined style={{ color: '#52c41a' }} />,
                });
            }else {
                notification.open({
                    message: '取消管理员失败！',
                    icon: <SmileOutlined rotate={180} style={{ color: '#f4364c' }} />,
                });
            }
        })
    }

    const columns = [
        {
            title: '微信名',
            dataIndex: 'vxName',
            key: 'vxName',
            align: "center",
            render: vxName => (<a>{vxName}</a>),
        },
        {
            title: '电话号码',
            dataIndex: 'telephone',
            key: 'telephone',
            align: "center"
        },
        {
            title: '管理员属性',
            dataIndex: 'flag',
            key: 'flag',
            align: "center",
            render: flag => (<a>{flag?"是":"否"}</a>)
        },
        {
            title: '',
            dataIndex: 'openId',
            key: 'openId',
            align: "center",
            render: (openId) => (
                <Space size="small">
                    <Button type='text' onClick={ordinaryUser} id={openId} style={{background: "#389e0d"}}><span id={openId} style={{ color:"#fff" }}>变为普通用户</span></Button>
                    {props.type?<Button type='primary' onClick={appletAdmin} id={openId}><span id={openId}>设置管理员</span></Button>:""}
                    {props.type?<Button type='warning' onClick={cancleAdmin} id={openId}><span id={openId}>取消管理员</span></Button>:""}
                </Space>
              )
        },
    ];
    return (
        <div>
            <Table columns={columns} dataSource={props.data} pagination={{ pageSize: 7 }} footer={() =>`共计有${props.length}个用户`} /> 
        </div>
    )
}

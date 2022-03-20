/**
 * Routes:
 *      - src/routers/PrivateRouter
 */
import React, { useState, useEffect } from 'react'
import { Divider, Row, Col, Space, Input, Button, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import MyCard from '../components/MyCard/index.js'
import Upload from "../components/UpLoad/index.js"

import { 
    getNotice,
    modifyNotice, 
    addProject, 
    checkAllProject
} from "../services/index.js"
 

export default function () {
    const [notice, setNotice] = useState("?");
    const [midify, setMidify] = useState("??");
    const [projects, setProjects] = useState();
    const [reloadProjects, setReloadProjects] = useState(3);

    //刷新组件
    function getChange(singal) {
        setReloadProjects(singal);
    }

    useEffect(() => {
        // 添加项目
        // addProject({ project : "矿山实地模拟" }).then(res => {
        //     console.log(res);
        // })
        //加载所有项目
        checkAllProject().then(res => {
            setProjects(res.data.data);
            console.log(res.data);
        })
        //加载公告
        getNotice().then(res => {
            if(res.data.code === 200){
                setNotice(res.data.data)
            }else {
                notification.open({
                    message: '公告加载失败，请联系开发人员调试！',
                    icon: <SmileOutlined rotate={180} style={{ color: '#f4364c' }} />,
                });
            }
        })
    }, [reloadProjects])

    const hanldeMidfy = (event) => {
        modifyNotice({ ann: midify }).then(res => {
            if(res.data.code === 200){
                notification.open({
                    message: '修改成功！',
                    icon: <SmileOutlined style={{ color: '#52c41a' }} />,
                });
                setNotice(midify);
                
            }else{
                notification.open({
                    message: '修改失败，请联系开发人员调试！',
                    icon: <SmileOutlined rotate={180} style={{ color: '#f4364c' }} />,
                });
            }
        })
    }
    const onChange = (event) => {
        setMidify(event.target.value);
    }
    return (
        <div>
            {/* <Upload></Upload> */}
            <Divider orientation="left" plain>
                已添加的项目
            </Divider>
            <div style={{ background:"#fff", padding: "1rem 0" }}>
                <Row >
                    <Col span={1}></Col>
                    <Col span={22}>
                        <Space direction="horizontal">
                            {projects && projects.map(item => <MyCard key={item.id} data={reloadProjects} projectInfor={item} reload={getChange}></MyCard>)}
                        </Space>
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <Row>
                    <Col span={21}></Col>
                    <Col span={2} style={{ textAlign: "right" }}>
                        <Button type='primary'>添加项目</Button>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
            <Divider orientation="left" plain>
                修改公告
            </Divider>
            <div style={{ background:"#fff", padding: "1.5rem 0" }}>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <p>
                            当前公告: {notice}
                        </p>
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                    <Input.Group compact>
                        <Input style={{ width: '30%' }} placeholder="请输入修改后的公告" onChange={onChange} />
                        <Button type="primary" onClick={hanldeMidfy}>修改</Button>
                    </Input.Group>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
            
        </div>
    )
}
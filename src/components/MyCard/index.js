import React, { useState, useEffect } from 'react'
import { Card, Switch, Button } from 'antd';
import styles from './index.css'

import { modifyProjectStatus, deleteProject } from '../../services/index.js'

const { Meta } = Card;


export default function PatientCard(props) {
    const [newState, setNewState] = useState(props.projectInfor.state);

    useEffect(() => {
        setNewState(props.projectInfor.state);
    },[props.projectInfor.state])

    function onChange(checked) {
        modifyProjectStatus({ ann: props.projectInfor.id }).then(res => {
            console.log(res);
            setNewState(res.data.data);
        })
    }
    
    const handleDeleteProject = () => {
        deleteProject({ ann: props.projectInfor.id }).then(res => {
            props.reload(Math.random());
        })

    }

    return(
        <div style={{ display: 'inline-block', position: 'relative' }}>
            <Card
                style={{ display: 'inline-block' }}
                classSuggest={`${styles.m1} `}
                cover={
                <img
                    alt="example"
                    src={"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                />
                }
                actions={[
                    <Switch defaultChecked onChange={onChange} defaultChecked={newState} />,
                    <Button type='danger' shape="round" onClick={handleDeleteProject}>删除项目</Button>
                ]}
            >
                <Meta
                    title={props.projectInfor.name}
                    description={props.projectInfor.content}
                />
            </Card>
        </div>
    )
}
import React, { useState,useEffect } from 'react'
import { Table, Tag, Space, Button, Select } from 'antd';
import { historyTable, historyJoinNumber, historyConditionTable, getAllUnit } from "../../services/index.js"
const { Option } = Select;


function changeArray(array) {
  let newNumber = 0;
  return array.map(item => {
    newNumber += item.peopleNumber;
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
      ...newObj,
      newNumber
    }
  })
}

export default function () {
    const [data, setData] = useState();
    const [unit, setUnit] = useState([{ id: 1, name:"请选择学院" }]);
    const [number, setNumber] = useState([{ people:0, unitSum:0 }]);

    //获取基本信息
    useEffect(() => {
      getAllUnit().then(res => {
        setUnit(res.data.data)
      })
      historyJoinNumber().then(res => {
        console.log(res);
        setNumber(res.data.data);
      })
    },[])

    //获取所有历史申请
    useEffect(() => {
      historyTable().then(res => {
        const newTableObj = changeArray(res.data.data);
        setData(newTableObj)
      });
    },[])

    //按学院条件获取申请
    const handleChange = (event) => {
      console.log(event);
      historyConditionTable({ unitId: event }).then(res => {
        const newTableObj = changeArray(res.data.data);
        setData(newTableObj);
        console.log(res);
        setNumber({ unitSum: 1, people: newTableObj[newTableObj.length - 1].newNumber })
      })
    };
    
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
      {
        title: '当前状态',
        dataIndex: 'nowStatus',
        key: 'nowStatus',
      }
    ];
  
    return (
        <div>
          <Select defaultValue={unit[0].name} style={{ width: 120, marginBottom: "1.2rem", marginRight: "0.7rem" }} onChange={handleChange}>
            {unit && unit.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
          </Select>
          {/* <Select defaultValue="jack" style={{ width: 120, marginBottom: "1.2rem" }} onChange={handleChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select> */}

          <Table columns={columns} dataSource={data} pagination={{ pageSize: 7 }} footer={() =>`共计有 ${number.unitSum} 个学院的 ${number.people} 名学生参加了仿真实验`} /> 
        </div>
    )
}

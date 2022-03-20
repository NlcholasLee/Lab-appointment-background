import Mock from 'mockjs'

Mock.mock("localhost:8080/bus/check","get",{
    "code": "200",
    "msg": "登录成功",
    "data|10":[{
        "id|+1": 1,
        "name": "@cname",
        "department": "@city",
        "pNumber": "@integer(60, 100)",
        "time": "@date",
        "applicationProject": "@region",
        "purpose": "@ctitle(9)"
    }] 
})


Mock.mock("localhost:8080/login/log","post",{
    "code": "200",
    "msg": "添加成功",
    "data": {}
})

Mock.mock("localhost:8080/ann/modify","put",{
    "code": "200",
    "msg": "修改成功",
    "data": {}
})

Mock.mock("localhost:8080/lnum/del",{
    "code": "200",
    "msg": "删除成功",
    "data": {}
})



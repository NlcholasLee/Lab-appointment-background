import request from './request'
// import '../../mock/mockTable.js';

const token = localStorage.getItem("loginId")?localStorage.getItem("loginId"):"error";

//登录
export const loginIn = (data) => {
    return request({
        method: "POST",
        url: "/login/log",
        data
    })
}

//查看用户授权申请表
export const userApply = () => {
    return request({
        method: "GET",
        url: "/user/userApplyForm",
        headers: {
            "token": token
        }
    })
}

//查看白名单用户
export const getWhiteUser = () => {
    return request({
        method: "GET",
        url: "/user/checkWhite",
        headers: {
            "token": token
        }
    })
}

//查看黑名单用户
export const getBlackUser = () => {
    return request({
        method: "GET",
        url: "/user/checkBlack",
        headers: {
            "token": token
        }
    })
}

//设置黑名单用户
export const setBlack = (data) => {
    return request({
        method: "POST",
        url: "/user/setBlack",
        headers: {
            "token": token
        },
        params: {
            ...data
        }
    })
}

//设置白名单用户
export const setWhite = (data) => {
    return request({
        method: "POST",
        url: "/user/setWhite",
        headers: {
            "token": token
        },
        params: {
            ...data
        }
    })
}

//设置为普通用户
export const setOrdinary = (data) => {
    return request({
        method: "POST",
        url: "/user/concle",
        headers: {
            "token": token
        },
        params: {
            ...data
        }
    })
}

//设置用户为小程序管理员
export const setAppletAdmin = (data) => {
    return request({
        method: "POST",
        url: "/user/setAdmin",
        headers: {
            "token": token
        },
        params: {
            ...data
        }
    })
}

//取消用户为小程序管理员
export const cancleAppletAdmin = (data) => {
    return request({
        method: "POST",
        url: "/user/cancleAdmin",
        headers: {
            "token": token
        },
        params: {
            ...data
        }
    })
}

//查看公告
export const getNotice = () => {
    return request({
        method: "GET",
        url: "/ann/see",
        headers: {
            "token": token
        },
    })
}

//修改公告
export const modifyNotice = (data) => {
    return request({
        method: "PUT",
        url: "/ann/modify",
        headers: {
            "token": token
        },
        data
        
    })
}

//获取申请列表
export const asyCheckTable = () => {
    return request({
        method: "GET",
        url: "/bus/check",
        headers: {
            "token": token
        }
    })
}

//修改表单状态
export const changeStatus = (data) => {
    return request({
        method: "PUT",
        url: "/bus/change",
        headers: {
            "token": token
        },
        data
       
    })
}

//查看历史表单
export const historyTable = () => {
    return request({
        method: "GET",
        url: "/bus/his",
        headers: {
            "token": token
        }
    })
}

//查看历史申请中的单位数和参加人数
export const historyJoinNumber = () => {
    return request({
        method: "GET",
        url: "/bus/HisPaU",
        headers: {
            "token": token
        }
    })
}

//按学院条件查询历史表单
export const historyConditionTable = (data) => {
    return request({
        method: "GET",
        url: "/bus/hisUnit",
        headers: {
            "token": token
        },
        params: data
    })
}

//查看所有项目
export const checkAllProject = (data) => {
    return request({
        method: "GET",
        url: "/pro/allpro",
        headers: {
            "token": token
        }
    })
}

//修改项目状态
export const modifyProjectStatus = (data) => {
    return request({
        method: "PUT",
        url: "/pro/change",
        headers: {
            "token": token
        },
        data
       
    })
}

//删除项目
export const deleteProject = (data) => {
    return request({
        method: "DELETE",
        url: "/pro/delpro",
        headers: {
            'token': token,
        },
        data
    })
}

//添加项目
export const addProject = (data) => {
    return request({
        method: "POST",
        url: "/pro/new",
        headers: {
            "token": token
        },
        data
       
    })
}

// 获取所有单位
export const getAllUnit = () => {
    return request({
        method: "GET",
        url: "/unit/all",
        headers: {
            "token": token
        },
    })
}

//增加实验室
export const addDepartment = (data) => {
    return request({
        method: "POST",
        url: "/lnum/add",
        headers: {
            "token": token
        },
        data
       
    })
}


//获取所有实验室
export const getAllDepartment = () => {
    return request({
        method: "GET",
        url: "/lnum/all",
        headers: {
            "token": token
        }
    })
}

//修改实验室
export const modifyDepartment = (data) => {
    return request({
        method: "PUT",
        url: "/lnum/change",
        headers: {
            "token": token
        },
        data
       
    })
}

//删除实验室
export const deleteDepartment = (data) => {
    return request({
        method: "DELETE",
        url: "/lnum/del",
        headers: {
            'token': token,
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

// //添加新图片
// export const addProjectPotot = (data) => {
//     return request.post("/pro/newphoto", data);
// }

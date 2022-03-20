/**
 * Routes:
 *      - src/routers/PrivateRouter
 */
 import React, { useState, useEffect } from 'react'
 import { Divider } from 'antd';
 import ListTable from '../components/ListTable/index.js';
 import { getWhiteUser, getBlackUser } from "../services/index.js"

 export default function () {
     const [whiteList, SetWhiteList] = useState();
     const [blackList, SetBlackList] = useState();
     const [reload, setReload] = useState(7);

     function reloadSubgroup() {
         setReload(Math.random());
     }
     useEffect(()=>{
         getBlackUser().then(res => {
             SetBlackList(res.data.data)
         });
         getWhiteUser().then(res => {
             console.log(res.data);
            SetWhiteList(res.data.data);
         })
     },[reload])

     return (
         <div>
             {/* <Upload></Upload> */}
             <Divider orientation="left" plain>
                 黑名单用户
             </Divider>
             <div style={{ background:"#fff" }}>
                <ListTable data={blackList} length={blackList && blackList.length} type={0} reload={reloadSubgroup} />
             </div>
             <Divider orientation="left" plain style={{ marginTop: "20px" }}>
                 白名单用户
             </Divider>
             <div style={{ background:"#fff" }}>
                <ListTable data={whiteList} length={whiteList && whiteList.length} type={1} reload={reloadSubgroup} />
             </div>
             
         </div>
     )
 }
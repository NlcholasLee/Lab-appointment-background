import React, { useState } from 'react'
import { Layout, Menu, Modal } from 'antd';
import styles from './index.css'
import { NavLink } from 'umi'
import { 
  HomeOutlined, 
  LogoutOutlined, 
  ExclamationCircleOutlined,
  SettingOutlined,
  HistoryOutlined,
  DatabaseOutlined,
  HighlightOutlined
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

export default function (props) {
  const [defaultSelect, setSelect] = useState(window.location.pathname);

  // log out confirm
  const warning = () => {
    Modal.confirm({
      title: '退出登录',
      icon: <ExclamationCircleOutlined />,
      content: '是否退出登录？',
      okText: "确认",
      cancelText: "取消",
      onOk(){
        loginOut();
      },
      onCancel(){
        console.log("cancel")
      }
      
    });
  }

  const loginOut = () => {
      localStorage.removeItem("loginId");
      sessionStorage.setItem("isLogin",false);
      props.history.push("/login");
  }

  const handleChangeSelect = () => {
    setSelect(window.location.pathname);
  }
  let jump = new RegExp('index.html$');
  if(jump.test(props.location.pathname) && sessionStorage.getItem("isLogin") !== true){
    props.history.push("/login");
  }

  if(props.location.pathname === "/login"){
    return(
      <div className={`${styles.color_background}`}>
        {props.children}
      </div>
    )
  }else{
    return (
      <Layout className={styles.all}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className={styles.logo1} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']} selectedKeys={[defaultSelect]}>
            <Menu.Item key="/" onClick={handleChangeSelect}><NavLink  exact to="/"><HomeOutlined /> 主页</NavLink></Menu.Item>
            <Menu.Item key="/apply" onClick={handleChangeSelect}><NavLink  exact to="/apply"><HighlightOutlined /> 正在申请</NavLink></Menu.Item>
            <Menu.Item key="/history" onClick={handleChangeSelect}><NavLink  exact to="/history"><HistoryOutlined /> 历史申请</NavLink></Menu.Item>
            <Menu.Item key="/list" onClick={handleChangeSelect}><NavLink  exact to="/list"><DatabaseOutlined /> 黑白名单</NavLink></Menu.Item>
            <Menu.Item key="/setting" onClick={handleChangeSelect}><NavLink  exact to="/setting"><SettingOutlined /> 项目设置</NavLink></Menu.Item>
            <Menu.Item key="5" onClick={warning}><LogoutOutlined /> 退出登录</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header  className={styles.header_box}  style={{ padding: "0" }}>
            <div className={styles.title} style={{ marginLeft: "-7rem" }}>仿真实验预约系统后台</div>
            </Header>
          <Content style={{ margin: '24px 16px 0' },{paddingTop:'52px'}}>
            <div className="site-layout-background" style={{ padding: 24, height: "90vh", overflow:"auto" }}>
              {props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}




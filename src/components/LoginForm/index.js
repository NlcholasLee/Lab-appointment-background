import React,{ useRef, useState } from 'react'
import { Input, Button, notification, Image } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import styles from './index.css';

export default function (props) {
	const loginBoxRef = useRef();
	const registerBoxRef = useRef();
	const formBoxRef = useRef();
	const [userName, setUserName] = useState('');
	const [pwd, setPwd] = useState('');

	// sign in
	const onLoginClicked = () => {
		const result =  props.onLogin && props.onLogin(userName, pwd);
		result.then(res => {
			console.log(res);
			if(res){
					notification.open({
						message: '登录成功！',
						icon: <SmileOutlined style={{ color: '#52c41a' }} />,
					});
			}else{
					notification.open({
						message: '登录失败！',
						icon: <SmileOutlined rotate={180} style={{ color: '#f4364c' }} />,
					});
			}
		})
	};

	// sign up
	const onResigterClicked = () => {
		console.log("注册");
	}

	const onPwdChange = (event) => {
		setPwd(event.target.value);
	}

	const onUserNameChange = (event) => {
		setUserName(event.target.value)
	}

	const handleGoRes = () => {
		loginBoxRef.current.classList.add(styles.hidden);
		registerBoxRef.current.classList.remove(styles.hidden);
		formBoxRef.current.style.transform = 'translateX(85%)';
	}

	const handleGoLogin = () => {
		loginBoxRef.current.classList.remove(styles.hidden);
		registerBoxRef.current.classList.add(styles.hidden);
		formBoxRef.current.style.transform = 'translateX(0%)';
	}

   return (
      <div className={styles.box}>
			<div className={styles.container}>
            <div className={styles.form_box} ref={formBoxRef}>
               <div className={`${styles.register_box} ${styles.hidden}`} ref={registerBoxRef}>
                  <h1>注册</h1>
                  {/* <Input placeholder="用户名" className={styles.input} bordered={false}/>
                  <Input placeholder="邮箱" className={styles.input} bordered={false}/>
                  <Input placeholder="密码" className={styles.input} bordered={false}/>
                  <Input placeholder="确认密码" className={styles.input} bordered={false}/>
						<Button className={styles.button1} size="large">注册</Button> */}
						<h1>暂不支持自行注册</h1>
						<h1>请联系管理员</h1>
					</div>
					<div className={styles.login_box} ref={loginBoxRef}>
                  <h1>登录</h1>
                  <Input placeholder="用户名" className={styles.input} bordered={false} onChange={onUserNameChange} />
                  <Input type='password' placeholder="密码" className={styles.input} bordered={false} onChange={onPwdChange}/>
                  <Button className={styles.button1} size="large" onClick={onLoginClicked}>登录</Button>
					</div>
            </div>
				<div className={`${styles.con_box} ${styles.left}`}>
					<h2>实验室预约<span>管理系统</span></h2>
					<p>此为<span>物联网</span>实验室预约后台管理</p>
					<img
                    alt="example"
                    src={"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                />
					<p>已有账号</p>
					<Button className={styles.button2} size='middle' onClick={handleGoLogin}>去登录</Button>
        		</div>
				<div className={`${styles.con_box} ${styles.right}`}>
					<h2>实验室预约<span>管理系统</span></h2>
					<p>此为<span>物联网</span>实验室预约后台管理</p>
					<img
                    alt="example"
                    src={"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                />
					<p>没有账号?</p>
					<Button className={styles.button2} size='middle' onClick={handleGoRes}>去注册</Button>
				</div>
        </div>
		</div>
   );
}

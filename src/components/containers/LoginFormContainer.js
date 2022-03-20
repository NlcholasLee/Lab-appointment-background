import { connect,routerRedux } from 'dva';
import LoginForm from '../LoginForm';

const mapDispatchToProps = dispatch => ({
    async onLogin(userName, pwd){
        const result = await dispatch({ type: "loginUser/login", payload: { userName, pwd } }) 
        if(result){
            dispatch(routerRedux.push("/"));
            return true;
        }else{
            return false;
        }
    }
})

export default connect(null, mapDispatchToProps)(LoginForm);
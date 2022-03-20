import { connect, routerRedux } from "dva"

function PrivateRouter(props) {
    if(sessionStorage.getItem("isLogin") == null || sessionStorage.getItem("isLogin") === "false"){
        console.log("a");
        props.onNotLogin && props.onNotLogin();
        return null;
    }else{
        return props.children;
    }
}

const mapDispatchToProps = dispatch => ({
    onNotLogin(){
        dispatch(routerRedux.push("/login"));
    }
})

export default connect(null, mapDispatchToProps)(PrivateRouter)

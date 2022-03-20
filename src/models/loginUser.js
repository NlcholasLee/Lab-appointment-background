import { loginIn } from "../services/index.js"

export default {
    state: null,
    reducers: {
        setLoginUser(state, { payload }){
            return payload;
        }
    },
    effects: {
        *login({ payload }, { put, call }){
            const { userName, pwd } = payload;
            const callbackObj = yield call(loginIn, { accountNumber: userName, password: pwd });
            if(callbackObj.data.code === 200){
                //login successful
                yield put({ type: "setLoginUser", payload: callbackObj.data.data });
                localStorage.setItem("loginId", callbackObj.data.data);
                sessionStorage.setItem("isLogin",true);
                return true;
            }
            return false;
        },
        *loginOut(action, { put }){
            yield put({ type: "setLoginUser", payload: null });
            localStorage.removeItem("loginId");
            sessionStorage.removeItem("isLogin");
        }
    },
    subscriptions: {
        syncLocalStorage({ dispatch }) {
            let loginId = localStorage.getItem("loginId");
            if(loginId){
                dispatch({ type: "setLoginUser", payload: loginId });
            }
        }
    }
}
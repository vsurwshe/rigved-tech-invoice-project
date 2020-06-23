// import axios from "axios"


const LoginUser=(userData) =>{
        return (dispatch) => {
    //         return axios.post(API_URL + "/auth/user/token", {
    //             userEmail: userData.username,
    //             userPassword: userData.password
    //         }).then(response => {
    //                 dispatch(loadMessage('success', 'Login Successfull'))
    //                 dispatch(saveToken(response.data))
    //         }).catch(err => {
    //                 dispatch(loadMessage('danger', 'Sorry you are not provied vaild credtional'));
    //         })
    if(userData.userName=== "Admin"){
        return dispatch(setRole({
            token:"HDFGSHDGFHSDGFJ35426347SBDFGS46235",
            role:"Admin"
        }))
    }else{
        return dispatch(setRole({
            token:"HDFGSHDGFHSDGFJ35426347SBDFGS46235",
            role:"Manager"
        }))
    }

    }
}





export function setRole(data){
    return{
        type:"USER_LOGIN",
        role :data.role ? data.role :""
    }
}

export {
    LoginUser
}
import {message} from 'antd'
export const Register = ({name,email,password}) =>{
     const newUser = JSON.parse(localStorage.getItem('user')) || [];
     const isRegister = newUser.find((newUser) => newUser.email === email);
     if(isRegister){
        message.error("You have already registered please login!");
        return false;
     }else{
        message.success("You have Successfully register and loggedIn!")
        newUser.push({name,email,password});
        localStorage.setItem('user',JSON.stringify(newUser));
        localStorage.setItem('currentUser', JSON.stringify({name,email,password}));
        return true;
     }
}

export const Login = ({email,password}) =>{
    const checkUser = JSON.parse(localStorage.getItem('user')) || [];
    const vaildUser = checkUser.find(((checkUser) => checkUser.email === email && checkUser.password === password));
    if(vaildUser){
        message.success("login success!");
        localStorage.setItem('currentUser', JSON.stringify(vaildUser));
        return true;
    }else{
        message.error("Wrong email or password");
        return false;
    }

}
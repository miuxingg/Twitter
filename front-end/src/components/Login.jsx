import React, { useContext, useState } from 'react';
import "../css/login.css"
import axios from 'axios'
import AppContext from './AppContext'
import {useHistory} from 'react-router'

function Login(props) {
    const {dispatch} = useContext(AppContext);
    const [userInput, setUserInput] = useState({
        email : "",
        password : "",
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useHistory();
    const onChangeHandle = (e)=>{
        const target = e.target;
        setUserInput({...userInput, [target.name] : target.value});
    }

    const onSubmitHandle = async (e) =>{
        e.preventDefault();
        try{
            const option = {
                method : "post",
                url : "/api/v1/auth/login",
                data : userInput,
            }
            const response = await axios(option);
            const {token, userName} = response.data.data;
            localStorage.setItem('token', token);
            dispatch({type:"CURRENT_USER", payload : {userName}});
            history.push('/');
        }
        catch(error){
            setErrorMessage(error);
            console.log(error);
        }
    }
    return (
        <div className="auth-login">
            <div className="container">
                <form className="login" onSubmit = {onSubmitHandle}>
                    <h2>Enter Your account</h2>
                    {errorMessage ? <span className="error">Error: Your password is not correct</span> : ""}
                    <input 
                        type="text" 
                        className="input-text" 
                        placeholder="Email"
                        name="email"
                        value = {userInput.email}
                        onChange = {onChangeHandle}
                        />
                    <input 
                        type="password" 
                        className="input-text" 
                        placeholder="Password"
                        name = "password"
                        value = {userInput.password}
                        onChange = {onChangeHandle}
                        />
                    <button type="submit" className="btn">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
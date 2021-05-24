import React, { useContext, useState } from 'react';
import '../css/login.css'
import axios from 'axios'
import AppContext from './AppContext'
import { useHistory } from 'react-router'

function Register(props) {
    const {dispatch} = useContext(AppContext);
    const [userInput, setUserInput] = useState({
       name : "",
       email:"",
       password:"", 
    });
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState(null);
    const onChangeHandle = (e)=>{
        const target = e.target;
        setUserInput({...userInput, [target.name]:target.value});
    }
    const onSubmitHandle = async (e) =>{
        e.preventDefault();
        try{
            const option = {
                method : "post",
                url : "/api/v1/auth/register",
                data : userInput,
            }
            const response = await axios(option);
            const {token, userName} = response.data.data;
            localStorage.setItem('token',token);
            dispatch({type : "CURRENT_USER", payload : {userName}});
            history.push('/');
        }
        catch(err){
            setErrorMessage(err.response.data.message);
        };
    }
    return (
        <div className="auth-login">
            <div className="container">
                <form className="login" onSubmit = {onSubmitHandle}>
                    <h2>Enter Your account</h2>
                    <span className="error">{errorMessage}</span>
                    <input 
                        type="text" 
                        className="input-text" 
                        placeholder="Name"
                        name = "name"
                        value = {userInput.name}
                        onChange = {onChangeHandle}
                        />
                    <input type="text" className="input-text" placeholder="Email"
                        name = "email"
                        value = {userInput.email}
                        onChange = {onChangeHandle}/>
                    <input type="password" className="input-text" placeholder="Password"
                        name = "password"
                        value = {userInput.password}
                        onChange = {onChangeHandle}/>
                    <button type="submit" className="btn">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
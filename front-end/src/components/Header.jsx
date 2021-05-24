import React, { useContext } from 'react';
import '../css/header.css'
import { Link } from 'react-router-dom';
import AppContext from './AppContext' 


function Header(props) {
    const {state, dispatch} = useContext(AppContext);
    const {user} = state;
    const signOut = () =>{
        localStorage.removeItem('token');
        dispatch({type: "CURRENT_USER", payload : null});
    }
    return (
        <div className="header">
            <div className="container">
                <div className="logo">
                    <Link to='/'>Twitter</Link>
                </div>
                <ul className="nav">
                    {
                        user
                        ?   (<>
                                <li>
                                    Hello, {user.userName}
                                </li>
                                <li>
                                    <Link to='/' onClick = {() => signOut()} >Sign out</Link>
                                </li>
                            </>)
                        :   (<> 
                                <li>
                                    <Link to='/login'>Login</Link>
                                    </li>
                                    <li>
                                        <Link to='/register'>Register</Link>
                                </li>
                            </>)
                    }
                </ul>
            </div>
        </div>
    );
}

export default Header;
import React, { useContext, useState } from 'react';
import "../css/form.css";
import axios from 'axios';
import AppContext from './AppContext'
function Form(props) {
    const {dispatch, state} = useContext(AppContext);
    const {user, posts} = state;
    const [postInput, setPostInput] = useState({content : ""});
    const [errorMessage, setErrorMessage] = useState(null);
    
    const onChangeHandle = (e) =>{
        setPostInput({...postInput, [e.target.name] : e.target.value});
    } 
    
    const onHandleSubmit = async (e)=> {
        e.preventDefault();
        
        try {
            const token = localStorage.getItem('token');
            const option = {
                method : 'post',
                url : '/api/v1/post/',
                data : postInput,
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            }
            const res = await axios(option);
            const post = res.data.data;
            const author = {_id : post.author, name: user.userName};
            console.log(post);
            console.log(posts[0]);
            console.log({content : post.content, _id : post._id, createdAt : post.createdAt, author})
            dispatch({
                type: 'CREATE_ONE_POST',
                payload : {post, author}
            });

            postInput({content: ""});
        } catch (error) {
            
            
        }
    }
    return (
        <div className="form">
            <div className="container">
                <textarea
                type = "text" 
                className="content"
                name="content"
                placeholder="What's happening?"
                value = {postInput.content}
                onChange = {onChangeHandle}
                ></textarea><br/>
                <button className="btn bull-right" type="submit" onClick={onHandleSubmit}>Tweet</button>
            </div>
        </div>
    );
}

export default Form;
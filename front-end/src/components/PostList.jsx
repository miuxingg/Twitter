import React, { useCallback, useContext, useEffect } from 'react';
import "../css/post.css";
import PostItem from './PostItem';
import AppContext from './AppContext';
import axios from 'axios'

function PostList(props) {
    const {state, dispatch} = useContext(AppContext);
    const {posts, user} = state;
    const getAllPosts = useCallback( async () =>{
        try{
            const option = {
                method : 'get',
                url : '/api/v1/post',
            };
            const res = await axios(option);
            const posts = res.data.data.posts;
            dispatch({type : 'GET_ALL_POST', payload : posts});
            
        }catch(error){
            console.log(error);
        }
    }, [dispatch]);
    useEffect(()=>{
        getAllPosts();
    },[getAllPosts]);
    const newPosts = posts.map(post => {
        if (user) {
            return post.author.name === user.userName
            ? {...post, isEnable : true} 
            : post;
        }
        else{
            return {...post, isEnable : false}
        }
    });

    return (
        <div className="post">
            <div className="container">
                <div className="post-list">
                    {
                        newPosts.map((post, index) => (
                            <PostItem Post = {post} key  = {post._id}/>
                            ) 
                        )
                    }
                    
                </div>
            </div>
        </div>
    );
}

export default PostList;
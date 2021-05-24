import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AppContext from './AppContext';

PostItem.propTypes = {
    post : PropTypes.object,
};

function PostItem(props) {
    const {Post} = props;
    const {dispatch} = useContext(AppContext);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [isDeleteComfirm, setIsDeleteComfirm] = useState(false);
    let date = new Date(Post.createdAt);
    const [postEdit, setPostEdit] = useState(Post);

    const onChangeHandle = (e)=>{
        const target = e.target;
        setPostEdit({...postEdit, [target.name] : target.value});
    }

    const onHandleUpdate = async (e) => {
        e.preventDefault();
        try{
            setOpenEditForm(false);
            const token = localStorage.getItem('token');
            const option = {
                method : 'put',
                url : `/api/v1/post/${Post._id}`,
                data : postEdit,
                headers : {
                    Authorization : `Bearer ${token}`,
                }
            }
            await axios(option);
            dispatch({
                type: 'UPDATE_ONE_POST',
                payload:{...postEdit},
            });
        }catch(error){
            console.log(error);
        }
    }

    const onHandleDelete = async (e)=>{
        e.preventDefault();
        try{
            const token = localStorage.getItem('token');
            const option = {
                method : 'delete',
                url : `/api/v1/post/${Post._id}`,
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            }
            await axios(option);
            dispatch({
                type : 'DELETE_ONE_POST',
                payload : {_id: Post._id}
            })
        }catch(error){
            console.log(error);
        }
    }
    return (
        <div>
            <div className="post-item">
                        <p className="post-content">{Post.content}</p>
                        <div className="post-footer">
                            <span>By: {Post.author.name}</span>
                            <span>Date: {`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</span>
                            <div className="post-edit-delete">
                                {
                                    Post.isEnable 
                                    ?   <>
                                            <span onClick = {()=>setOpenEditForm(!openEditForm)}>Edit</span>
                                            <span onClick = {() => setIsDeleteComfirm(!isDeleteComfirm)}>Delete</span>
                                            {
                                                isDeleteComfirm 
                                                ? <>
                                                    <span className="warning">Are you sure?</span>
                                                    <span onClick = {onHandleDelete}>Yes</span>
                                                    <span onClick = {() => setIsDeleteComfirm(false)}>No</span>
                                                </> 
                                                : ""
                                            }
                                        </>
                                    : ""
                                }
                                
                            </div>
                        </div>
                    </div>
                    {
                        openEditForm
                        ?   <>
                                <div className="post-edit-form">
                                    <textarea
                                        type = "text" 
                                        className="content"
                                        name="content"
                                        placeholder="What's happening?"
                                        value = {postEdit.content}
                                        onChange = {onChangeHandle}
                                    ></textarea><br/>
                                    <button 
                                        className="btn bull-right ml-5" 
                                        type="submit"
                                        onClick = {()=>openEditForm(false)}
                                        >Cancel</button>
                                    <button 
                                        className="btn bull-right mr-5" 
                                        type="submit"
                                        onClick = {onHandleUpdate}
                                        >Update</button>
                                </div>
                            </>
                        : ""
                    }
                    
        </div>
    );
}

export default PostItem;
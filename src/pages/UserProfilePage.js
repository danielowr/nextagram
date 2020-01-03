import React, { useState, useEffect } from 'react';
import { GET_USER_INFO } from '../constants/api';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import UserImages from '../containers/UserImages';

const Page = styled.div `
    text-align: center 

    .profile-img {
        display: block;
        height: 150px;
        border-radius: 50%;
        margin: auto;
    }

`

const  UserProfilePage = () => {
    const { id } = useParams()
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        Axios.get(GET_USER_INFO(id))
        .then(result => {
            setUser(result.data)
            setIsLoading(false)
        })
    }, [id])
    if (isLoading) {
        return "Loading..."
    }
    return (
        <Page>           
            <h2>{user.username}</h2>
            <img className="profile-img" src={user.profileImage}/>
            <UserImages width={250} userId={user.id}/>

        </Page>


    )
}

export default UserProfilePage 
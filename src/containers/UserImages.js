import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { GET_USER_IMAGES } from '../constants/api'
/*import Image from "../components/LoadingIndicator"; */
import Image from 'react-graceful-image'

const UserImagesContainer = styled.section `
    background: PowderBlue; 
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    
    img {
        height: 150px;

    }
`
const imageStyle = {
    borderRadius:"10px",
    margin: "10px 10px",
}

const UserImages = ({ userId ,width}) => {

        const [images, setImages] = useState([])

        useEffect(() => {

        Axios.get(GET_USER_IMAGES(userId)).then(result => {
            setImages(result.data)
        })
    }, [userId])

    return (
    <UserImagesContainer>
        {images.map(img =>  (
            <Image src={img.url} style={imageStyle} width={width}/>
        ))}
            
    </UserImagesContainer>
    )
}

export default UserImages
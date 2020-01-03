import React from 'react'
import { Container } from 'reactstrap'
// import TowPic from '../images/tow.svg'

const MyProfilePage = () => {
    return (
        <Container 
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                paddingTop: '50px'
            }}
        >
            <img style={{ height: '40vh' }} alt="under construction" />
            <h3 className="text-muted mt-5">Under Construction</h3>
        </Container>
    )
}


export default MyProfilePage
import React, {useState} from 'react';
import {Form ,Button,FormText,FormGroup, Input } from 'reactstrap';
import axios from "axios"
const UploadPage = () => {
    const [imageFile, setImageFile] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [message, setMessage] = useState('')

    const handleInput=(e)=>{
        setPreviewImage(URL.createObjectURL(e.target.files[0]))
        setImageFile(e.target.files[0])
    }
    const handleSubmitFile = e => {
        // Prevent the default behaviour of the form submitting
        e.preventDefault();
        // Authorization of the user
        let JWT = localStorage.getItem("jwt");
        // Formdata object to hold the image file to send to the server
        let formData = new FormData();
        // Append the key:value pair to the formData object
        formData.append("image", imageFile);
      
        axios.post("https://insta.nextacademy.com/api/v1/images/", formData, {
            headers: { Authorization: `Bearer ${JWT}` }
          })
          .then(response => {
            if (response.data.success) {
                setMessage("Image Uploaded Successfully!")
                setPreviewImage(null)
                setImageFile(null)
            }
          })
          .catch(error => {
            console.log(error.response);
          });
      };

        return(
            <>
                <div className="card">
                    {previewImage ? (
                    <img
                        src={previewImage}
                        width="50%"
                        height="50%"
                    />
                    ) : (
                    <h3  className="text-center">
                        {message ? message : "Live Preview"}
                    </h3>
                    )}
                </div>
            <Form onSubmit={handleSubmitFile}>
                <FormGroup>
                    <Input
                    type="file" capture accept="image/*"
                    name="image-file"
                    onChange={handleInput}
                    //the function to call when you have selected a file will be called here
                />
                <FormText color="muted">
                    Make sure the image being uploaded is a supported format
                </FormText>
                </FormGroup>
                <Button type="submit" color="primary">
                    Upload
                </Button>
            </Form>
        </>
    )
       
}

export default UploadPage
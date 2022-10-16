import { useState } from "react";
import React from 'react'
import './ImageRecognition.css'
import axios from "axios";

const ImageRecognition = () => {
    const [file, setFile] = useState();
    const [outText,setOutText]=useState("222222222222");
    const [loading,setLoading]=useState(false);
    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
        let formData = new FormData();
        formData.append("file", e.target.files[0]);
        setLoading(true);
        axios.post('http://127.0.0.1:8989/ocr/upload', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }).then((rsp)=>{
          console.log(rsp);
          setOutText(rsp.data);
          setLoading(false);
        })
    }
    return (
        <div className="imageRecognition-wrapper">
          <h2>Add Image:</h2>
          <div className="imageRecognition-source">
            <input type="file" onChange={handleChange} />
            <div style={{width:'582px',height:'400px'}}>
              <img  src={file} />
            </div>
          </div>
          <div className="imageRecognition-out">
            <label htmlFor="textOut">文字输出</label>
            <div>
              <textarea name="textOut" id="textOut" cols="80" rows="20" value={outText} readOnly />
            </div>
            </div>
            <div className="loading" style={{display:loading?'block':'none'}}></div>
        </div>
        
  
    );
}

export default ImageRecognition
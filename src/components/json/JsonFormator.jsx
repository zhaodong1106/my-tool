import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import './JsonFormator.css';


const JsonFormator = () => {
    const [mockJson,setMockJson]=useState({});    

    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    function handleChange(e){
        let text=e.target.value;
        if(text.length&&isJsonString(text)){
            setMockJson(JSON.parse(text));
        }
    }
    return (
        <div style={{marginTop: 15}} className="json-wrapper">
            <div className='json-wrapper-source'>
                <textarea placeholder="请输入JSON数据" onChange={handleChange} className="mockTextarea"></textarea>
                <span style={{fontSize: 12}}>左侧输入 下面显示</span>
            </div>
            <div  className="json-wrapper-out">
                <ReactJson src={mockJson} displayDataTypes={false}/>
            </div>
        </div>
    )
}

export default JsonFormator
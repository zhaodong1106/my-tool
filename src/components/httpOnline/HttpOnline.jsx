import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import "./HttpOnline.css";
import axios from "axios";
import ReactJson from "react-json-view";



const HttpOnline = () => {
  const [method, setMethod] = useState("get");
  const [url, setUrl] = useState("http://www.weather.com.cn/data/sk/101010100.html");
  const [headers, setHeaders] = useState([]);
  const [outText, setOutText] = useState({});
  const [json, setJson] = useState("");

  function handleEditorChange(value, event) {
    setJson(value)
  }

  function addHeader() {
    setHeaders([...headers, { name: "", value: "" }]);
  }
  function delHeader() {
    let copy = [...headers]; // makes sure you don't give the same reference to setTodos
    copy.pop();
    setHeaders(copy);
  }
  function sendReq(){
    if(url.length){
        console.log(json);
        console.log(url);
        console.log(method);
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8989/onlineHttp/sendReq',
            data: {
                url:url,
                method:method,
                json:json
            }
          }).then(rsp=>{
            console.log(rsp);
            setOutText(rsp.data);
          })
    }else{
        alert("url must not be empty!")
    }
    
  }
  return (
    <div className="httpOnline-container">
      <div className="httpOnline-wrapper">
        <div className="httpOnline-input">
          <div className="httpOnline-url">
            <div className="url-left">
                <select name="method" id="method" value={method} onChange={e=>setMethod(e.target.value)}>
                    <option value="get">get</option>
                    <option value="post">post</option>
                </select>
                <input type="text" name="url"  placeholder="请输入网址" value={url} onChange={e=>setUrl(e.target.value)}/>
                <button onClick={addHeader}>添加header</button>
                <button onClick={delHeader}>删除header</button>
            </div>
            <div className="url-right">
                <button onClick={sendReq}>发送请求</button>
            </div>
          </div>
          <div className="httpOnline-header">
            <ul>
              {headers.map((item, index) => {
                return (
                  <li>
                    <label htmlFor="name">Header:name</label>
                    <input type="text" id="name" />
                    <label style={{ marginLeft: "10px" }} htmlFor="name">
                      Header:value
                    </label>
                    <input type="text" id="value" />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="httpOnline-body">
            <Editor
              width={"100%"}
              height="500px"
              defaultLanguage="json"
              defaultValue="{}"
              onChange={handleEditorChange}
            />
          </div>
        </div>
        <div className="httpOnline-out">
          <h2>response:</h2>
          <ReactJson src={outText} displayDataTypes={false}/>
        </div>
      </div>
    </div>
  );
};

export default HttpOnline;

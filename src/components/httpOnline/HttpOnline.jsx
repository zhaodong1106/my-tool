import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import "./HttpOnline.css";
import axios from "axios";
import ReactJson from "react-json-view";
import Spinner from "../spinner/Spinner";

const HttpOnline = () => {
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [titleValid, setTitleValid] = useState(true);
  const [method, setMethod] = useState("get");
  const [url, setUrl] = useState(
    "http://www.weather.com.cn/data/sk/101010100.html"
  );
  const [headers, setHeaders] = useState([]);
  const [outText, setOutText] = useState("");
  const [outHeaderText, setOutHeaderText] = useState("");
  const [json, setJson] = useState("");
  const [outTab, setOutTab] = useState("body");

  const updateFieldChanged = (index) => (e) => {
    const newArr = headers.map((item, i) => {
      if (index === i) {
        return { ...item, [e.target.name]: e.target.value };
      } else {
        return item;
      }
    });
    setHeaders(newArr);
  };

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  function handleEditorChange(value, event) {
    setJson(value);
  }

  function addHeader() {
    setHeaders([...headers, { name: "", value: "" }]);
  }
  function delHeader() {
    let copy = [...headers]; // makes sure you don't give the same reference to setTodos
    copy.pop();
    setHeaders(copy);
  }
  function sendReq() {
    setOutTab("body");
    if (url.length) {
      console.log(json);
      console.log(url);
      console.log(method);
      axios({
        method: 'post',
        url: 'http://110.42.211.37:8989/onlineHttp/sendReq',
        data: {
          url: url,
          method: method,
          json: json,
          headers: headers,
        },
      }).then((rsp) => {
        console.log(rsp);
        setOutText(rsp.data.o.body);
        setOutHeaderText(rsp.data.o.header);
      });
    } else {
      alert("url must not be empty!");
    }
  }
  function saveHttp() {
    if (!title) {
      setTitleValid(false);
    } else {
      setTitleValid(true);
    }
    axios({
      method: 'post',
      url: 'http://110.42.211.37:8989/onlineHttp/saveReq',
      data: {
        id: id,
        url: url,
        title: title,
        method: method,
        json: isJsonString(json) ? JSON.stringify(JSON.parse(json)) : json,
        headers: headers,
      },
    }).then((rsp) => {
      console.log(rsp);
      queryAll();
    });
  }
  function delHttp() {
    axios({
      method: 'post',
      url: 'http://110.42.211.37:8989/onlineHttp/delReq?id='+id,
    }).then(rsp => {
      console.log(rsp);
      queryAll();
    });
  }

  function detail(id) {
    let one = data.find((item, index, data) => {
      return item.id == id;
    });
    if (one) {
      console.log(one);
      setId(one.id);
      setHeaders([...one.headers]);
      setTitle(one.title);
      setOutText("");
      setOutTab();
      setUrl(one.url);
      setMethod(one.method);
      setJson(one.json);
      setTimeout(() => {
        editorRef.current.getAction("editor.action.formatDocument").run();
      }, 300);
    }
  }

  const queryAll = () => {
    setLoading(true);
    axios({
      method: 'post',
      url: 'http://110.42.211.37:8989/onlineHttp/listReq',
      data: {
        url: url,
        method: method,
        json: json,
        headers: headers,
      },
    }).then((rsp) => {
      console.log(rsp);
      setData(rsp.data.o);
      setLoading(false);
    });
  };
  useEffect(() => {
    queryAll();
  }, []);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function newReq() {
    setId("");
    setHeaders([]);
    setTitle("");
    setOutText("");
    setOutTab("body");
    setUrl("");
    setMethod("get");
    setJson("");
  }

  return (
    <div className="httpOnline-container">
      <div className="httpOnline-left">
        <div className="online-api-list">
          <h2 style={{ marginBottom: "15px" }}>接口列表</h2>
          {loading ? (
            <Spinner />
          ) : (
            <ul>
              {data.map((item, index) => {
                return (
                  <li
                    key={item.id}
                    className="httpOnline-api-item"
                    onClick={(e) => detail(item.id)}
                  >
                    {item.title}
                  </li>
                );
              })}
            </ul>
          )}
          <div className="addApi" style={{ marginTop: "20px" }}>
            <button onClick={newReq} style={{ cursor: "pointer" }}>
              ADD API
            </button>
          </div>
        </div>

        <div className="httpOnline-wrapper">
          <div className="httpOnline-title">
            title：
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={saveHttp}>{!id ? "save" : "update"}</button>
            {id ? <button onClick={delHttp}>delete</button> : ""}
            <p
              className="errorMsg"
              style={{ display: titleValid ? "none" : "block" }}
            >
              title can not be empty!
            </p>
          </div>
          <div className="httpOnline-input">
            <div className="httpOnline-url">
              <div className="url-left">
                <select
                  name="method"
                  id="method"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="get">get</option>
                  <option value="post">post</option>
                </select>
                <input
                  type="text"
                  name="url"
                  placeholder="请输入网址"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
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
                    <li key={index} className="httpOnline-header-item">
                      {/* <div>{JSON.stringify(item)}</div> */}
                      <label htmlFor="name">Header:name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={item.name}
                        onChange={updateFieldChanged(index)}
                      />
                      <label style={{ marginLeft: "10px" }} htmlFor="name">
                        value
                      </label>
                      <input
                        type="text"
                        id="value"
                        width={"200"}
                        value={item.value}
                        name="value"
                        onChange={updateFieldChanged(index)}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="httpOnline-body">
            <Editor
              width={"100%"}
              height="800px"
              defaultLanguage="json"
              defaultValue="{}"
              value={json}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
            />
          </div>
        </div>
      </div>
      <div className="httpOnline-out">
        <div className="httpOnline-out-btns">
          <button onClick={(e) => setOutTab("body")}>response body</button>
          <button onClick={(e) => setOutTab("header")}>response header</button>
        </div>
        <div
          className={`httpOnline-out-element ${
            outTab == "body" ? "httpOnline-out-active" : ""
          }`}
          id="tab-1"
        >
          {isJsonString(outText) ? (
            <ReactJson src={JSON.parse(outText)} displayDataTypes={false} />
          ) : (
            outText
          )}
        </div>
        <div
          className={`httpOnline-out-element ${
            outTab == "header" ? "httpOnline-out-active" : ""
          }`}
          id="tab-2"
        >
          <h2>response header:</h2>
          {outHeaderText}
        </div>
      </div>
    </div>
  );
};

export default HttpOnline;

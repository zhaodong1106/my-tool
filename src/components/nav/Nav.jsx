import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = () => {
  return (
    <div className='navContainer'>
        <ul className='nav-wrapper'>
            <li className='nav-item'>
                <Link to={"/"}>图片识别</Link>
            </li>
            <li className='nav-item'>
                <Link to={"/captcha"}>验证码</Link>
            </li>
            <li className='nav-item'>
                 <Link to={"/IpQuery"}>ip查询地理位置</Link>
            </li>
            <li className='nav-item'>
                <Link to={"/json"}>JSON格式化</Link>
            </li>
            <li className='nav-item'>
                <Link to={"/httpOnline"}>Http Online</Link>
            </li>
            <li className='nav-item'>
                <Link to={"/httpOnline2"}>Http Online2</Link>
            </li>
        </ul>
    </div>
  )
}

export default Nav
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Nav from '../components/nav/Nav';

const BasicLayout = () => {
    const basicLayoutStyle={
        display:'flex',
        flexDirection:'column',
        height:'100vh'
    }
    return (
        
        <div style={basicLayoutStyle}>
          <Nav/>
          {/* Outlet相当于是子路由的占位符 */}
          <Outlet />
        </div>
      );
}

export default BasicLayout
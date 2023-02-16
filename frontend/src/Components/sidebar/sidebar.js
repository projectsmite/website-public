import React, { useState, useEffect } from "react";
import axios from 'axios'
import Smitelogo from '../../images/Smitelogo.png'
import redCircle from '../../images/red-circle.png'
import greenCircle from '../../images/green-circle.png'
import Userfront from "@userfront/react"
import './sidebar.css'
// CDBS templates, need npm install --save cdbdreact
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
// Call api for status of Smite device (ASYNC AWAIT Version)
  // const [fetchedData, setFetchedData] = useState([]);
  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await axios.get(
  //       "https://api-link"
  //     );
  //     setFetchedData(data);
  //   };
  //   getData();
  // }, []);
  // console.log("data: ", fetchedData);

  //Manual button Version
  // const api = axios.create({
  //   baseURL: "https://localhost:8081/connect/checkConnection" 
  // });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios.post('http://localhost:8081/connect/checkConnection').then((response) => {
      setStatus(response.data);
      console.log(response)
    })
    .catch((error)=>{
      console.log(error)
    })
  }, []);
  
 
  return (
    <div id='sidebar' style={{ position:'relative',float:'left', display: 'flex',height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar id="cdbside" textColor="#fff" backgroundColor="rgba(0,0,0,.5)">
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
            <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
              <a href='/'>
              <img
                src={Smitelogo}
                alt="Smite Logo"
                style={{ width: '100px' }}
              />
              </a>
            </div>
          </CDBSidebarHeader>

        <CDBSidebarContent  className="sidebar-content">
          <CDBSidebarMenu >
            <NavLink id='nav-link' exact to="/RFID-NFC" activeClassName="activeClicked">
              <CDBSidebarMenuItem  icon="fax">RFID/NFC</CDBSidebarMenuItem>
            </NavLink>
            <NavLink id='nav-link' exact to="/IR" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="thermometer">Infrared</CDBSidebarMenuItem>
            </NavLink>
            <NavLink id='nav-link' exact to="/Camera" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="camera">Camera</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  id='nav-link' exact to="/Videos" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="video">Videos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink id='nav-link' exact to="/Photos" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="image">Photos</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter  style={{ textAlign: 'center' }}>
          {/* <NavLink onClick={Userfront.logout} activeClassName="activeClicked" style={{ color:'white', textDecoration:'none'}}>
            Logout
          </NavLink> */}
          <a id='logout' activeClassName="activeClicked"  onClick={Userfront.logout} type='button'  href="#">
            <span />
            <span />
            <span />
            <span />
            Log out
          </a>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Smite Device
            {
              // If online then green else red
              status ==="connected" ? <img src={greenCircle} alt="Smite Logo" style={{margin:'5px', height:'30px', width: '30px' }} />: <img src={redCircle} alt="Smite Logo" style={{margin:'10px', height:'30px', width: '30px'  }}/>
            }
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
  
};



export default Sidebar;

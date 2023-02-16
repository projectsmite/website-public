import './IR/ir-card.css'
import Receive from './IR/receive'
import Transmit from './IR/transmit'
import React, { Component } from 'react';
import Sidebar from './sidebar/sidebar';


class Cards extends Component {
  render() {
    return (
      <>
      <Sidebar />
      <div id='content' className=' d-flex justify-content-center'>
        <div id='irPage' className='col'>
          <Receive />
          <Transmit />
        </div>
      </div>
      </>
    );
  }
}

export default Cards


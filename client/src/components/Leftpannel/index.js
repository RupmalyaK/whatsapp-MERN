import React from 'react';
//import log from '../../assets/img/log.svg';

const leftPanel = ({ click }) => {
  return (
    <div className='panel left-panel'>
      <div className='content'>
        <h3>New here ?</h3>
        {/* <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex
          ratione. Aliquid!
        </p> */}
        <button onClick={click} className='btn transparent' id='sign-up-btn'>
          Sign up
        </button>
      </div>
      <img /*src={log}*/ className='image' alt='' />
    </div>
  );
};

export default leftPanel;

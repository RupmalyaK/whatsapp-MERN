import React from 'react';
//import register from '../../assets/img/register.svg';

const rightPanel = ({ click }) => {
  return (
    <div className='panel right-panel'>
      <div className='content'>
        <h3>One of us ?</h3>
        {/* <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          laboriosam ad deleniti.
        </p> */}
        <button onClick={click} className='btn transparent' id='sign-in-btn'>
          Sign in
        </button>
      </div>
      <img /*src={register}*/ className='image' alt='' />
    </div>
  );
};

export default rightPanel;

import React from 'react';

const Signin = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className='sign-in-form'>
      <h2 className='title'>Sign in</h2>
      <div className='input-field'>
        <i className='fas fa-user'></i>
        <input name='email' type='email' placeholder='Email' />
      </div>
      <div className='input-field'>
        <i className='fas fa-lock'></i>
        <input type='password' name='password' placeholder='Password' />
      </div>
      <button type='submit' className='btn solid'>
        Sign In
      </button>
      
    </form>
  );
};

export default Signin;

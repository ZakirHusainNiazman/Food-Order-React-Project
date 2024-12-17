import React from 'react'

function Input({label,id,type='text',...props}) {
    return (
      <p className='control'>
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} name={id} {...props} required />
      </p>
    );
}

export default Input
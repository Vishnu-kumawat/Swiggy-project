import React from 'react'
import { useState } from 'react'

const User = (props) => {

  const [count] = useState(0);
  const [count2] = useState(1);
  return (
    <div className='user-card m-4 bg-gray-50 rounded-lg'>
      <h2> Count: { count} </h2>
      <h2> Count2: { count2} </h2>
      <h2>Name: {props.name}</h2>
      <h3>Locatin: Ambernath</h3>
      <h4>COntatc: @vishnu._0705</h4>
    </div>
  )
}

export default User

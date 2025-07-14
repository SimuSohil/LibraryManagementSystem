import React from 'react'
import { Link } from 'react-router'

export default function NavigationLibrarian() {
  return (
    <div className='navigation'>
        <Link to='/home'>Home</Link>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/issueBooks'>Issue Books</Link>
    </div>
  )
}

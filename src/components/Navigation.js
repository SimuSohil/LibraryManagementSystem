import { Link } from 'react-router'
import '../styles/Navigation.css'

export default function Navigation() {
  return (
    <div className='navigation'>
        <Link to='/home'>Home</Link>
        <Link to='/availBooks'>Available Books</Link>
        <Link to='/borrowedBooks'>Borrowed Books</Link>
    </div>
  )
}

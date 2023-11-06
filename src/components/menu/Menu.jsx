import './Menu.scss'
import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <div className='menu'>
      <div className="item">
        <span className='title'>MAIN</span>
        <Link to="/" className='listItem'>
        <img src="/home.svg" alt="" />
        <span className="listItemTitle">Homepage</span>
        </Link>
        <Link to="/" className='listItem'>
        <img src="/profile.svg" alt="" />
        <span className="listItemTitle">Profile</span>
        </Link>
      </div> 


      <div className="item">
        <span className='title'>LISTS</span>
        <Link to="/users" className='listItem'>
        <img src="/user.svg" alt="" />
        <span className="listItemTitle">Users</span>
        </Link>
        <Link to="/" className='listItem'>
        <img src="/profile.svg" alt="" />
        <span className="listItemTitle">Customers</span>
        </Link>
        <Link to="/products" className='listItem'>
        <img src="/product.svg" alt="" />
        <span className="listItemTitle">Products</span>
        </Link>
        <Link to="/" className='listItem'>
        <img src="/order.svg" alt="" />
        <span className="listItemTitle">Orders</span>
        </Link>
      </div>
    </div>
  )
}


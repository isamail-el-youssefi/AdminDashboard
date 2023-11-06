import './Footer.scss'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <div className='footer'>
      <span>storename</span>
      <span>&copy; {year} storename Admin Dashboard</span>
    </div>
  )
}


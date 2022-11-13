import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

class Header extends Component {

  onNavigateHome = () => {
    window.location.replace('/')
  }

  onLogout = () => {
    Cookies.remove('jwt_token')
    window.location.replace('/login')
  }

  render() {
    return (
      <nav className="nav-container">
        <img src="https://i.postimg.cc/HktS45qJ/academia-g008d41212-1280.png" alt="website logo" className="logo-style" onClick={this.onNavigateHome}/>
        <ul className="ul-container">
          <Link to="/"><li className="nav-item">Home</li></Link>
          <Link to="/jobs"><li className="nav-item">Jobs</li></Link>
          <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',width:'40%'}}>
            <Link to="/"><i class="fa-solid fa-house-chimney icons-img"></i></Link>
            <i class="fa-solid fa-right-from-bracket icons-img" onClick={this.onLogout}></i>
          </div>
        </ul>
        <div className="nav-items-container">
          <button type="button" className="btn-style" onClick={this.onLogout}>Logout</button>
        </div>
      </nav>
    )
  }
}

export default Header
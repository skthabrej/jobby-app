import { Component } from "react";
import './index.css'
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";


const cookieExit = Cookies.get('jwt_token') === undefined ? false : true

class NotFound extends Component {

    getNotFound = () => {
        return (
            <div className="notfound-container">
                <img src="https://i.postimg.cc/GtJvLT2g/error-ga156b8bc9-1280.png" alt="404-img" className="img"/>
                <h1 className="notfound-heading">Not Found!!</h1>
            </div>
        )
    }

    render() {
        return cookieExit ? this.getNotFound() : <Navigate to='/login'/>
    }
}
export default NotFound
import './index.css'
import { Component } from 'react'
import Header from '../Header'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const cookieExit = Cookies.get('jwt_token') === undefined ? false : true

class Home extends Component {

    getHome = () => {
        return(
            <div className='bg-container'>
                <>
                <Header/>
                <div className="home-content">
                    <h1 className="home-heading">Find The Job That Fits Your Life</h1>
                    <p className="home-description">
                    Millions of people are searching for jobs,salary,
                    information,company reviews.Find the job that fits your
                    abilities and potential
                    </p>
                    <Link to='/jobs'><button type="button" className="find-jobs-button" >Find Jobs</button></Link>
                </div>
                </>
            </div>
        )
    }

    render() {
        return cookieExit ? this.getHome() : <Navigate to='/login'/>
    }
}
export default Home

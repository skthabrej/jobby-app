import './index.css'
import { Component } from 'react'
import { Navigate } from 'react-router-dom'
import Header from '../Header'
import Cookies from 'js-cookie'

const cookieExit = Cookies.get('jwt_token') === undefined ? false : true

class Home extends Component {

    onGetJobs = () => {
        window.location.replace('/jobs')
    }

    getHome = () => {
        return(
            <div className='bg-container'>
                <>
                <Header/>
                <div className="home-content">
                    <h1 className="home-heading">Find The Job That <br/>Fits Your Life</h1>
                    <p className="home-description">
                    Millions of people are searching for jobs,salary,<br/>
                    information,company reviews.Find the job that fits your<br/>
                    abilities and potential
                    </p>
                    <button type="button" className="find-jobs-button" onClick={this.onGetJobs}>Find Jobs</button>
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

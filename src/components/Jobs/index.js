import './index.css'
import { Component } from 'react'
import { Navigate } from 'react-router-dom'
import Header from '../Header'
import Cookies from 'js-cookie'
import AllJobSection from '../AllJobSection'

const cookieExit = Cookies.get('jwt_token') === undefined ? false : true

class Jobs extends Component {

    getJob = () => {
        return(
            <>
            <Header/>
            <div className='product-sections'>
            <AllJobSection/>
            </div>
            </>
        )
    }

    render() {
        return cookieExit ? this.getJob() : <Navigate to='/login'/>
    }
}
export default Jobs
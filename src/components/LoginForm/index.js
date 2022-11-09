import './index.css'
import { Component } from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const cookieExit  = Cookies.get('jwt_token') === undefined ? false : true

class LoginForm extends Component {
    state = {
        username:'',
        password:'',
        showSubmitError: false,
        errorMessage:''
    }

    onSubmitSuccess = jwtToken => {
        Cookies.set('jwt_token',jwtToken,{expires:100})
        window.location.assign('/')
    }

    onSubmitFailure = errorMessage => {
        this.setState({showSubmitError:true,errorMessage})
    }

    submitForm = async event => {
        event.preventDefault()
        const {username,password} = this.state
        const userDetails = {username,password}
        const url = 'https://apis.ccbp.in/login'
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails)
        }
        const response = await fetch(url,options)
        const data = await response.json()
        console.log(data)
        if(response.ok === true) {
            this.onSubmitSuccess(data.jwt_token)
        } else {
            this.onSubmitFailure(data.errorMessage)
        }
    }

    onChangeUsername = event => {
        this.setState({username:event.target.value})
    }

    onChangePassword = event => {
        this.setState({password:event.target.value})
    }

    displayUsernameDetails = () => {
        const {username} = this.state
        return (
            <>
                <label className='label-element' htmlFor='username'>USERNAME</label>
                <input type='text' id='username' placeholder='Username' className='username-input-field' value={username} onChange={this.onChangeUsername}/>
            </>
        )
    }    

    displayPasswordDetails = () => {
        const {password} = this.state
        return (
            <>
                <label className='label-element' htmlFor='password'>PASSWORD</label>
                <input type='password' id='password' placeholder='Password' className='password-input-field' value={password} onChange={this.onChangePassword}/>
            </>
        )
    }    

    getLogin = () => {
        const {showSubmitError,errorMessage} = this.state
        return(
            <div className='bg-login-container'>
                <div className='login-container'>
                    <div className='login-form-container'>
                        <div className='logo-container'>
                            <img src='https://i.postimg.cc/1RbWKm8Z/academia-g008d41212-1280.png' alt='website logo' className='login-website-logo'/>
                            <p className='logo-name'>jo<span className='span-letter'>B</span>ee</p>
                        </div>
                        <form className='form-container' onSubmit={this.submitForm}>
                            <div className='input-container'>{this.displayUsernameDetails()}</div>
                            <div className='input-container'>{this.displayPasswordDetails()}</div>
                            <button className='login-button' type='submit'>Login</button>
                            {showSubmitError && (<p className='error-message'>*{errorMessage}</p>)}
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return cookieExit ? <Navigate to='/'/> : this.getLogin()
    }
}
export default LoginForm


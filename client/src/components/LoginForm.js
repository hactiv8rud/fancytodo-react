import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from '../config/axiosinstance.js';
import Swal from 'sweetalert2';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.goRegister = this.goRegister.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post('/login', this.state)
      .then(({ data }) => {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('fullName', data.fullName)
        this.props.setAuthenticated(true);
        Swal.fire(
          'Signed In!',
          'Welcome!',
          'success'
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  responseGoogle(response) {
    const googleToken = response.tokenId;
    axios
      .post('/googleLogin', { googleToken })
      .then(({ data }) => {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem("fullName", data.fullName);
        this.props.setAuthenticated(true);
        Swal.fire(
          'Signed In!',
          'Welcome!',
          'success'
        )
      })
      .catch((err) => {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      })
  }

  goRegister() {
    this.props.setPageName('register-page');
  }

  render() {
    return (
      <>
        <div id="login-page">
          <div className="register-login-content">
            <div className="login-image-container">
              <img src="/images/login-image.svg" alt="a cute stickman waving with one hand" width="200px" />
            </div>
              <div className="form-container">
                <div className="login-form-title">
                    <h1>Fancy ToDo</h1>
                </div>
                <form id="login-form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="login-email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="login-password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                  </div>
                  <div className="login-btn-container">
                    <button type="submit" className="btn mb-2" id="login-login-btn">Sign In</button>
                    <button type="button" onClick={this.goRegister} className="btn mt-2 mb-2" id="login-register-btn">Register</button>
                    <p style={{textAlign: "center", fontWeight: 500}}>or</p>
                    <GoogleLogin
                      clientId="861795519447-404of13uh7tln557o6o3cba2qs3dmse7.apps.googleusercontent.com"
                      render={renderProps => (
                        <button onClick={renderProps.onClick} className="google-btn" disabled={renderProps.disabled}>
                          <div className="d-flex justify-content-around">
                            <img src="/images/google-logo.svg" width="20" alt="google-logo" />
                            <div>Sign in with Google</div>
                          </div>
                          
                        </button>
                      )}
                      buttonText="Login"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                      cookiePolicy={'single_host_origin'}
                    />
                  </div>
                </form>
              </div>
          </div>
        </div>
      </>
    );
  }
}

export default LoginForm

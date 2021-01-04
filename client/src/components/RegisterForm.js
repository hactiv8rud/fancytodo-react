import React from 'react';
import axios from '../config/axiosinstance.js';
import Swal from 'sweetalert2';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goLogin = this.goLogin.bind(this);
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
      .post('/register', this.state)
      .then(({ data }) => {
        this.props.setPageName('login-page');
        Swal.fire(
          'Registered!',
          'Please sign in!',
          'success'
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  goLogin() {
    this.props.setPageName('login-page');
  }

  render() {
    return (
      <>
        <div id="register-page">
          <div className="register-login-content" id="register-content">
            <div className="register-image-container">
              <img src="/images/register-image.svg" alt="a cute stickman waving with two hands" width="250px" />
            </div>
            <div className="form-container">
              <div className="register-form-title">
                  <h1>Fancy ToDo</h1>
              </div>
              <form id="register-form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input type="text" className="form-control" id="register-first_name" placeholder="John"
                        name="first_name" value={this.state.first_name} onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" className="form-control" id="register-last_name" placeholder="Doe"
                        name="last_name" value={this.state.last_name} onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="register-email" placeholder="johndoe@mail.com"
                        name="email" value={this.state.email} onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="register-password"
                        placeholder="minimum 6 characters" name="password" value={this.state.password} onChange={this.handleInputChange} />
                </div>
                <div className="register-btn-container">
                  <button type="submit" className="btn mt-2" id="register-submit-btn">Register</button>
                  <button type="button" onClick={this.goLogin} className="btn mt-2" id="register-cancel-btn">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default RegisterForm;

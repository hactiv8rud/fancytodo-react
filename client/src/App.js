import React from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import NavBar from './components/NavBar';
import MainPage from './views/MainPage';

function App() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [pageName, setPageName] = React.useState('login-page');

  const loginPage = (
    <>
      <LoginForm setAuthenticated={setAuthenticated} setPageName={setPageName} />
    </>
  );

  const registerPage = (
    <>
      <RegisterForm setPageName={setPageName}/>
    </>
  );

  const navBar = (
    <>
      <NavBar setAuthenticated={setAuthenticated} setPageName={setPageName} />
    </>
  );

  // const alert = (
  //   <>
  //     <h2>alert</h2>
  //   </>
  // );

  const mainPage = (
    <>
      <MainPage />
    </>
  );

  React.useEffect(() => (localStorage.access_token ? setAuthenticated(true) : setAuthenticated(false)), [])
    
  React.useEffect(() => {
    authenticated ? setPageName('main-page') : setPageName('login-page')
  }, [authenticated])

  return (
    <>
      {pageName === 'main-page' && navBar}
      {/* {error && alert} */}
      <div className="body-container ml-4 mr-4">
        {pageName === 'login-page' && loginPage} 
        {pageName === 'register-page' && registerPage} 
        {pageName === 'main-page' && mainPage}
      </div>
    </>
  );
}

export default App;

import React from 'react';
import Swal from 'sweetalert2';

function NavBar(props) {
  function logout() {
    localStorage.clear();
    props.setAuthenticated(false);
    console.log('user signed out');
    Swal.fire(
      'Signed Out!',
      'See you soon!',
      'success'
    )
  }

  function goMainPage() {
    props.setPageName('main-page');
  }

  return(
    <>
      <nav className="navbar navbar-light bg-light" id="navbar">
        <button type="button" onClick={goMainPage} className="navbar-brand rounded">
            <img src="/images/navbar-logo.svg" width="30" height="30" className="d-inline-block align-top" alt="fancytodo logo"
                loading="lazy" />
            Fancy ToDo
        </button>
        <button onClick={goMainPage} type="button" className="btn btn-light" id="nav-home">Home</button>
        <button onClick={logout} type="button" className="btn btn-light ml-auto" id="btn-logout">Sign Out</button>
      </nav>
    </>
  );
}

export default NavBar;

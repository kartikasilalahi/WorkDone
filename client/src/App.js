import React, { useEffect, useState } from 'react'
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

// import { BrowserRouter, Route, Switch } from 'react-router-dom'

import User from './protectroute/user'
import Admin from './protectroute/admin'
import Auth from './protectroute/auth'
import Home from './pages/landingpage/Home'
import Protectroute from './helper/protectRoute'

function App() {
  let isLoggedIn = localStorage.getItem('isLogin')
  let role = localStorage.getItem('role')

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);


  return (
    <div className="App">
      <Router >
        {
          isLoggedIn === null && (path === '/auth/login' || path === "/auth/register") ? <Protectroute path="/auth" component={Auth} />
            :
            isLoggedIn === null && role === null  ? <Protectroute path="/" component={Home} />
              : isLoggedIn && role === "admin" ? <Protectroute path="/admin" component={Admin} />
                : <Protectroute path="/user" component={User} />}

        {isLoggedIn && role == "admin" && (path === "/" || path === "/auth/login" || path === "/auth/register") && (<Redirect to="/admin/dashboard" />)}
        {isLoggedIn && role == "user" && (path === "/" || path === "/auth/login" || path === "/auth/register") && (<Redirect to="/user/dashboard" />)}
      </Router>
    </div>
  );
}

export default App;

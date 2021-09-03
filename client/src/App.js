import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Pages/Landingpage/Home'
import Dashboard from './Pages/Landingpage/Dashboard'
import Login from './Pages/Landingpage/Login'
import Register from './Pages/Landingpage/Register'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/login' component={Login} exact />
          <Route path='/register' component={Register} exact />
          {/* <Route path='/dashboard' component={Dashboard} exact />*/}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

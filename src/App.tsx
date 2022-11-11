import React, { useEffect } from 'react';
import './App.css';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { getUser } from './services/conduit';
import User from './interfaces/user';
import { userAction} from './redux/user/slice';
import { useAppDispatch } from './redux/hooks';

const getToken = async (): Promise<void> => {
  const token = localStorage.getItem('token')
  const dispatch = useAppDispatch()
  if (token !== null) {
    dispatch(userAction.setUser(await getUser(token)))
  }
}

function App(): JSX.Element {
  useEffect(() => {
    getToken()
  }, [])
  return (
    <div className="App">
      <nav>
        <div className="w-[70%] py-2 flex m-auto justify-between">
          <div>
            <Link to="/">conduit</Link>
          </div>
          <div className="flex justify-evenly columns-3 gap-3">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/signin">Sign in</NavLink>
            <NavLink to="/signup">Sign up</NavLink>
          </div>
        </div>
      </nav>
      <div className="h-[100px] bg-[#98c293]"></div>
      <div className="my-[30px]"></div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

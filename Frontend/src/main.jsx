import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import store from './Store.js'
import {Provider} from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App.jsx';
import HomeScreen from './Screens/HomeScreen.jsx';
import LoginScreen from './Screens/LoginScreen.jsx';
import Register from './Screens/Register.jsx';
import PofileScreen from './Screens/PofileScreen.jsx'; './Screens/PofileScreen'
import PrivateRoute from './Components/PrivateRoute.jsx';


const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index={true} path='/' element={<HomeScreen />} />
    <Route path='/login' element={<LoginScreen />} />
    <Route path='/register' element={<Register/>}/>
    <Route path='' element={<PrivateRoute/>}>
      <Route path='/profile' element={<PofileScreen/>}/>
    </Route>
  </Route>
);

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </Provider>
);

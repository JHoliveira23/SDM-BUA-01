import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserForm from "./components/UserForm"
import UserList from './components/UserList';
import OrderList from './components/OrderList';
function App() {
  return (
    <div className="App">
      <h1>Microsservices MongoDB React</h1>
      <UserForm/>
      <UserList/>
      <OrderList/>
    </div>
  );
}

export default App;

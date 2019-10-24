import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [user , setUser] = useState({username: '' , password: ''})


  const handleChange = (e) => {
    setUser({...user, [e.target.name] : e.target.value})
  }

  console.log(user)

  return (
    <div className="App">
        <form>
          <label>
            username:
            <input 
              name='username'
              type='text'
              placeholder='username'
              value={user.username}
              onChange={handleChange}
            />
          </label>
          <label>
            password:
            <input 
              name='password'
              type='password'
              placeholder='password'
              value={user.password}
              onChange={handleChange}
            />
          </label>
          <button>register</button>
          <span> or </span>
          <button>login</button>
        </form>
    </div>
  );
}

export default App;

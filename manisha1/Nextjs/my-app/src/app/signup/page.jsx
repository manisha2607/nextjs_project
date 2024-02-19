'use client'
import axios from "axios";
import Layout from "../component/layout";
import Link from "next/link";
import { useState } from "react";

export default function Page() {

  const [username, setUsername] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (username.length < 3) {
      setNameError('Name should be at least 3 characters');
      return;
    }
    setNameError('')

    if (password.length < 8) {
      setPasswordError('Password should be at least 8 characters');
      return;
    }
    
    try {
      let res = await axios.post(`http://localhost:8080/api/user/create`, {
        username,
        email,
        password
      })
      if (res.data.success) {
        console.log(res.data);
        window.location.href = '/login';
      } else {
        console.log("Error in signup");
      }
    } catch (error) {
      console.log("Error occur during signup !", error)
    }
  }
  return (
    <main pageTitle="Signup">
      <div className="display">
      <div className="main">  	
  <input type="checkbox" id="chk" aria-hidden="true" />
  <div className="signup">
    <form onSubmit={handleSubmit} >
      <label htmlFor="chk" aria-hidden="true">Sign up</label>
      <input type="text" name="txt" placeholder="User name" required onChange={(e) => setUsername(e.target.value)}/>
       {nameError && <div className="alert space">{nameError}</div>}
      <input type="email" name="email" placeholder="Email" required onChange={(e) => setemail(e.target.value)}/>
      <input type="password" name="pswd" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
      {passwordError && <div className="alert space">{passwordError}</div>}
      <button>Sign up</button>
      <br/>
      <p className="space"> Already have Account 
        <Link href='login' className="link">Login</Link>
      </p>
    </form>
  </div>
  </div>
  </div>

    </main>
  )
}


"use client";
import axios from "axios";
import Layout from "../component/layout";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post(`http://localhost:8080/api/user/login`, {
        email,
        password
      })
      if (res.data.success) {
        console.log(res.data);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        window.location.href = "/";
      } else {
        console.log("Error in login");
      }
    } catch (error) {
      console.log("Error occur during login !", error)
    }
  }

  return (
    <main pageTitle="Login">
<div className="display">
 <div className="main">  	
  <input type="checkbox" id="chk" aria-hidden="true" />
  <div className="signup">
    <form onSubmit={handleSubmit}>
      <label htmlFor="chk" aria-hidden="true">Login</label>
      <input type="email" name="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" name="pswd" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
      
      <button>Login</button>
      <br/>
      <p className="space">Dont't have Account   
        <Link href='signup'className="link">Signup</Link>
      </p>
    </form>
  </div>
  </div>
  </div>
    </main>
    
  )

}


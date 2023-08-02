import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { options } from "../App";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginuser = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if(data.msg){
      toast.error(data.msg, options);
    }else{
      //remove any existing tokens
      localStorage.removeItem("user");

      //put new token
      localStorage.setItem("user", JSON.stringify(data))

      //redirect them to the home page
      navigate("/home")
    }
  };
  return (
    <div className="text-lightBlack font-poppins ">
      <Navbar/>
      <form className="mx-auto flex flex-col items-center justify-center mt-5 space-y-3 w-full sm:w-7/12 xl:w-5/12 px-5" onSubmit={loginuser}>
        <h1 className="capitalize text-2xl font-extrabold">sign in</h1>
        <span className="text-sm">
          This information will be used to identify you.
        </span>
        
        <div className="w-full flex flex-col items-start">
          <label htmlFor="email" className="capitalize text-sm">
            email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
            className="border border-gray-300 p-2 rounded w-full placeholder:text-gray-400 placeholder:text-sm text-gray-900"
            value={email}
            onChange={e=> setEmail(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col items-start">
          <label htmlFor="password" className="capitalize text-sm">
            password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="somethingcomplex"
            className="border border-gray-300 p-2 rounded w-full placeholder:text-gray-400 placeholder:text-sm text-gray-900"
            value={password}
            onChange={e=> setPassword(e.target.value)}
          />
        </div>

        <button className="p-2 rounded bg-violet-700 hover:bg-violet-800 text-white outline-none">Login Account</button>

        <Link to="/" className="text-sm cool">Don't have an account</Link>
      </form>

      
    </div>
  );
};

export default Login;

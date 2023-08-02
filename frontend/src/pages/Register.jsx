import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { options } from "../App"
import Navbar from "../components/Navbar";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const registerUser = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/user/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if(data.msg){
      toast.error(data.msg, options);
    }else{
      navigate("/login")
    }
  };
  return (
    <div className="text-lightBlack font-poppins">
      <Navbar />
      <form
        className="w-full sm:w-7/12 xl:w-5/12 mx-auto flex flex-col items-center justify-center mt-5 space-y-3 px-5"
        onSubmit={registerUser}
      >
        <h1 className="capitalize text-2xl font-extrabold">sign up</h1>
        <span className="text-sm">
          This information will be used to identify you.
        </span>
        <div className="w-full flex flex-col items-start">
          <label htmlFor="name" className="capitalize text-sm">
            name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="john doe"
            className="border border-gray-300 p-2 rounded w-full placeholder:text-gray-400 placeholder:text-sm  text-gray-900"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="p-2 rounded bg-violet-700 hover:bg-violet-800 text-white outline-none">
          Create Account
        </button>

        <Link to="/login" className="text-sm cool">
          Already have an account
        </Link>
      </form>
    </div>
  );
};

export default Register;

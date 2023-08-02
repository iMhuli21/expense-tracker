import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import { updateContext } from "./context/contex";
import { useState } from "react";

export const options = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const App = () => {
  const [update, setUpdate] = useState(false);

  return (
    <updateContext.Provider value={[update, setUpdate]}>
      <div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <ToastContainer />
      </div>
    </updateContext.Provider>
  );
};

export default App;

import { useState } from "react";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Shared/NavBar";
import ProtectedLayout from "./Components/Layouts/ProtectedLayout";
import Home from "./Pages/Dashboard/Home";
import AddMemories from "./Pages/Memories/AddMemories";
import EditMemories from "./Pages/Memories/EditMemories";
import Profile from "./Pages/Profile/Profile";
import Shimmer from "./Components/Loaders/Shimmer";
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Shimmer />} />

        <Route element={<ProtectedLayout/>}>
            <Route path="/home" element={<Home/>}/>
            <Route path="/memory" element={<AddMemories/>}/>
            <Route path="/memory/:id" element={<EditMemories/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

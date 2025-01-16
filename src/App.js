import Classement from "./Classement";
import Home from "./Home";
import Info from "./Info";
import Login from "./Login";
import { Route,Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Info" element={<Info/>} />
        <Route path="/Classement" element={<Classement/>} />
      </Routes>
    </div>
  );
};

export default App;

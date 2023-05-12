import { Routes, Route} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home";
import Venues from "./Pages/Venues";
import Venue from "./Pages/Venues/Venue";
import Register from "./Components/Auth/Register/Register";
import Login from "./Components/Auth/Login/Login";

function RouteNotFound() {
  return <div>Page not found</div>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="venues" element={<Venues />} />
        <Route path="venues/:id" element={<Venue />} />
        <Route path="signup" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<RouteNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;


import { Routes, Route} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home";
import Venues from "./Pages/Venues";
import Venue from "./Pages/Venues/Venue";
import Register from "./Components/Auth/Register/Register";
import Login from "./Components/Auth/Login/Login";
import ProfilePage from "./Pages/Profile";
import VenueCreatePage from "./Pages/Venues/Create";
import VenueEditPage from "./Pages/Venues/Edit";
import ProfileOther from "./Components/Profile/OtherProfile/OtherProfile";


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
        <Route path="venues/create" element={<VenueCreatePage />} />
        <Route path="venues/edit/:id" element={<VenueEditPage />} />
        <Route path="signup" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/:profileName" element={<ProfileOther />} />
        <Route path="*" element={<RouteNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;


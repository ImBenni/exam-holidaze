import { Routes, Route} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home";
import Venues from "./Pages/Venues";
import VenuePage from "./Pages/VenuePage";

function RouteNotFound() {
  return <div>Page not found</div>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="venues" element={<Venues />} />
        <Route path="venues/:id" element={<VenuePage />} />
        <Route path="*" element={<RouteNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;


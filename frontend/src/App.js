import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// pages
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Redirect from "./pages/Redirect";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/r/:url" element={<Redirect />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

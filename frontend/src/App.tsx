import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/home";
import Layout from "./components/layout";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;

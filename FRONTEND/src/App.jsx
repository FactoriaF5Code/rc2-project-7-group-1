import "./App.css";
import { ResourceList } from "./components/ResourceList/ResourceList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { ResourcesContextProvider } from "./components/Context/ResourcesContext";

function App() {
  return (
    <BrowserRouter>
      <ResourcesContextProvider>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/edit/:id" element={<Header />} />
        </Routes>
        <ResourceList />
      </ResourcesContextProvider>
    </BrowserRouter>
  );
}

export default App;

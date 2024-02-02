import "./App.css";
import { FormAddItem } from "./components/FormAddItem/FormAddItem";
import { Logo } from "./components/Logo/Logo";
import { ResourceList } from "./components/ResourceList/ResourceList";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [needsReload, setNeedsReload] = useState(true);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <header>
              <Logo />
              <FormAddItem setNeedsReload={setNeedsReload} />
              <ResourceList
                setNeedsReload={setNeedsReload}
                needsReload={needsReload}
              />
            </header>
          }
        />
        <Route path="/edit/:id" element={<FormAddItem setNeedsReload={setNeedsReload} />} />
      </Routes>
    </Router>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./ResourceList.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import ModeIcon from "@mui/icons-material/Mode";
import { Link } from "react-router-dom";
import { useResourcesContext } from "../Context/ResourcesContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F29f05",
    },
    secondary: {
      main: "#012e40",
      light: "#024959",
      contrastText: "#f2f2eb",
    },
  },
});

export const ResourceList = () => {
  const { needsReload, setNeedsReload, handleOpen } = useResourcesContext();

  const [items, setItems] = useState([]);
  const URL = "http://localhost:9000/items";

  useEffect(() => {
    if (needsReload) {
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          setItems(data);
          setNeedsReload(false);
        });
    }
  }, [needsReload]);

  const handleDeleteItem = (id) => {
    fetch(`${URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setNeedsReload(true);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <main className="containerList">
      {items.map((item) => (
        <section className="elementList" key={item.id}>
          <h3 className="titleElement">{item.title}</h3>
          <article className="elementContainer">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <h4 className="element">{item.url}</h4>
            </a>
            <div className="buttonContainer">
              <Link to={`/edit/${item.id}`}>
                <button className="editButton" onClick={handleOpen}>
                  <ThemeProvider theme={theme}>
                    <ModeIcon sx={{ color: "secondary.main", fontSize: 50 }} />
                  </ThemeProvider>
                </button>
              </Link>
              <button
                className="deleteButton"
                onClick={() => handleDeleteItem(item.id)}
              >
                <ThemeProvider theme={theme}>
                  <DeleteForeverIcon
                    sx={{ color: "secondary.main", fontSize: 50 }}
                  />
                </ThemeProvider>
              </button>
            </div>
          </article>
        </section>
      ))}
    </main>
  );
};

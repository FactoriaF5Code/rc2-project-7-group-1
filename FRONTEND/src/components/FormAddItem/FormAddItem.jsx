/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./FormAddItem.css";
import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";

export const FormAddItem = ({ setNeedsReload }) => {
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemUrl, setNewItemUrl] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const URL = "http://localhost:9000/items";

  useEffect(()=>{
    if(id) {
      fetch(`${URL}/${id}`)
      .then((response)=>response.json())
      .then((data)=>{
        setNewItemTitle(data.title || "");
        setNewItemUrl(data.url || "")
      })
      .catch((error)=> console.error('Error fetching item data', error))
    }
  }, [id]);

  const postItem = (e) => {
    e.preventDefault();

    const options = {
      method: id ? "PUT": "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newItemTitle, url: newItemUrl }),
    };
    fetch(id ? `${URL}/${id}` : URL, options).then((response) => {
      if (response.ok) {
        setNewItemTitle("");
        setNewItemUrl("");
        setNeedsReload(true);

        navigate("/");
        console.log("Item saved sucessfully.");
      }
    });
  };

  return (
      <form onSubmit={postItem} className="formContainer">
        <div  className="inputContainer">
          <input
            className="formInput"
            name="title"
            type="text"
            value={newItemTitle}
            onChange={(e) => setNewItemTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            className="formInput"
            name="url"
            type="text"
            value={newItemUrl}
            onChange={(e) => setNewItemUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </div>
        <div className="buttonAddContainer">
          <button className="buttonAddText">
            {id ? "Actualizar" : "Añadir"}
            <input
              disabled={newItemTitle === ""}
              type="submit"
              value={id ? "S": "+"}
              className="buttonAdd"
            />
          </button>
        </div>
      </form>
  );
};

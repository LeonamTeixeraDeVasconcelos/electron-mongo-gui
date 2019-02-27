import React, { useState, useEffect } from "react";
import filesize from "filesize";

import { FaDatabase } from "react-icons/fa";
import { MdChevronRight } from "react-icons/md";

import { Container, Header, DatabaseList } from "./styles";

const { ipcRenderer } = window.require("electron");

function Sidebar() {
  const [databases, setDatabases] = useState([]);
  const [connection, setConnection] = useState("");
  const [error, setError] = useState(false);

  function handleListSuccess(e, data) {
    return setDatabases(
      data.map(database => ({
        ...database,
        readableSize: filesize(database.sizeOnDisk)
      }))
    );
  }

  function handleListFailure() {
    return setError(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    ipcRenderer.send("@databases/LIST_REQUEST", connection);
  }

  function handleSetDatabase(database) {
    ipcRenderer.send("@collections/LIST_REQUEST", database);
  }

  useEffect(() => {
    ipcRenderer.on("@databases/LIST_SUCCESS", handleListSuccess);
    ipcRenderer.on("@databases/LIST_FAILURE", handleListFailure);

    return () => {
      ipcRenderer.removeListener("@databases/LIST_SUCCESS", handleListSuccess);
      ipcRenderer.removeListener("@databases/LIST_FAILURE", handleListFailure);
    };
  }, []);

  return (
    <Container>
      <Header onSubmit={handleSubmit}>
        <input
          onChange={e => setConnection(e.target.value)}
          value={connection}
          placeholder="URL de conexão"
        />
        <button type="submit">
          <FaDatabase size={14} color="#fff" />
        </button>
      </Header>

      <DatabaseList>
        {databases.map(db => (
          <li key={db.name}>
            <button onClick={() => handleSetDatabase(db.name)}>
              {db.name}
            </button>
            <span>{db.readableSize}</span>
          </li>
        ))}
      </DatabaseList>
    </Container>
  );
}

export default Sidebar;

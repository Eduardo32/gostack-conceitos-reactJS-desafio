import React, { useState, useEffect }from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo repositorio ${Date.now()}`,
      url: `http://localhost:3333/repository${Date.now()}`,
      techs: ['Tech1', 'Tech2', 'Tech3']
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const { status } = await api.delete(`/repositories/${id}`);

    if(status === 204) {
      const newRepositories = [...repositories];
      const repositoryIndex = repositories.findIndex(repository => repository.id === id);

      newRepositories.splice(repositoryIndex, 1);

      setRepositories(newRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

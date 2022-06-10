import { useEffect, useState } from "react";

type Respo = {
  id: number;
  name: string;
  favorite?: boolean;
};

function App() {
  const [repositories, setRepositories] = useState<Respo[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/users/MatheusFellipi/repos").then((res) => {
      res.json().then((res) => {
        setRepositories(res);
      });
    });
  }, []);

  useEffect(() => {
    const filtetred = repositories.filter((repo) => repo.favorite);
    document.title = `Vote tem ${filtetred.length} favoritos`;
  }, [repositories]);

  function handleFAvorite(id: number) {
    const newRepos = repositories.map((repo) => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });

    setRepositories(newRepos);
  }

  return (
    <div>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span> favorito</span>}
            <button onClick={() => handleFAvorite(repo.id)}>Favoritar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

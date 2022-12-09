import "./App.css";
import "./responsive.css";
import { useState } from "react";
import axios from "axios";

type GITHUBResponse = {
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: string;
  html_url: string;
  languages_url: string;
};
function App() {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("Aguardando usuário...");
  const [bio, setBio] = useState("Aguardando usuário...");
  const [avatarURL, setAvatarURL] = useState(
    "https://icongr.am/material/face.svg?size=128&color=ffffff"
  );
  const [repo, setRepo] = useState("Aguardando usuário...");
  const [link, setLink] = useState("Aguardando usuário...");

  const handleSearch = () => {
    axios
      .get<GITHUBResponse>(`https://api.github.com/users/${search}`)
      .then((res) => {
        setName(res.data.name);
        setBio(res.data.bio);
        setAvatarURL(res.data.avatar_url);
        setRepo(res.data.public_repos);
        setLink(res.data.html_url);
      })
      .catch((res) => {
        alert("Usuário não encontrado")
      });
  };
  return (
    <div className="container-app">
      <div className="container">
        <header className="header-top">
          <h1>Buscador de Perfis no GitHub</h1>
        </header>

        <main>
          <div className="form">
            <h1>Insira o usuário desejado</h1>
            <input
              type="text"
              placeholder="Digite um username"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>
          </div>
          <div className="content">
            <div>
              <img src={avatarURL} alt="Profile" />
              <h1>{name}</h1>
              <p>{`${bio == null ? "Usuário sem bio 😞" : bio}`}</p>
              <p>
                Repositórios criados: {repo}{" "}
                <a href={`${link == "Aguardando usuário..." ? "#" : link}`}>
                  <br />
                  Clique aqui para acessar o perfil{" "}
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

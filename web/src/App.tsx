import "./styles/main.css";
import { useState, useEffect } from "react";

import logoImg from "./assets/logo.svg";

import { GameBanner } from "./components/GameBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import { CreateNewAdBanner } from "./components/CreateNewAdBanner";

import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";

interface Games {
  bannerUrl: string;
  id: string;
  title: string;
  _count: {
    Ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Games[]>([]);

  useEffect(() => {
    axios("http://localhost:5500/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="max-w-[1440px] flex flex-col items-center my-20 mx-auto ">
      <img src={logoImg} />

      <h1 className="text-6xl font-black text-white mt-20">
        Seu <span className="bg-text-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.Ads}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateNewAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;

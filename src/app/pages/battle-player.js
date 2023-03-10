import { useState } from "react";

import { Instructions, Players } from "@/components";

export default function BattlePlayer() {
  const [players, setPlayers] = useState({});
  return (
    <>
      <Instructions players={players} />
      <Players onChange={(newPlayers) => setPlayers(newPlayers)} />
    </>
  );
}

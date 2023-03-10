import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button, Panel, Panels } from "@/components";

import styles from "./battle-result.module.scss";
import { userService } from "./user.service";

// https://api.github.com/users/maroon1

export default function BattleResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const player1 = searchParams.get("player1");
  const player2 = searchParams.get("player2");

  const [player1Info, setPlayer1Info] = useState();
  const [player2Info, setPlayer2Info] = useState();

  const ready = !!player1Info && !!player2Info;

  useEffect(() => {
    if (!player1 || !player2) {
      navigate("/battle");
    }
  }, [player1, player2]);

  useEffect(() => {
    Promise.all([
      userService.getUser(player1),
      userService.getUser(player2),
    ]).then(([newPlayer1Info, newPlayer2Info]) => {
      let winner = "player1";

      if (newPlayer1Info.public_repos < newPlayer2Info.public_repos) {
        winner = "player2";
      }

      setPlayer1Info({ ...newPlayer1Info, win: winner === "player1" });
      setPlayer2Info({ ...newPlayer2Info, win: winner === "player2" });
    });
  }, [player1, player2]);

  return (
    ready && (
      <div className={styles["battle-result"]}>
        <Panels>
          <Panel player={player1Info} />
          <Panel player={player2Info} />
        </Panels>
        <Button
          onClick={() => {
            navigate("/battle");
          }}
        >
          RESET
        </Button>
      </div>
    )
  );
}

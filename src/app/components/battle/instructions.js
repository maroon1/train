import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import { Icon } from "../icon";
import styles from "./instructions.module.scss";

export function Instructions(props) {
  const navigate = useNavigate();

  const ready = !!props.players;

  return (
    <div className={styles.instructions}>
      <div className={styles["instructions-title"]}>Instructions</div>
      <div className={styles["instruction-item-container"]}>
        <InstructionItem icon={<Icon size={64} color="orange" name="users" />}>
          Enter tow Github
        </InstructionItem>
        <InstructionItem
          active={ready}
          icon={
            <Icon
              size={64}
              color={props.players ? "red" : "gray"}
              name="jet-fighter"
            />
          }
          onClick={() => {
            if (!ready) {
              return;
            }

            const [player1, player2] = props.players ?? [];

            navigate(`/battle/result?player1=${player1}&player2=${player2}`);
          }}
        >
          Battle
        </InstructionItem>
        <InstructionItem icon={<Icon size={64} color="yellow" name="trophy" />}>
          See the winner
        </InstructionItem>
      </div>
    </div>
  );
}

export function InstructionItem(props) {
  return (
    <div
      className={clsx(styles["instruction-item-wrapper"], {
        [styles["instruction-item-active"]]: props.active,
      })}
      onClick={props.onClick}
    >
      <div className={styles["instruction-item-title"]}>{props.children}</div>
      <div className={styles["instruction-item-icon"]}>{props.icon}</div>
    </div>
  );
}

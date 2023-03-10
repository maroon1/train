import { DetailItem, DetailList } from "../details";
import { Icon } from "../icon";
import styles from "./panel.module.scss";

export function Panels(props) {
  return <div className={styles.panels}>{props.children}</div>;
}

export function Panel({ player }) {
  return (
    <div className={styles.panel}>
      <div className={styles.title}>{player.win ? "Winner" : "Loser"}</div>
      <div className={styles.avatar}>
        <img src={player.avatar_url} alt="" />
      </div>
      <div className={styles.score}>Scores: {player.public_repos}</div>
      <div className={styles.username}>
        <a href={player.html_url}>{player.name || "Unknown"}</a>
      </div>
      <DetailList>
        <DetailItem icon={<Icon name="location-dot" />}>
          {player.location || "Unknown"}
        </DetailItem>
        <DetailItem icon={<Icon name="users" />}>{player.followers}</DetailItem>
        <DetailItem icon={<Icon name="user-plus" />}>
          {player.following}
        </DetailItem>
        <DetailItem icon={<Icon name="code" />}>
          {player.public_repos}
        </DetailItem>
      </DetailList>
    </div>
  );
}

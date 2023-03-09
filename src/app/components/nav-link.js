import clsx from "clsx";
import { Link } from "react-router-dom";

import { Icon } from "./icon";
import styles from "./nav-link.module.scss";

export function BattleLink(props) {
  return (
    <Link
      className={clsx(styles["nav-link"], styles["battle-link"])}
      {...props}
    >
      <span className={styles["nav-link-text"]}>Battle</span>
      <Icon color="white" name="arrow-right" />
    </Link>
  );
}

export function PopularLink(props) {
  return (
    <Link
      className={clsx(styles["nav-link"], styles["popular-link"])}
      {...props}
    >
      <Icon color="white" name="arrow-left" />
      <span className={styles["nav-link-text"]}>Popular</span>
    </Link>
  );
}

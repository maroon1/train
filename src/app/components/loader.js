import { Icon } from "./icon";

import styles from "./loader.module.scss";

export function Loader(props) {
  return (
    <div className={styles.loader}>
      <Icon name="spinner" className="fa-spin-pulse" />
      <div className={styles["loader-message"]}>
        {props.message || "加载中..."}
      </div>
    </div>
  );
}

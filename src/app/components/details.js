import styles from "./details.module.scss";

export function DetailList(props) {
  return <dl className={styles["detail-list"]}>{props.children}</dl>;
}

export function DetailItem(props) {
  return (
    <div className={styles["detail-item-wrapper"]}>
      <dt>{props.icon}</dt>
      <dd
        className={styles["detail-data"]}
        style={{
          fontWeight: props.emphasis ? "bold" : "normal",
        }}
      >
        {props.children}
      </dd>
    </div>
  );
}

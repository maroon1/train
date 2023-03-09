import styles from "./grid.module.scss";

export function Grid(props) {
  return <div className={styles.grid}>{props.children}</div>;
}

export function Col(props) {
  return (
    <div className={styles.col} style={{ width: props.width }}>
      {props.children}
    </div>
  );
}

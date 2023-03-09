import styles from "./center.module.scss";

export function Center(props) {
  return (
    <div className={styles.center} style={props.style}>
      {props.children}
    </div>
  );
}

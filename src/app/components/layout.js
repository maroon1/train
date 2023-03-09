import styles from "./layout.module.scss";

export function Layout(props) {
  return <div className={styles.layout}>{props.children}</div>;
}

export function Header(props) {
  return <div className={styles.header}>{props.children}</div>;
}

export function Content(props) {
  return <div className={styles.content}>{props.children}</div>;
}

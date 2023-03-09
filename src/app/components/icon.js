import styles from "./icon.module.scss";

export function FontAwesomeIcon(props) {
  const size = props.size || 16;

  return (
    <div
      className={styles.icon}
      style={{
        width: size,
        height: size,
        color: props.color,
        fontSize: size,
      }}
    >
      <i className={`fa-solid fa-${props.name} ${props.className}`} />
    </div>
  );
}

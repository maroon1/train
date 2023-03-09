import styles from "./button.module.scss";
import { FontAwesomeIcon } from "./icon";

export function Button(props) {
  const { loading, ...restProps } = props;

  return (
    <button type="button" className={styles.button} {...restProps}>
      {props.loading && (
        <div style={{ marginRight: 8 }}>
          <FontAwesomeIcon name="spinner" className="fa-spin-pulse" />
        </div>
      )}
      {props.children}
    </button>
  );
}

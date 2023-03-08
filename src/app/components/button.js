import { primaryColor } from "../constants";
import { FontAwesomeIcon } from "./icon";

export function Button(props) {
  const { loading, ...restProps } = props;

  return (
    <button
      type="button"
      style={{
        display: "flex",
        alignItems: "center",
        minWidth: 48,
        border: "1px solid rgba(0, 0, 0, 0.6)",
        borderRadius: 8,
        padding: "8px 16px",
        fontSize: 14,
        color: "#000",
        backgroundColor: primaryColor,
        cursor: "pointer",
      }}
      {...restProps}
    >
      {props.loading && (
        <div style={{ marginRight: 8 }}>
          <FontAwesomeIcon name="spinner" className="fa-spin-pulse" />
        </div>
      )}
      {props.children}
    </button>
  );
}

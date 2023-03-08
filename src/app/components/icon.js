export function FontAwesomeIcon(props) {
  const size = props.size || 16;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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

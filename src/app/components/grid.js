export function Grid(props) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        margin: "0 -8px",
      }}
    >
      {props.children}
    </div>
  );
}

export function Col(props) {
  return (
    <div style={{ flex: "none", width: props.width, padding: 8 }}>
      {props.children}
    </div>
  );
}

export function Layout(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: 1200,
        height: "100%",
      }}
    >
      {props.children}
    </div>
  );
}

export function Header(props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid rgba(0, 0, 0, 0.9)",
      }}
    >
      {props.children}
    </div>
  );
}

export function Content(props) {
  return (
    <div
      style={{
        flex: "auto",
        width: 1000,
        minHeight: 0,
        margin: "0 auto",
        overflow: "auto",
      }}
    >
      {props.children}
    </div>
  );
}

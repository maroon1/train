import { primaryColor } from "../constants";

export function Filter(props) {
  const languages = [
    { value: "javascript", title: "Javascript" },
    { value: "ruby", title: "Ruby" },
    { value: "java", title: "Java" },
    { value: "css", title: "CSS" },
    { value: "python", title: "Python" },
  ];

  return (
    <ul style={{ display: "flex", alignItems: "center", margin: 16 }}>
      <FilterItem active={!props.value} onClick={() => props.onChange()}>
        All
      </FilterItem>
      {languages.map((lang) => (
        <FilterItem
          key={lang.value}
          active={props.value === lang.value}
          onClick={() => props.onChange(lang.value)}
        >
          {lang.title}
        </FilterItem>
      ))}
    </ul>
  );
}

export function FilterItem(props) {
  return (
    <li
      style={{
        padding: "0 8px",
        cursor: "pointer",
        color: props.active ? primaryColor : undefined,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </li>
  );
}

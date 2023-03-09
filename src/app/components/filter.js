import styles from "./filter.module.scss";

export function Filter(props) {
  const languages = [
    { value: "javascript", title: "Javascript" },
    { value: "ruby", title: "Ruby" },
    { value: "java", title: "Java" },
    { value: "css", title: "CSS" },
    { value: "python", title: "Python" },
  ];

  return (
    <ul className={styles.filter}>
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
      className={
        styles["filter-item"] +
        (props.active ? ` ${styles["filter-item-active"]}` : "")
      }
      onClick={props.onClick}
    >
      {props.children}
    </li>
  );
}

import { formatNumber } from "../utils";
import styles from "./card.module.scss";
import { Icon } from "./icon";

export function Card(props) {
  return (
    <CardContainer>
      <Rank value={props.rank} />
      <Avatar src={props.avatar} />
      <ProjectName href={props.url}>{props.name}</ProjectName>
      <ProjectDetails>
        <ProjectDetailsItem icon={<Icon name="user" color="orange" />} emphasis>
          {props.username}
        </ProjectDetailsItem>
        <ProjectDetailsItem icon={<Icon name="star" color="yellow" />}>
          {formatNumber(props.stars)} stars
        </ProjectDetailsItem>
        <ProjectDetailsItem icon={<Icon name="code-fork" color="#1f74e7" />}>
          {formatNumber(props.forks)} forks
        </ProjectDetailsItem>
        <ProjectDetailsItem
          icon={<Icon name="triangle-exclamation" color="#f14c4c" />}
        >
          {formatNumber(props.issues)} open issues
        </ProjectDetailsItem>
      </ProjectDetails>
    </CardContainer>
  );
}

function CardContainer(props) {
  return <div className={styles["card-container"]}>{props.children}</div>;
}

function Rank(props) {
  return <div className={styles.rank}>#{props.value}</div>;
}

function Avatar(props) {
  return <img className={styles.avatar} src={props.src} alt="头像" />;
}

function ProjectName(props) {
  return (
    <div className={styles["project-name"]}>
      <a href={props.href}>{props.children}</a>
    </div>
  );
}

function ProjectDetails(props) {
  return <dl className={styles["project-details"]}>{props.children}</dl>;
}

function ProjectDetailsItem(props) {
  return (
    <div className={styles["project-details-item-wrapper"]}>
      <dt>{props.icon}</dt>
      <dd
        className={styles["project-details-data"]}
        style={{
          fontWeight: props.emphasis ? "bold" : "normal",
        }}
      >
        {props.children}
      </dd>
    </div>
  );
}

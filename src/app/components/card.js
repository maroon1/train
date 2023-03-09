import { ellipsis, primaryColor } from "../constants";
import { formatNumber } from "../utils";
import { FontAwesomeIcon } from "./icon";

export function Card(props) {
  return (
    <CardContainer>
      <Rank value={props.rank} />
      <Avatar src={props.avatar} />
      <ProjectName href={props.url}>{props.name}</ProjectName>
      <ProjectDetails>
        <ProjectDetailsItem
          icon={<FontAwesomeIcon name="user" color="orange" />}
          emphasis
        >
          {props.username}
        </ProjectDetailsItem>
        <ProjectDetailsItem
          icon={<FontAwesomeIcon name="star" color="yellow" />}
        >
          {formatNumber(props.stars)} stars
        </ProjectDetailsItem>
        <ProjectDetailsItem
          icon={<FontAwesomeIcon name="code-fork" color="#1f74e7" />}
        >
          {formatNumber(props.forks)} forks
        </ProjectDetailsItem>
        <ProjectDetailsItem
          icon={<FontAwesomeIcon name="triangle-exclamation" color="#f14c4c" />}
        >
          {formatNumber(props.issues)} open issues
        </ProjectDetailsItem>
      </ProjectDetails>
    </CardContainer>
  );
}

function CardContainer(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid rgba(0, 0, 0, 0.5)",
        borderRadius: 4,
        padding: "16px 32px",
      }}
    >
      {props.children}
    </div>
  );
}

function Rank(props) {
  return <div style={{ fontSize: 32 }}>#{props.value}</div>;
}

function Avatar(props) {
  return (
    <img
      style={{
        width: 80,
        height: 80,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        objectFit: "cover",
      }}
      src={props.src}
      alt="头像"
    />
  );
}

function ProjectName(props) {
  return (
    <div
      style={{
        marginTop: 16,
        fonsSize: 24,
        fonstWeight: "bold",
        color: primaryColor,
        textAlign: "center",
        ...ellipsis,
      }}
    >
      <a href={props.href}>{props.children}</a>
    </div>
  );
}

function ProjectDetails(props) {
  return <dl style={{ width: "100%" }}>{props.children}</dl>;
}

function ProjectDetailsItem(props) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <dt>{props.icon}</dt>
      <dd
        style={{
          fontWeight: props.emphasis ? "bold" : "normal",
          marginLeft: 8,
          ...ellipsis,
        }}
      >
        {props.children}
      </dd>
    </div>
  );
}

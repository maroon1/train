import { useEffect, useRef, useState } from "react";

import "normalize.css/normalize.css";

import { service } from "./repository.service";
import { catchGithubRateLimitError } from "./utils";

import "./index.css";

import {
  Button,
  Card,
  Col,
  Content,
  Empty,
  Filter,
  Grid,
  Header,
  Layout,
  Loading,
} from "@/components";

export function App() {
  const [language] = useState(
    new URLSearchParams(window.location.search).get("language")
  );
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [projects, setProjects] = useState([]);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const pageNumberRef = useRef(1);

  useEffect(() => {
    service
      .getRepositories({
        language,
        page: 1,
        per_page: 10,
      })
      .then((data) => {
        setLoading(false);
        setProjects((prevProjects) => prevProjects.concat(data));
      })
      .catch((err) => {
        const message = catchGithubRateLimitError(err);

        if (message) {
          setErrorOccurred(message);
        } else {
          setErrorOccurred(true);
        }
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [language]);

  const onLoadMore = () => {
    if (loadingMore) {
      return;
    }

    setLoadingMore(true);

    service
      .getRepositories({
        language,
        page: pageNumberRef.current + 1,
        per_page: 10,
      })
      .then((data) => {
        setProjects((prevProjects) => prevProjects.concat(data));
      })
      .catch((err) => {
        const message = catchGithubRateLimitError(err);

        if (!message) {
          console.error(err);
          // alert("发生未知错误，请重试");
        } else {
          // alert(message);
        }
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  return (
    <Layout>
      <Header>
        <Filter
          value={language}
          onChange={(value) => {
            const url = new URL(window.location.href);

            if (value) {
              url.searchParams.set("language", value);
            } else {
              url.searchParams.delete("language");
            }

            window.location.href = url.toString();
          }}
        />
      </Header>
      <Content>
        {loading && <Loading />}
        {errorOccurred ? (
          <Empty
            message={
              typeof errorOccurred === "string"
                ? errorOccurred
                : "发生未知错误，请刷新页面重试"
            }
          />
        ) : (
          <Grid>
            {projects.map((project, i) => (
              <Col width="25%" key={project.id}>
                <Card
                  rank={i + 1}
                  url={project.html_url}
                  avatar={project.owner.avatar_url}
                  name={project.name}
                  username={project.owner.login}
                  stars={project.stargazers_count}
                  forks={project.forks}
                  issues={project.open_issues}
                />
              </Col>
            ))}
          </Grid>
        )}
        {!loading && !errorOccurred && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "16px 0",
            }}
          >
            <Button loading={loadingMore} onClick={onLoadMore}>
              加载更多
            </Button>
          </div>
        )}
      </Content>
    </Layout>
  );
}

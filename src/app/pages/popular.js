import { Col, message as antdMessage, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useSearchParams } from "react-router-dom";

import { catchGithubRateLimitError } from "../utils";
import { service } from "./repository.service";

import {
  BattleButton,
  BattleLink,
  Card,
  Content,
  Empty,
  Filter,
  Header,
  Layout,
  Loader,
  Loading,
} from "@/components";

export function Popular() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [projects, setProjects] = useState({ items: [], totalCount: 0 });
  const [errorOccurred, setErrorOccurred] = useState(false);
  const pageNumberRef = useRef(1);
  const [messageApi, contextHolder] = antdMessage.useMessage();

  const hasMore = projects.items.length < projects.totalCount;

  const language = searchParams.get("language");

  useEffect(() => {
    setLoading(true);
    setProjects({ items: [], totalCount: 0 });
    pageNumberRef.current = 1;

    service
      .getRepositories({
        language,
        page: pageNumberRef.current,
        per_page: 30,
      })
      .then((data) => {
        setProjects((prevProjects) => ({
          items: prevProjects.items.concat(data.items),
          totalCount: data.total_count,
        }));
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
        per_page: 30,
      })
      .then((data) => {
        pageNumberRef.current += 1;
        setProjects((prevProjects) => ({
          items: prevProjects.items.concat(data.items),
          totalCount: data.total_count,
        }));
      })
      .catch((err) => {
        const errorMessage = catchGithubRateLimitError(err);

        if (!errorMessage) {
          console.error(err);
          messageApi.error("??????????????????????????????");
        } else {
          messageApi.error(errorMessage);
        }
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  return (
    <Layout>
      {contextHolder}
      <Header>
        <Filter
          value={language}
          onChange={(value) => {
            const newSearchParams = new URLSearchParams(searchParams);

            if (value) {
              newSearchParams.set("language", value);
            } else {
              newSearchParams.delete("language");
            }

            setSearchParams(newSearchParams);
          }}
        />
        <BattleLink to="/battle" />
      </Header>
      <Content>
        {loading && <Loading />}
        {errorOccurred && (
          <Empty
            message={
              typeof errorOccurred === "string"
                ? errorOccurred
                : "??????????????????????????????????????????"
            }
          />
        )}
        {!loading && !errorOccurred && (
          <InfiniteScroll
            initialLoad={false}
            hasMore={hasMore}
            loader={<Loader key={0} />}
            loadMore={onLoadMore}
            useWindow={false}
          >
            <Row gutter={[16, 16]} justify="space-around">
              {projects.items.map((project, i) => (
                <Col key={i} lg={6} md={8} sm={12} xs={12}>
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
            </Row>
          </InfiniteScroll>
        )}
        <BattleButton to="/battle" />
      </Content>
    </Layout>
  );
}

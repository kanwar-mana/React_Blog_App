import React from "react";
import { Container, Postcard } from "../components";
import service from "../appwrite/config";
import { useEffect, useState } from "react";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => {
            <div key={post.$id} className="p-2 w-1/4">
              <Postcard post={post} />
            </div>;
          })}
        </div>
      </Container>
    </div>
  );
}

export default Home;

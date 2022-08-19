import { getSortedPostsData } from "./posts";

export const getTagPosts = (tag) => {
  const posts = getSortedPostsData();
  return posts.filter((p) => p.tags.includes(tag));
};

export const getTagsPaths = () => {
  const posts = getSortedPostsData();
  const tags = Array.from(
    new Set(
      posts.reduce((acc, post) => {
        acc.push(...post.tags);
        return acc;
      }, [])
    )
  );
  return tags.map((t) => `/blog/tags/${t}`);
};

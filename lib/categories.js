import { getSortedPostsData } from "./posts";

export const getCategoryPosts = (category) => {
  const posts = getSortedPostsData();
  return posts.filter((p) => p.category === category);
};

export const getCategoriesPaths = () => {
  const posts = getSortedPostsData();
  const categories = Array.from(new Set(posts.map((p) => p.category)));
  return categories.map((p) => `/blog/categories/${p}`);
};

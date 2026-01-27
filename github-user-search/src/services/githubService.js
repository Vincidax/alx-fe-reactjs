import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
  },
});

export const searchUsers = async ({ query, location, repos, page }) => {
  let q = query;

  if (location) q += `+location:${location}`;
  if (repos) q += `+repos:>=${repos}`;

  const response = await api.get("/search/users", {
    params: {
      q,
      page,
      per_page: 5,
    },
  });

  // Fetch extra details per user
  const detailedUsers = await Promise.all(
    response.data.items.map(async (user) => {
      const userDetails = await api.get(`/users/${user.login}`);
      return userDetails.data;
    }),
  );

  return detailedUsers;
};

import { useState } from "react";
import { searchUsers } from "../services/githubService";

export default function Search() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [repos, setRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (e, resetPage = true) => {
    e.preventDefault();

    if (!query) return;

    setLoading(true);
    setError(false);

    try {
      const currentPage = resetPage ? 1 : page + 1;
      const data = await searchUsers({
        query,
        location,
        repos,
        page: currentPage,
      });

      setUsers(resetPage ? data : [...users, ...data]);
      setPage(currentPage);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form
        onSubmit={(e) => handleSearch(e, true)}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <input
          type="text"
          placeholder="Username or keyword"
          className="border p-2 rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          className="border p-2 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min repositories"
          className="border p-2 rounded"
          value={repos}
          onChange={(e) => setRepos(e.target.value)}
        />

        <button
          type="submit"
          className="md:col-span-3 bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && (
        <p className="text-center text-red-500">
          Looks like we cant find the user
        </p>
      )}

      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user.login}
            className="border p-4 rounded flex gap-4 items-center"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{user.login}</h3>
              <p className="text-sm text-gray-500">
                {user.location || "Location not available"}
              </p>
              <p className="text-sm">Repos: {user.public_repos}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {users.length > 0 && !loading && (
        <button
          onClick={(e) => handleSearch(e, false)}
          className="mt-6 w-full border py-2 rounded hover:bg-gray-100"
        >
          Load More
        </button>
      )}
    </div>
  );
}

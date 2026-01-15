import React, { createContext, useContext, useState, useEffect } from "react";

const RepoContext = createContext();

export function RepoProvider({ children }) {
  const [repo, setRepo] = useState(null);

  // load from localStorage
  useEffect(() => {
    const savedRepo = localStorage.getItem("selectedRepo");
    if (savedRepo) {
      setRepo(JSON.parse(savedRepo));
    }
  }, []);

  const selectRepo = (repoData) => {
    setRepo(repoData);
    localStorage.setItem("selectedRepo", JSON.stringify(repoData));
  };

  return (
    <RepoContext.Provider value={{ repo, selectRepo }}>
      {children}
    </RepoContext.Provider>
  );
}

export const useRepo = () => useContext(RepoContext);

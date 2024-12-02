
"use client"
import { createContext, useContext } from "react";
import useProfile from "../hooks/useProfile";
import { useSelector } from "react-redux";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const authToken = useSelector((state) => state.auth.token); // Get the auth token from Redux
  const { profile, loading, refreshProfile } = useProfile(authToken);

  return (
    <ProfileContext.Provider value={{ profile, loading, refreshProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);

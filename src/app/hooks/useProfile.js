import { useEffect, useState } from "react";
import axios from "axios";
import { updateCredits } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const useProfile = (authToken) => {
  const [profile, setProfile] = useState({ credits: 0 });
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const response = await axios.get("https://api.axamine.ignitionnestlabs.in/user/profile", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setProfile(response.data); // Update the profile state
      console.log("Profile fetched:", response.data);
    //   updateCredits
    dispatch(updateCredits({credits:response.data.credits }));
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authToken) return;

    // Initial fetch
    fetchProfile();

    // Periodic refresh every 5 minutes
    const intervalId = setInterval(fetchProfile, 5 * 60 * 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [authToken]);

  return { profile, loading, refreshProfile: fetchProfile };
};

export default useProfile;

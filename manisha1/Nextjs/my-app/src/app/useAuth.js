
import { useState, useEffect } from "react";

export function useAuth() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, []);

  return isSignedIn;
}

export function handleLogout() {
  localStorage.removeItem("user");
}

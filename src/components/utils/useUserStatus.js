import React, { useEffect, useState } from "react";

export const useUserStatus = () => {
  const [status, setStatus] = useState(true);
  useEffect(() => {
    window.addEventListener("online", () => {
      setStatus(true);
    });

    window.addEventListener("offline", () => {
      setStatus(false);
    });
  }, []);

  return status;
};

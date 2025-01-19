import { useState, useEffect } from "react";
import { getApplications } from "@/actions/application";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

export const useApplications = () => {
  const [user] = useAuthState(auth);
  const [applications, setApplications] = useState([]);
  const [containers, setContainers] = useState([
    {
      id: "dnd-applied",
      items: [],
    },
    {
      id: "dnd-interviewee",
      items: [],
    },
    {
      id: "dnd-offer",
      items: [],
    },
    {
      id: "dnd-denied",
      items: [],
    },
  ]);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) return;
      const response = await getApplications(user.uid);

      const formattedResponse = response.map((application) => ({
        ...application,
        date: new Date(application.date.seconds * 1000),
      }));

      setApplications(formattedResponse);
    };

    fetchApplications();
  }, [user]);

  useEffect(() => {
    if (applications.length > 0) {
      setContainers([
        {
          id: "dnd-applied",
          items: applications.filter((item) => item.status === "dnd-applied"),
        },
        {
          id: "dnd-interviewee",
          items: applications.filter(
            (item) => item.status === "dnd-interviewee"
          ),
        },
        {
          id: "dnd-offer",
          items: applications.filter((item) => item.status === "dnd-offer"),
        },
        {
          id: "dnd-denied",
          items: applications.filter((item) => item.status === "dnd-denied"),
        },
      ]);
    }
  }, [applications]);

  return {
    containers,
    setContainers,
  };
};

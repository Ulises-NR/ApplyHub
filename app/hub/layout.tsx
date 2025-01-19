"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

const HubLayout = ({ children }) => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  if (!user && !loading) {
    return router.push("/auth/signin");
  }

  if (user && !loading) {
    return <>{children}</>;
  }
};

export default HubLayout;

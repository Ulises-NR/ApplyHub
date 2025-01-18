"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home, Inbox } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Applyhub",
    url: "/hub",
    icon: Inbox,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth/signin");
  };

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <h2 className="text-3xl">SafePass</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {user && !loading && (
        <SidebarFooter>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}

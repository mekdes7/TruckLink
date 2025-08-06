
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Bell, User, Settings } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export function ManagerSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/manager/dashboard"}>
                  <Link to="/manager/dashboard">
                    <span className="mr-1"><Settings size={18}/></span>
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/manager/payment-center"}>
                  <Link to="/manager/payment-center">
                    <span className="mr-1"><Bell size={18}/></span>
                    <span>Payment Center</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("drivers");
                    localStorage.removeItem("manager_jobs");
                    localStorage.removeItem("manager_jobs_history");
                    localStorage.removeItem("manager_logged_in");
                    navigate("/manager/login");
                  }}
                >
                  <span className="mr-1"><User size={18}/></span>
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

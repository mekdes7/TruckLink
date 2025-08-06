
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Bell, MessageSquare, Settings, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export function DriverSidebar() {
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
                <SidebarMenuButton asChild isActive={location.pathname === "/driver/dashboard"}>
                  <Link to="/driver/dashboard">
                    <span className="mr-1"><Settings size={18} /></span>
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/driver/payment-center"}>
                  <Link to="/driver/payment-center">
                    <span className="mr-1"><Bell size={18}/></span>
                    <span>Payment Center</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/driver/maintenance"}>
                  <Link to="/driver/maintenance">
                    <span className="mr-1"><Settings size={18}/></span>
                    <span>Maintenance Reporting</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/driver/feedback"}>
                  <Link to="/driver/feedback">
                    <span className="mr-1"><MessageSquare size={18}/></span>
                    <span>Feedback & Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("active_job");
                    localStorage.removeItem("job_history");
                    localStorage.removeItem("driver_logged_in");
                    navigate("/driver/login");
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

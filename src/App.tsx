import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DriverLogin from "./pages/DriverLogin";
import DriverSignup from "./pages/DriverSignup";
import ManagerLogin from "./pages/ManagerLogin";
import ManagerSignup from "./pages/ManagerSignup";
import DriverDashboard from "./pages/DriverDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import DriverPaymentCenter from "./pages/DriverPaymentCenter";
import DriverMaintenance from "./pages/DriverMaintenance";
import DriverFeedback from "./pages/DriverFeedback";
import ManagerPaymentCenter from "./pages/ManagerPaymentCenter";
import { DriverSidebar } from "@/components/DriverSidebar";
import { ManagerSidebar } from "@/components/ManagerSidebar";

const queryClient = new QueryClient();

// Helper for picking sidebar per route
function getSidebarComponent(pathname: string) {
  if (pathname.startsWith("/manager")) return <ManagerSidebar />;
  if (pathname.startsWith("/driver")) return <DriverSidebar />;
  // Default to manager sidebar for "/"
  return <ManagerSidebar />;
}

// Layout wrapper so every page gets sidebar
function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <div className="flex-shrink-0">
          {getSidebarComponent(location.pathname)}
        </div>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </SidebarProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main index without sidebar */}
          <Route
            path="/"
            element={
              <Index />
            }
          />
          {/* MANAGER Auth Pages -- NO Sidebar */}
          <Route path="/manager/login" element={<ManagerLogin />} />
          <Route path="/manager/signup" element={<ManagerSignup />} />
          {/* DRIVER Auth Pages -- NO Sidebar */}
          <Route path="/driver/login" element={<DriverLogin />} />
          <Route path="/driver/signup" element={<DriverSignup />} />
          {/* Driver App Routes */}
          <Route
            path="/driver/dashboard"
            element={
              <AppLayout>
                <DriverDashboard />
              </AppLayout>
            }
          />
          <Route
            path="/driver/payment-center"
            element={
              <AppLayout>
                <DriverPaymentCenter />
              </AppLayout>
            }
          />
          <Route
            path="/driver/maintenance"
            element={
              <AppLayout>
                <DriverMaintenance />
              </AppLayout>
            }
          />
          <Route
            path="/driver/feedback"
            element={
              <AppLayout>
                <DriverFeedback />
              </AppLayout>
            }
          />
          {/* Manager App Routes */}
          <Route
            path="/manager/dashboard"
            element={
              <AppLayout>
                <ManagerDashboard />
              </AppLayout>
            }
          />
          <Route
            path="/manager/payment-center"
            element={
              <AppLayout>
                <ManagerPaymentCenter />
              </AppLayout>
            }
          />
          {/* Not Found */}
          <Route
            path="*"
            element={
              <AppLayout>
                <NotFound />
              </AppLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

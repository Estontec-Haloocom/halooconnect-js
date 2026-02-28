import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import ThankYou from "./pages/ThankYou";
import Admin from "./pages/Admin";
import AdminBlog from "./pages/AdminBlog";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import UAELanding from "./pages/UAELanding";
import SingaporeLanding from "./pages/SingaporeLanding";
import MalaysiaLanding from "./pages/MalaysiaLanding";
import PhilippinesLanding from "./pages/PhilippinesLanding";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import Analysis from "./pages/Analysis";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/uae" element={<UAELanding />} />
            <Route path="/singapore" element={<SingaporeLanding />} />
            <Route path="/malaysia" element={<MalaysiaLanding />} />
            <Route path="/philippines" element={<PhilippinesLanding />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/analysis" element={<Analysis />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;

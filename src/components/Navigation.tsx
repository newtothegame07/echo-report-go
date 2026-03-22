import { Button } from "@/components/ui/button";
import { Recycle, Menu, LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Recycle className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">CleanCity</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("report")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Report
            </button>
            <button
              onClick={() => scrollToSection("track")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Track
            </button>
            <button
              onClick={() => scrollToSection("schedule")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Schedule
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-foreground hover:text-primary transition-colors"
            >
              How It Works
            </button>
            <Button size="sm" onClick={() => scrollToSection("report")}>
              Report Waste
            </Button>
            {isAuthenticated ? (
              <>
                {role === "admin" && (
                  <Button size="sm" variant="outline" onClick={() => navigate("/admin")}>
                    Admin Panel
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => { logout(); navigate("/"); }}>
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" onClick={() => navigate("/login")}>
                <LogIn className="h-4 w-4 mr-1" /> Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            <button
              onClick={() => scrollToSection("report")}
              className="block w-full text-left px-4 py-2 hover:bg-muted rounded-lg"
            >
              Report
            </button>
            <button
              onClick={() => scrollToSection("track")}
              className="block w-full text-left px-4 py-2 hover:bg-muted rounded-lg"
            >
              Track
            </button>
            <button
              onClick={() => scrollToSection("schedule")}
              className="block w-full text-left px-4 py-2 hover:bg-muted rounded-lg"
            >
              Schedule
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="block w-full text-left px-4 py-2 hover:bg-muted rounded-lg"
            >
              How It Works
            </button>
            <div className="px-4 pt-2 space-y-2">
              <Button className="w-full" onClick={() => scrollToSection("report")}>
                Report Waste
              </Button>
              {isAuthenticated ? (
                <>
                  {role === "admin" && (
                    <Button className="w-full" variant="outline" onClick={() => { navigate("/admin"); setIsOpen(false); }}>
                      Admin Panel
                    </Button>
                  )}
                  <Button className="w-full" variant="ghost" onClick={() => { logout(); navigate("/"); setIsOpen(false); }}>
                    <LogOut className="h-4 w-4 mr-1" /> Logout
                  </Button>
                </>
              ) : (
                <Button className="w-full" variant="outline" onClick={() => { navigate("/login"); setIsOpen(false); }}>
                  <LogIn className="h-4 w-4 mr-1" /> Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

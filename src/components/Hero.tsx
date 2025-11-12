import { Button } from "@/components/ui/button";
import { Recycle, MapPin, Bell } from "lucide-react";
import heroImage from "@/assets/hero-waste-management.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Clean city environment with waste management"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fade-in">
            <Recycle className="h-4 w-4" />
            <span className="text-sm font-medium">Smart Waste Management</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            Keep Your City
            <span className="block text-primary mt-2">Clean & Green</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in">
            Report uncollected waste, track your complaints, and stay updated with
            pickup schedules. Join us in making our community cleaner, one report at a time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Button
              size="lg"
              className="text-lg px-8 shadow-lg hover:shadow-xl transition-all"
              onClick={() => scrollToSection("report")}
            >
              <MapPin className="mr-2 h-5 w-5" />
              Report Waste
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8"
              onClick={() => scrollToSection("track")}
            >
              <Bell className="mr-2 h-5 w-5" />
              Track Complaint
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in">
            <div>
              <div className="text-3xl font-bold text-primary">2.5K+</div>
              <div className="text-sm text-muted-foreground">Reports Resolved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">48hrs</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

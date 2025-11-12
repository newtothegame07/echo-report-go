import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ReportForm from "@/components/ReportForm";
import TrackComplaint from "@/components/TrackComplaint";
import Schedule from "@/components/Schedule";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <ReportForm />
        <TrackComplaint />
        <Schedule />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

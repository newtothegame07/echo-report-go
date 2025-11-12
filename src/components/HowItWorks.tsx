import { Card, CardContent } from "@/components/ui/card";
import { FileText, Search, Users, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Report the Issue",
    description: "Fill out the simple form with details about the uncollected waste in your area. Upload a photo for faster processing.",
  },
  {
    icon: Search,
    title: "We Review & Assign",
    description: "Our system assigns the complaint to the relevant team based on your location and waste type.",
  },
  {
    icon: Users,
    title: "Team Takes Action",
    description: "A cleaning crew is dispatched to your location to collect and dispose of the waste properly.",
  },
  {
    icon: CheckCircle,
    title: "Track & Confirm",
    description: "Monitor the progress of your complaint in real-time and receive confirmation once resolved.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to a cleaner neighborhood
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="relative shadow-soft hover:shadow-medium transition-all">
                <CardContent className="pt-12 pb-6 text-center">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                  <div className="mb-4 flex justify-center">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

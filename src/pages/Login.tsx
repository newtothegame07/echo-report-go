import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Recycle, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async () => {
    if (!email || !password) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    if (isSignup && !fullName) {
      toast({ title: "Error", description: "Please enter your full name", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    if (isSignup) {
      const result = await signup(email, password, fullName);
      if (result.success) {
        toast({ title: "Account Created!", description: "You are now logged in." });
        navigate("/");
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
    } else {
      const result = await login(email, password);
      if (result.success) {
        toast({ title: "Welcome!", description: "Logged in successfully" });
        navigate("/");
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8 cursor-pointer" onClick={() => navigate("/")}>
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
            <Recycle className="h-7 w-7 text-primary-foreground" />
          </div>
          <span className="font-bold text-2xl text-foreground">CleanCity</span>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{isSignup ? "Create Account" : "Sign In"}</CardTitle>
            <CardDescription>
              {isSignup
                ? "Register as a citizen to report waste issues"
                : "Use admin@cleancity.com / admin123 for admin, or user@cleancity.com / user123 for citizen"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Your Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAuth()} />
              </div>
              <Button className="w-full" onClick={handleAuth} disabled={isLoading}>
                <LogIn className="h-4 w-4 mr-2" />
                {isLoading ? "Please wait..." : isSignup ? "Sign Up" : "Sign In"}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                <button className="text-primary hover:underline font-medium" onClick={() => setIsSignup(!isSignup)}>
                  {isSignup ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

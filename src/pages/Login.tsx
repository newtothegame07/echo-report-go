import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Recycle, User, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (role: "user" | "admin") => {
    if (!username || !password) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    const success = login(username, password, role);
    if (success) {
      toast({ title: "Welcome!", description: `Logged in as ${role}` });
      navigate(role === "admin" ? "/admin" : "/");
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
            <Recycle className="h-7 w-7 text-primary-foreground" />
          </div>
          <span className="font-bold text-2xl text-foreground">CleanCity</span>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>Choose your role to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="user" className="flex items-center gap-2">
                  <User className="h-4 w-4" /> Citizen
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Admin
                </TabsTrigger>
              </TabsList>

              {(["user", "admin"] as const).map((role) => (
                <TabsContent key={role} value={role}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${role}-username`}>Username</Label>
                      <Input
                        id={`${role}-username`}
                        placeholder={role === "admin" ? "Admin username" : "Your username"}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${role}-password`}>Password</Label>
                      <Input
                        id={`${role}-password`}
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <Button className="w-full" onClick={() => handleLogin(role)}>
                      {role === "admin" ? "Login as Admin" : "Login as Citizen"}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Demo: use any username & password
                    </p>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

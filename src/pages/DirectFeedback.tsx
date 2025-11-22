import Navigation from "@/components/Navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare } from "lucide-react";

const DirectFeedback = () => {
  const email = "maindeveloper@gmail.com";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Direct Feedback
            </h1>
            <p className="text-lg text-muted-foreground">
              Send your thoughts directly to the main developer
            </p>
          </div>

          <Card className="text-center p-6">
            <CardHeader>
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-secondary" />
              </div>
              <CardTitle className="text-2xl">Main Developer Contact</CardTitle>
              <CardDescription>
                We value your specific feedback on the platform's functionality.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                <p className="text-xl font-medium">{email}</p>
              </div>

              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href={`mailto:${email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email Now
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DirectFeedback;

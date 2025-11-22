import Navigation from "@/components/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail, User } from "lucide-react";

const developers = [
  { name: "Emmanuel Kibet", email: "developer@gmail.com" },
  { name: "Lampard Kipyegon", email: "developer@gmail.com" },
  { name: "Sheila Njeri", email: "developer@gmail.com" },
  { name: "Jacob Oduori", email: "developer@gmail.com" },
];

const DeveloperContacts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Developer Team
            </h1>
            <p className="text-lg text-muted-foreground">
              Contact our development team directly
            </p>
          </div>

          <div className="grid gap-6">
            {developers.map((dev, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{dev.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${dev.email}`} className="hover:text-primary transition-colors">
                        {dev.email}
                      </a>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperContacts;

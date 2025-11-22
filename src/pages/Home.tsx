import Navigation from "@/components/Navigation";
import ChatBot from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Target, MessageCircle } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Connect with Professionals Who've Been Where You're Going
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            High school graduates, meet experienced professionals in your field of interest. 
            Get real insights, guidance, and mentorship for your university journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/mentors">
              <Button size="lg" className="w-full sm:w-auto">
                Find a Mentor <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-3 p-6 rounded-lg bg-card hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Expert Mentors</h3>
            <p className="text-muted-foreground">
              Connect with professionals from diverse fields and industries
            </p>
          </div>
          
          <div className="text-center space-y-3 p-6 rounded-lg bg-card hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
              <Target className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold">Career Guidance</h3>
            <p className="text-muted-foreground">
              Get personalized advice about courses and career paths
            </p>
          </div>
          
          <div className="text-center space-y-3 p-6 rounded-lg bg-card hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">AI Assistant</h3>
            <p className="text-muted-foreground">
              Get instant answers to your questions about education and careers
            </p>
          </div>
        </div>
      </section>

      {/* Chatbot Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Have Questions? Ask Our AI Assistant
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get instant answers about university courses, career paths, and finding the right mentor
          </p>
        </div>
        <ChatBot />
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Shape Your Future?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our community of students and professionals today
          </p>
          <Link to="/auth">
            <Button size="lg">
              Sign Up Now <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Building2, Clock, UserPlus } from "lucide-react";

type MentorProfile = {
  id: string;
  user_id: string;
  job_title: string;
  company: string | null;
  field_of_work: string;
  bio: string;
  career_insights: string | null;
  years_of_experience: number | null;
  profiles: {
    full_name: string;
    email: string;
  };
};

const Mentors = () => {
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMentors();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();
      setUserRole(profile?.role || null);
    }
  };

  const fetchMentors = async () => {
    try {
      const { data, error } = await supabase
        .from("mentor_profiles")
        .select(`
          *,
          profiles:user_id (
            full_name,
            email
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMentors(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading mentors",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestMentorship = async (mentorId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to request mentorship",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (userRole !== "student") {
      toast({
        title: "Students only",
        description: "Only students can request mentorship",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("mentor_requests")
        .insert({
          student_id: user.id,
          mentor_id: mentorId,
          status: "pending",
        });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Request already sent",
            description: "You've already sent a request to this mentor",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Request sent!",
          description: "The mentor will review your request soon",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error sending request",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Loading mentors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Meet Our Mentors
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with experienced professionals who are ready to guide you in your career journey
          </p>
        </div>

        {mentors.length === 0 ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No mentors available yet. Check back soon!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{mentor.profiles.full_name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Briefcase className="w-3 h-3" />
                        {mentor.job_title}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{mentor.field_of_work}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mentor.company && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      {mentor.company}
                    </div>
                  )}
                  {mentor.years_of_experience && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {mentor.years_of_experience} years of experience
                    </div>
                  )}
                  <p className="text-sm line-clamp-3">{mentor.bio}</p>
                  {mentor.career_insights && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground italic line-clamp-2">
                        "{mentor.career_insights}"
                      </p>
                    </div>
                  )}
                  <Button
                    className="w-full"
                    onClick={() => handleRequestMentorship(mentor.user_id)}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Request Mentorship
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentors;

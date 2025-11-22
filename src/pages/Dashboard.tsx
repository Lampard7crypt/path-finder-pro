import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Briefcase, Edit, Save, CheckCircle, XCircle, Clock } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [mentorProfile, setMentorProfile] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    job_title: "",
    company: "",
    field_of_work: "",
    bio: "",
    career_insights: "",
    years_of_experience: 0,
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    setUser(session.user);
    await fetchProfile(session.user.id);
    setLoading(false);
  };

  const fetchProfile = async (userId: string) => {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    setProfile(profileData);

    if (profileData?.role === "mentor") {
      const { data: mentorData } = await supabase
        .from("mentor_profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (mentorData) {
        setMentorProfile(mentorData);
        setFormData({
          job_title: mentorData.job_title,
          company: mentorData.company || "",
          field_of_work: mentorData.field_of_work,
          bio: mentorData.bio,
          career_insights: mentorData.career_insights || "",
          years_of_experience: mentorData.years_of_experience || 0,
        });
      }

      // Fetch mentor requests
      const { data: requestsData } = await supabase
        .from("mentor_requests")
        .select(`
          *,
          profiles:student_id (full_name, email)
        `)
        .eq("mentor_id", userId);

      setRequests(requestsData || []);
    } else {
      // Fetch student requests
      const { data: requestsData } = await supabase
        .from("mentor_requests")
        .select(`
          *,
          profiles:mentor_id (full_name, email),
          mentor_profiles!mentor_requests_mentor_id_fkey (job_title, field_of_work)
        `)
        .eq("student_id", userId);

      setRequests(requestsData || []);
    }
  };

  const handleSaveMentorProfile = async () => {
    try {
      if (mentorProfile) {
        const { error } = await supabase
          .from("mentor_profiles")
          .update(formData)
          .eq("id", mentorProfile.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("mentor_profiles")
          .insert({
            ...formData,
            user_id: user.id,
          });

        if (error) throw error;
      }

      toast({
        title: "Profile updated!",
        description: "Your mentor profile has been saved successfully",
      });
      setEditMode(false);
      await fetchProfile(user.id);
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRequestAction = async (requestId: string, status: "accepted" | "declined") => {
    try {
      const { error } = await supabase
        .from("mentor_requests")
        .update({ status })
        .eq("id", requestId);

      if (error) throw error;

      toast({
        title: status === "accepted" ? "Request accepted!" : "Request declined",
        description: `You have ${status} the mentorship request`,
      });

      await fetchProfile(user.id);
    } catch (error: any) {
      toast({
        title: "Error updating request",
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
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{profile?.full_name}</CardTitle>
                    <CardDescription>{profile?.email}</CardDescription>
                  </div>
                </div>
                <Badge>{profile?.role}</Badge>
              </div>
            </CardHeader>
          </Card>

          {profile?.role === "mentor" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <CardTitle>Mentor Profile</CardTitle>
                  </div>
                  {!editMode ? (
                    <Button onClick={() => setEditMode(true)} size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSaveMentorProfile} size="sm">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={() => setEditMode(false)} variant="outline" size="sm">
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {editMode ? (
                  <>
                    <div className="space-y-2">
                      <Label>Job Title</Label>
                      <Input
                        value={formData.job_title}
                        onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Field of Work</Label>
                      <Input
                        value={formData.field_of_work}
                        onChange={(e) => setFormData({ ...formData, field_of_work: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Bio</Label>
                      <Textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Career Insights</Label>
                      <Textarea
                        value={formData.career_insights}
                        onChange={(e) => setFormData({ ...formData, career_insights: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Years of Experience</Label>
                      <Input
                        type="number"
                        value={formData.years_of_experience}
                        onChange={(e) => setFormData({ ...formData, years_of_experience: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </>
                ) : mentorProfile ? (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Job Title</p>
                      <p className="font-medium">{mentorProfile.job_title}</p>
                    </div>
                    {mentorProfile.company && (
                      <div>
                        <p className="text-sm text-muted-foreground">Company</p>
                        <p className="font-medium">{mentorProfile.company}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">Field of Work</p>
                      <p className="font-medium">{mentorProfile.field_of_work}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bio</p>
                      <p>{mentorProfile.bio}</p>
                    </div>
                    {mentorProfile.career_insights && (
                      <div>
                        <p className="text-sm text-muted-foreground">Career Insights</p>
                        <p className="italic">{mentorProfile.career_insights}</p>
                      </div>
                    )}
                    {mentorProfile.years_of_experience && (
                      <div>
                        <p className="text-sm text-muted-foreground">Years of Experience</p>
                        <p className="font-medium">{mentorProfile.years_of_experience} years</p>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-muted-foreground">Click "Edit Profile" to create your mentor profile</p>
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>
                {profile?.role === "mentor" ? "Mentorship Requests" : "My Requests"}
              </CardTitle>
              <CardDescription>
                {profile?.role === "mentor" 
                  ? "Review and manage mentorship requests from students" 
                  : "Track your mentorship requests"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {requests.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No requests yet</p>
              ) : (
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">
                            {profile?.role === "mentor" 
                              ? request.profiles.full_name
                              : request.profiles.full_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {profile?.role === "mentor" 
                              ? request.profiles.email
                              : `${request.mentor_profiles?.job_title} • ${request.mentor_profiles?.field_of_work}`}
                          </p>
                        </div>
                        <Badge variant={
                          request.status === "accepted" ? "default" :
                          request.status === "declined" ? "destructive" :
                          "secondary"
                        }>
                          {request.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                          {request.status === "accepted" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {request.status === "declined" && <XCircle className="w-3 h-3 mr-1" />}
                          {request.status}
                        </Badge>
                      </div>

                      {profile?.role === "mentor" && request.status === "pending" && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleRequestAction(request.id, "accepted")}
                          >
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRequestAction(request.id, "declined")}
                          >
                            Decline
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, AlertCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DataDeletion() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber && !email) {
      toast({
        title: "Error",
        description: "Please provide either phone number or email",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("data_deletion_requests" as any)
        .insert({
          phone_number: phoneNumber || null,
          email: email || null,
          reason: reason || null,
          status: "pending",
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Request Submitted",
        description: "Your data deletion request has been received and will be processed within 30 days.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Account & Data Deletion</h1>
          <p className="text-muted-foreground">GoatGoat - Fresh Meat Delivery Platform</p>
        </div>

        {!isSubmitted ? (
          <>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trash2 className="h-5 w-5" />
                  Request Account Deletion
                </CardTitle>
                <CardDescription>
                  Follow the steps below to request deletion of your account and associated data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Steps to Delete Your Account:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Fill out the form below with your registered phone number or email</li>
                    <li>Optionally, provide a reason for deletion (helps us improve)</li>
                    <li>Submit the request</li>
                    <li>You will receive a confirmation message</li>
                    <li>Your account and data will be deleted within 30 days</li>
                  </ol>
                </div>

                <Separator />

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Registered)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 XXXXXXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className="text-center text-sm text-muted-foreground">OR</div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address (if registered)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Deletion (Optional)</Label>
                    <Textarea
                      id="reason"
                      placeholder="Tell us why you're leaving (optional)"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Submitting..." : "Submit Deletion Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  What Data Will Be Deleted?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Data That Will Be Permanently Deleted:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Personal information (name, phone number, email, address)</li>
                    <li>Account credentials and authentication data</li>
                    <li>Delivery addresses and preferences</li>
                    <li>Payment information (card details, UPI IDs)</li>
                    <li>Product reviews and ratings submitted by you</li>
                    <li>Wishlist and saved items</li>
                    <li>Notification preferences</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Data That May Be Retained:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Order history (anonymized) for up to 7 years for legal/tax compliance</li>
                    <li>Transaction records required by law</li>
                    <li>Aggregated analytics data (fully anonymized)</li>
                  </ul>
                </div>

                <Separator />

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Retention Period:</strong> Personal data deletion will be completed within 30 days of request submission. 
                    Some anonymized records may be retained for legal compliance as required by Indian law (up to 7 years for financial records).
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                <h2 className="text-2xl font-bold">Request Submitted Successfully</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Your account deletion request has been received. We will process it within 30 days.
                  You will receive a confirmation once the deletion is complete.
                </p>
                <p className="text-sm text-muted-foreground">
                  If you change your mind, please contact our support team within 7 days.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

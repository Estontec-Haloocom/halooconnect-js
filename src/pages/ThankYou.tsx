import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/haloo-connect-logo.png";
const ThankYou = () => {
  return <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="py-6 border-b border-border/50">
        <div className="container">
          <Link to="/">
            <img src={logo} alt="Haloo Connect" className="h-10 md:h-12" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8 animate-fade-in">
              <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-14 h-14 text-primary" />
              </div>
            </div>

            {/* Thank You Message */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
              Thank You!
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
              Your demo request has been successfully submitted. Our team will contact you within 24 hours.
            </p>

            {/* What's Next */}
            

            {/* Contact Info */}
            

            {/* Back Button */}
            <Link to="/">
              <Button variant="outline" size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-border/50">
        <div className="container text-center text-sm text-muted-foreground">
          © 2024 Haloo Connect. All rights reserved.
        </div>
      </footer>
    </div>;
};
export default ThankYou;
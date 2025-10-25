import { Card, CardContent } from "../../../mediflow-os/src/components/ui/card";
import { Construction } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
}

const ComingSoon = ({ title, description }: ComingSoonProps) => {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>

      <Card className="shadow-soft">
        <CardContent className="p-24 text-center">
          <Construction className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
          <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            This module is currently under development. Stay tuned for updates!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComingSoon;

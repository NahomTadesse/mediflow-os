import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
}

const ComingSoon = ({ title, description }: ComingSoonProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="pt-16 lg:pt-0 p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Header */}
          <header className="hidden lg:block mb-8 lg:mb-12">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                {title}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mt-3">
                {description}
              </p>
            </div>
          </header>

          {/* Mobile Header */}
          <header className="lg:hidden mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {title}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            </div>
          </header>

          {/* Coming Soon Card */}
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg max-w-2xl w-full">
              <CardContent className="p-12 sm:p-16 lg:p-24 text-center">
                <Construction className="h-16 w-16 sm:h-20 sm:w-20 mx-auto text-muted-foreground mb-6" />
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                  Coming Soon
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto">
                  This module is currently under development. Stay tuned for
                  updates!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;

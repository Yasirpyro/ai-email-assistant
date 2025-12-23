import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layers, FileText, Mail } from "lucide-react";

interface QuickActionsProps {
  onClose?: () => void;
}

export const QuickActions = memo(function QuickActions({ onClose }: QuickActionsProps) {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    onClose?.();
    navigate(path);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className="text-xs h-8 bg-background/50 border-border/50 hover:bg-primary/10 hover:border-primary/50"
        onClick={() => handleNavigate("/services")}
      >
        <Layers className="w-3.5 h-3.5 mr-1.5" />
        Explore Services
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-xs h-8 bg-background/50 border-border/50 hover:bg-primary/10 hover:border-primary/50"
        onClick={() => handleNavigate("/contact")}
      >
        <FileText className="w-3.5 h-3.5 mr-1.5" />
        Request a Quote
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-xs h-8 bg-background/50 border-border/50 hover:bg-primary/10 hover:border-primary/50"
        onClick={() => handleNavigate("/contact")}
      >
        <Mail className="w-3.5 h-3.5 mr-1.5" />
        Contact
      </Button>
    </div>
  );
});

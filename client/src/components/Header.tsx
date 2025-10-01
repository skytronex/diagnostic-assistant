import ThemeToggle from "./ThemeToggle";
import { Activity } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground" data-testid="text-header-title">F-S AIPE Platform</h2>
            <p className="text-xs text-muted-foreground">Healthcare AI Education</p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}

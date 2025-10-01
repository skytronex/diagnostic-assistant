import { Card } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CodeViewerProps {
  code: string;
  title?: string;
  language?: string;
}

export default function CodeViewer({ code, title, language = "plaintext" }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      {title && (
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground" data-testid="text-code-title">{title}</h4>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            data-testid="button-copy-code"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      )}
      <Card className="bg-[hsl(220,20%,18%)] border-[hsl(220,15%,24%)] overflow-hidden">
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm font-mono text-white/90" data-testid="text-code-content">
            {code}
          </code>
        </pre>
      </Card>
    </div>
  );
}

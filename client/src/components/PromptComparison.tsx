import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CodeViewer from "./CodeViewer";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { PromptExample } from "@shared/schema";

interface PromptComparisonProps {
  example: PromptExample;
}

export default function PromptComparison({ example }: PromptComparisonProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold mb-2" data-testid="text-comparison-title">{example.title}</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Traditional Approach
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeViewer code={example.traditional.prompt} />
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Issues:</p>
              <ul className="space-y-1">
                {example.traditional.issues.map((issue, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2" data-testid={`text-issue-${idx}`}>
                    <span className="text-destructive mt-1">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              F-S AIPE Approach
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeViewer code={example.optimized.prompt} />
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Benefits:</p>
              <ul className="space-y-1">
                {example.optimized.benefits.map((benefit, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2" data-testid={`text-benefit-${idx}`}>
                    <span className="text-primary mt-1">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {example.metrics && example.metrics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {example.metrics.map((metric, idx) => (
                <div key={idx} className="space-y-2" data-testid={`metric-${idx}`}>
                  <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                  <div className="flex items-baseline gap-3">
                    <Badge variant="outline" className="text-destructive border-destructive/30" data-testid={`metric-before-${idx}`}>
                      {metric.before}{metric.unit}
                    </Badge>
                    <span className="text-muted-foreground">→</span>
                    <Badge variant="outline" className="text-primary border-primary/30" data-testid={`metric-after-${idx}`}>
                      {metric.after}{metric.unit}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

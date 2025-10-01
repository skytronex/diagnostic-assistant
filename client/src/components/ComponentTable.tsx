import { Component } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface ComponentTableProps {
  components: Component[];
  title?: string;
}

export default function ComponentTable({ components, title = "Core Components" }: ComponentTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle data-testid="text-components-title">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {components.map((component, index) => (
            <div key={index} className="border-l-4 border-l-primary pl-4" data-testid={`component-item-${index}`}>
              <div className="flex items-start gap-3 mb-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1" data-testid={`text-component-name-${index}`}>
                    {component.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2" data-testid={`text-component-description-${index}`}>
                    {component.description}
                  </p>
                  {component.impact && (
                    <p className="text-sm font-medium text-primary" data-testid={`text-component-impact-${index}`}>
                      Impact: {component.impact}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

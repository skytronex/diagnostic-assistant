import { useState } from "react";
import Hero from "@/components/Hero";
import ChallengeCard from "@/components/ChallengeCard";
import ComponentTable from "@/components/ComponentTable";
import PromptComparison from "@/components/PromptComparison";
import Header from "@/components/Header";
import { challengesData, promptExamples } from "@/lib/challenges-data";
import { ChallengeArea } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeArea | null>(null);

  const handleExplore = (id?: ChallengeArea) => {
    if (id) {
      setSelectedChallenge(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSelectedChallenge(challengesData[0].id);
      setTimeout(() => {
        const element = document.getElementById('challenges-section');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleBack = () => {
    setSelectedChallenge(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedChallengeData = selectedChallenge 
    ? challengesData.find(c => c.id === selectedChallenge)
    : null;

  const selectedExamples = selectedChallenge
    ? promptExamples.filter(e => e.challengeArea === selectedChallenge)
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {!selectedChallenge ? (
        <>
          <Hero onExplore={() => handleExplore()} />
          
          <section id="challenges-section" className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-challenges-heading">
                  Five Core Healthcare Challenges
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Full-Stack AI Prompt Engineers bridge critical gaps across data privacy, quality, bias mitigation, 
                  cost efficiency, and regulatory compliance through intelligent system design.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challengesData.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    {...challenge}
                    onExplore={handleExplore}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Built for Healthcare Administrators
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Understanding F-S AIPE principles enables informed decision-making about AI adoption, 
                  risk management, and strategic implementation across your healthcare organization.
                </p>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="mb-8"
              data-testid="button-back-to-overview"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Overview
            </Button>

            {selectedChallengeData && (
              <div className="space-y-12">
                <div>
                  <h1 className="text-4xl font-bold mb-4" data-testid="text-detail-title">
                    {selectedChallengeData.title}
                  </h1>
                  <p className="text-lg text-muted-foreground" data-testid="text-detail-description">
                    {selectedChallengeData.description}
                  </p>
                </div>

                <Tabs defaultValue="components" className="w-full">
                  <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="components" data-testid="tab-components">
                      Core Components
                    </TabsTrigger>
                    <TabsTrigger value="examples" data-testid="tab-examples">
                      Live Examples
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="components" className="mt-8">
                    <ComponentTable 
                      components={selectedChallengeData.components}
                      title={`${selectedChallengeData.title} Components`}
                    />
                  </TabsContent>

                  <TabsContent value="examples" className="mt-8 space-y-12">
                    {selectedExamples.length > 0 ? (
                      selectedExamples.map((example) => (
                        <PromptComparison key={example.id} example={example} />
                      ))
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        No examples available for this challenge area yet.
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

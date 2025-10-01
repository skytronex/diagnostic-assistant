import ChallengeCard from '../ChallengeCard';

export default function ChallengeCardExample() {
  return (
    <div className="p-8">
      <ChallengeCard
        id="privacy"
        title="Data Privacy & Security"
        icon="Shield"
        description="Implementing prompt-level data minimization and security layers to protect Protected Health Information (PHI)"
        color="chart-1"
        onExplore={(id) => console.log('Explore:', id)}
      />
    </div>
  );
}

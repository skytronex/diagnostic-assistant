import Hero from '../Hero';

export default function HeroExample() {
  return <Hero onExplore={() => console.log('Explore clicked')} />;
}

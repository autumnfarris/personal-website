import Hero from './components/sections/Hero';
import About from './components/sections/About';

export default function HomePage() {
  return (
    <div className="relative">
      <Hero />
      <About />
    </div>
  );
}
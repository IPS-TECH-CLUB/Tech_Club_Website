import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}

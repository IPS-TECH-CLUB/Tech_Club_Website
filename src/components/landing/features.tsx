import React from 'react';
import { Container } from '@/components/ui/container';

const features = [
  {
    title: 'Workshops & Events',
    description:
      'Regular workshops, hackathons, and tech talks featuring industry experts and cutting-edge technologies.',
  },
  {
    title: 'Collaborative Projects',
    description: 'Work on real-world projects with fellow members and build your portfolio.',
  },
  {
    title: 'Networking',
    description: 'Connect with like-minded individuals, mentors, and potential collaborators.',
  },
  {
    title: 'Learning Resources',
    description:
      'Access curated learning materials, tutorials, and study groups for various technologies.',
  },
];

export const Features: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What We Offer
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Empowering students to excel in technology through hands-on learning and collaboration.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

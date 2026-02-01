import React from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-[#F5F1E8] py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Tag */}
          <div className="mb-8 flex justify-center">
            <div className="inline-block rounded-full bg-[#C8D8E4] px-6 py-2">
              <p className="text-sm font-medium text-[#0A2463]">
                Where People are collaborating and developing things which matters.
              </p>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-center text-5xl font-bold uppercase leading-tight tracking-tight text-[#0A2463] md:text-7xl">
            IPS TECH CLUB
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-black">
            Tatva X is now live on YouTube! Watch the full session to explore ideas, innovation, and
            real-world tech discussions. Join our growing community, connect with like-minded
            builders, and be part of something meaningful. Don’t miss out! 🚀
          </p>

          {/* CTA Button */}
          <div className="mt-10 flex justify-center">
            <Link href={siteConfig.links.whatsapp || '#'} target="_blank" rel="noreferrer">
              <Button
                size="lg"
                className="bg-[#0A2463] px-8 py-3 text-base font-semibold text-white hover:bg-[#0A2463]/90"
              >
                Join Us
              </Button>
            </Link>
          </div>

          {/* Illustration */}
          <div className="mt-16">
            <Image
              src="/landing/hero-section.png"
              alt="People collaborating and working together"
              width={900}
              height={400}
              className="w-full"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

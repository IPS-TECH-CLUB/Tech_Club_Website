import React from 'react';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-gray-50">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold">{siteConfig.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{siteConfig.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Quick Links</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#about" className="text-sm text-gray-600 hover:text-gray-900">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#events" className="text-sm text-gray-600 hover:text-gray-900">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-sm text-gray-600 hover:text-gray-900">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Connect</h4>
              <ul className="mt-4 space-y-2">
                {siteConfig.links.github && (
                  <li>
                    <Link
                      href={siteConfig.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      GitHub
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

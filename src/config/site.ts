import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Tech Club',
  description: 'Join our community of tech enthusiasts and innovators',
  url: 'https://techclub.example.com',
  ogImage: 'https://techclub.example.com/og.jpg',
  links: {
    github: 'https://github.com/IPS-TECH-CLUB/Tech_Club_Website',
    discord: 'https://discord.gg/acptkJ6g',
    whatsapp: 'https://chat.whatsapp.com/IPquNx4cw1N9N4GbGbgDi3',
  },
};

export const navItems = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Community',
    href: '#community',
  },
  {
    title: 'About',
    href: '#about',
  },
  {
    title: 'Contact',
    href: '#contact',
  },
];

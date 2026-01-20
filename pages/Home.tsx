import { useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { organizationSchema, serviceSchema, websiteSchema, injectStructuredData } from '@/utils/structuredData';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CloudPBXSection from '@/components/CloudPBXSection';
import PlansSection from '@/components/PlansSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

/**
 * Home Page - VoipCat Website
 * Modern Enterprise Blue Design System
 * Sections: Hero, About, Cloud PBX, Plans, Testimonials, Contact, Footer
 */
export default function Home() {
  useSEO({
    title: 'Enterprise VoIP & Business Communication Solutions | VOIP CAT',
    description: 'Discover enterprise-grade VoIP and business communication solutions. Secure, scalable, and feature-rich technology for businesses worldwide. Expert insights in our Knowledge Hub.',
    keywords: 'enterprise VoIP, business phone systems, cloud PBX, unified communications, VoIP security, hosted PBX, business communication, digital transformation',
    canonical: 'https://voipcat.com',
    ogImage: 'https://voipcat.com/images/og-image.png',
  });

  useEffect(() => {
    injectStructuredData(organizationSchema);
    injectStructuredData(websiteSchema);
    serviceSchema.forEach(schema => injectStructuredData(schema));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <CloudPBXSection />
        <PlansSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

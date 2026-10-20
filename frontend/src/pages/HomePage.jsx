import React from 'react';
import Box from '@mui/material/Box';
import { HeroSection } from '../components/landing/HeroSection';
import { ThreeViewsSection } from '../components/landing/ThreeViewsSection';
import { ProcessSection } from '../components/landing/ProcessSection';
import { FinalCta } from '../components/landing/FinalCta';

export function HomePage() {
  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      {/* 1. Hero with 4 drifting fact cards and Coral glow */}
      <HeroSection />

      {/* 2. Three views: Demand, Supply, Skill Gaps */}
      <ThreeViewsSection />

      {/* 3. Four-step "How each number is built" flow */}
      <ProcessSection />

      {/* 4. Trust Line and Closing Call to Action */}
      <FinalCta />
    </Box>
  );
}

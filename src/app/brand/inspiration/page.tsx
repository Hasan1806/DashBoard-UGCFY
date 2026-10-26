'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { InspirationLibrary } from '@/components/inspiration/InspirationLibrary';

export default function BrandInspirationPage() {
  return (
    <DashboardShell>
      <InspirationLibrary />
    </DashboardShell>
  );
}

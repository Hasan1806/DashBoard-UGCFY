'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { InspirationLibrary } from '@/components/inspiration/InspirationLibrary';

export default function CreatorInspirationPage() {
  return (
    <DashboardShell>
      <InspirationLibrary />
    </DashboardShell>
  );
}

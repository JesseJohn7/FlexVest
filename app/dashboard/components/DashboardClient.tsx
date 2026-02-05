'use client';

import { useState } from 'react';
import DashboardLayout, { DashboardSection } from './DashboardLayout';
import HomeSection from './HomeSection';
import HistorySection from './HistorySection';
import SavingsSection from './SavingsSection';
import SettingsSection from './SettingsSection';

interface DashboardClientProps {
  user: {
    name: string | null;
    email: string;
    image: string | null;
  };
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const [active, setActive] = useState<DashboardSection>('home');

  return (
    <DashboardLayout active={active} setActive={setActive}>
      {active === 'home' && <HomeSection user={user} setActive={setActive} />}
      {active === 'history' && <HistorySection />}
      {active === 'savings' && <SavingsSection />}
      {active === 'profile' && <SettingsSection />}
    </DashboardLayout>
  );
}
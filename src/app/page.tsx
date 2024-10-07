"use client"
import React from 'react';
import { I18nProvider } from '@/app/I18nProvider'; 
import Auth from '@/components/animation/animation';

export default function Home() {
  return (
    <I18nProvider>
      <div>
        <Auth />
      </div>
    </I18nProvider>
  );
}

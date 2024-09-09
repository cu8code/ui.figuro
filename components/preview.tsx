"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface PreviewContentProps {
  children: React.ReactNode;
}

export const PreviewContent: React.FC<PreviewContentProps> = ({ children }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="flex justify-center items-center w-full h-full min-h-52">
        {children}
      </CardContent>
    </Card>
  );
};

export default PreviewContent;

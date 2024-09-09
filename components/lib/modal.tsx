import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ResponsiveModalProps {
  title: string;
  children: React.ReactNode;
  triggerText: string;
}

export const ResponsiveModal: React.FC<ResponsiveModalProps> = ({ title, children, triggerText }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>{triggerText}</Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] transition-all duration-300 ease-in-out
        sm:rounded-lg sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%]
        fixed left-0 right-0 sm:bottom-auto sm:right-auto
        rounded-t-lg sm:rounded-b-lg max-h-[90vh] sm:max-h-[85vh] overflow-y-auto
        ${isOpen ? 'bottom-0' : '-bottom-full'} sm:bottom-auto
        `}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default ResponsiveModal;
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ length, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every(digit => digit !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length; i++) {
      if (!isNaN(Number(pastedData[i]))) {
        newOtp[i] = pastedData[i];
      }
    }

    setOtp(newOtp);
    if (newOtp.every(digit => digit !== '')) {
      onComplete(newOtp.join(''));
    }
    inputRefs.current[Math.min(pastedData.length, length - 1)]?.focus();
  };

  return (
    <div 
      className="flex flex-row justify-center items-center space-x-2" 
      role="group" 
      aria-labelledby="otp-input-label"
    >
      <label id="otp-input-label" className="sr-only">Enter your OTP</label>
      {otp.map((digit, index) => (
        <Input
          key={index}
          ref={el => inputRefs.current[index] = el}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={digit}
          onChange={e => handleChange(index, e.target.value)}
          onKeyDown={e => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-2xl border-2 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default OTPInput;
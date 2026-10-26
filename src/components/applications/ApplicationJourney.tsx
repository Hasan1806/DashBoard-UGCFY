'use client';

import React from 'react';
import {
  Check,
  Clock,
  Sparkles,
  ShieldCheck,
  X,
  RotateCcw,
} from 'lucide-react';
import { ApplicationStatus } from '@/types';

interface ApplicationJourneyProps {
  status: ApplicationStatus;
  appliedAt: string;
  isCompact?: boolean;
}

export function ApplicationJourney({
  status,
  appliedAt,
  isCompact = false,
}: ApplicationJourneyProps) {
  const formattedDate = new Date(appliedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });

  // Handle terminal/abnormal states accurately
  if (status === 'rejected') {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between text-[11px] text-[#777780] mb-1.5 font-medium">
          <span className="flex items-center gap-1.5 text-[#18181B]">
            <Check className="w-3.5 h-3.5 text-[#168365]" />
            Applied ({formattedDate})
          </span>
          <span className="flex items-center gap-1 text-zinc-500 font-semibold">
            <X className="w-3.5 h-3.5 text-zinc-400" />
            Pitch Declined
          </span>
        </div>
        <div className="relative h-1.5 w-full bg-[#E8E8EA] rounded-full overflow-hidden">
          <div className="h-full bg-zinc-400 w-full rounded-full" />
        </div>
      </div>
    );
  }

  if (status === 'withdrawn') {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between text-[11px] text-[#777780] mb-1.5 font-medium">
          <span className="flex items-center gap-1.5 text-[#18181B]">
            <Check className="w-3.5 h-3.5 text-[#168365]" />
            Applied ({formattedDate})
          </span>
          <span className="flex items-center gap-1 text-zinc-500 font-semibold">
            <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
            Withdrawn by You
          </span>
        </div>
        <div className="relative h-1.5 w-full bg-[#E8E8EA] rounded-full overflow-hidden">
          <div className="h-full bg-zinc-300 w-1/3 rounded-full" />
        </div>
      </div>
    );
  }

  // Active linear progress steps: Applied -> Under Review -> Shortlisted -> Accepted -> Workspace Active
  const steps = [
    { id: 'applied', label: 'Applied', date: formattedDate, done: true, current: false },
    {
      id: 'review',
      label: 'Under Review',
      done: status === 'shortlisted' || status === 'accepted',
      current: status === 'pending',
    },
    {
      id: 'shortlisted',
      label: 'Shortlisted',
      done: status === 'accepted',
      current: status === 'shortlisted',
    },
    {
      id: 'accepted',
      label: 'Accepted',
      done: status === 'accepted',
      current: false,
    },
  ];

  if (isCompact) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between text-[11px] mb-1.5">
          <span className="font-medium text-[#18181B]">
            {status === 'pending' && 'Awaiting Brand Review'}
            {status === 'shortlisted' && 'On Brand Shortlist ✨'}
            {status === 'accepted' && 'Collaboration Secured 🎉'}
          </span>
          <span className="text-[#777780] text-[10px]">
            {status === 'pending' && 'Step 2 of 4'}
            {status === 'shortlisted' && 'Step 3 of 4'}
            {status === 'accepted' && 'Ready for Production'}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="h-1.5 rounded-full bg-[#168365]" />
          <div
            className={`h-1.5 rounded-full transition-all ${
              status === 'shortlisted'
                ? 'bg-[#7456F1]'
                : status === 'accepted'
                ? 'bg-[#168365]'
                : 'bg-[#E8E8EA]'
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all ${
              status === 'accepted' ? 'bg-[#168365]' : 'bg-[#E8E8EA]'
            }`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-1">
      {/* Desktop Stepper */}
      <div className="relative flex items-center justify-between">
        {/* Connecting Background Line */}
        <div className="absolute left-3 right-3 top-3 -translate-y-1/2 h-0.5 bg-[#E8E8EA] -z-0" />
        
        {/* Progress Filled Line */}
        <div
          className="absolute left-3 top-3 -translate-y-1/2 h-0.5 bg-[#168365] transition-all duration-500 -z-0"
          style={{
            width:
              status === 'pending'
                ? '33%'
                : status === 'shortlisted'
                ? '66%'
                : status === 'accepted'
                ? '100%'
                : '0%',
          }}
        />

        {steps.map((step, idx) => {
          const isDone = step.done;
          const isCurrent = step.current;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all border ${
                  isDone
                    ? 'bg-[#168365] text-white border-[#168365]'
                    : isCurrent
                    ? 'bg-white text-[#7456F1] border-[#7456F1] ring-3 ring-[#EEE9FF]'
                    : 'bg-white text-[#777780] border-[#E8E8EA]'
                }`}
              >
                {isDone ? (
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                ) : isCurrent ? (
                  <span className="w-2 h-2 rounded-full bg-[#7456F1]" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1.5 font-medium whitespace-nowrap ${
                  isCurrent
                    ? 'text-[#7456F1] font-semibold'
                    : isDone
                    ? 'text-[#18181B]'
                    : 'text-[#777780]'
                }`}
              >
                {step.label}
              </span>
              {step.date && (
                <span className="text-[9px] text-[#777780] font-normal">{step.date}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

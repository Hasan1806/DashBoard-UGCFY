'use client';

import React from 'react';
import {
  Clock,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from 'lucide-react';
import { ApplicationStatus } from '@/types';

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function ApplicationStatusBadge({
  status,
  size = 'md',
  showIcon = true,
}: ApplicationStatusBadgeProps) {
  const config = {
    pending: {
      label: 'Pending Review',
      icon: Clock,
      bg: 'bg-zinc-100',
      text: 'text-zinc-700',
      border: 'border-zinc-200',
      dot: 'bg-zinc-400',
    },
    shortlisted: {
      label: 'Shortlisted',
      icon: Sparkles,
      bg: 'bg-[#EEE9FF]',
      text: 'text-[#7456F1]',
      border: 'border-[#7456F1]/25',
      dot: 'bg-[#7456F1]',
    },
    accepted: {
      label: 'Accepted & Locked',
      icon: CheckCircle2,
      bg: 'bg-[#EFF8F5]',
      text: 'text-[#168365]',
      border: 'border-[#168365]/25',
      dot: 'bg-[#168365]',
    },
    rejected: {
      label: 'Declined',
      icon: XCircle,
      bg: 'bg-zinc-100',
      text: 'text-zinc-600',
      border: 'border-zinc-200',
      dot: 'bg-zinc-400',
    },
    withdrawn: {
      label: 'Withdrawn',
      icon: RotateCcw,
      bg: 'bg-zinc-100',
      text: 'text-zinc-500',
      border: 'border-zinc-200',
      dot: 'bg-zinc-400',
    },
  }[status] || {
    label: status,
    icon: Clock,
    bg: 'bg-zinc-100',
    text: 'text-zinc-700',
    border: 'border-zinc-200',
    dot: 'bg-zinc-400',
  };

  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-xs px-3 py-1.5 gap-2 font-semibold',
  }[size];

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border ${config.bg} ${config.text} ${config.border} ${sizeClasses} transition-all`}
    >
      {showIcon && <Icon className={`${iconSizeClasses} stroke-[2] shrink-0`} />}
      <span>{config.label}</span>
    </span>
  );
}

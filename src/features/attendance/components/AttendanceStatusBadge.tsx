import { AttendanceStatus } from '@/types/attendance'
import React from 'react'
import { ATTENDANCE_STATUS_META } from '../constants/status';
interface AttendanceStatusBadgeProps{
    status: AttendanceStatus;
}
export default function AttendanceStatusBadge({status} : AttendanceStatusBadgeProps) {
    const meta = ATTENDANCE_STATUS_META[status]
  return (
    
    <span
      className={`
        inline-flex items-center
        px-2 py-1
        rounded-full
        text-xs font-medium
        ${meta.className}
      `}
      >
        {meta.label}

    </span>
  );
}

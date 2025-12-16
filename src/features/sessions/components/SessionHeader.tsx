import { Session } from "@/types/session";
import React from "react";

export default function SessionHeader({ session }: Session) {
  return (
    <div className="w-full bg-dark p-5 ">
      <div className="flex ">
        <span>تاریخ جلسه:</span>
        <span>{session.date}</span>
      </div>
      <div>
        <span>{session.start_time}</span>
        <span>ساعت شروع جلسه:</span>
      </div>
      <div>
        <span>ساعت پایان جلسه:</span>
        <p>{session.end_time}</p>
      </div>

    
    </div>
  );
}

import { getAttendanceBySessionId } from "@/features/attendance/api/getAttendanceBySessionId";
import AttendanceClient from "../AttendnceClient";
import { getSessionById } from "@/features/sessions/api/getSessionById";
import SessionHeader from "@/features/sessions/components/SessionHeader";
import SessionNote from "@/features/sessions/components/SessionNote";

interface Props {
  params: {
    classId: string;
    sessionId: string;
  };
}

export default async function AttendancePage({ params }: Props) {
  const classId = Number(params.classId);
  const sessionId = Number(params.sessionId);
  const initialAttendance = await getAttendanceBySessionId(sessionId);
  const session = await getSessionById(sessionId)
console.log(session)
  return (
    <>
      <SessionHeader session={session} />
      <SessionNote sessionId={session.id} note={session.note} />
      <AttendanceClient
        initialAttendance={initialAttendance}
        classId={classId}
        sessionId={sessionId}
      />
    </>
  );
}

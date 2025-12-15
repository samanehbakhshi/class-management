"use client";
import Pagination from "@/components/pagination/Pagination";
import AddSessionButton from "@/features/sessions/components/AddSessionButton";
import SessionsTable from "@/features/sessions/components/SessionTable";
import { useSessions } from "@/features/sessions/hooks/useSessions";
import React, { useState } from "react";

interface Props {
  classId: number;
}

export default function ClassSessionsClient({ classId }: Props) {
  const [page, setPage] = useState(1);
  const limit: number = 10;
  const {
    data: sessions,
    isLoading,
    isError,
  } = useSessions({ classId, page, limit });
console.log(classId)
  return (
    <div>
      <h1>جزئیات کلاس</h1>
      <p>کلاس: {classId}</p>
      <SessionsTable sessions={sessions?.data} />
      {/* Pagination */}
      {sessions?.total && (
        <Pagination
          page={page}
          limit={limit}
          total={sessions?.total}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
      <AddSessionButton classId={classId} />
    </div>
  );
}

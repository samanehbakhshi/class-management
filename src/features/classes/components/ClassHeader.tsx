interface ClassHeaderProps {
  classData: {
    name: string;
    teacher: string;
    subject: string;
    start_date: string;
  };
}

export default function ClassHeader({ classData }: ClassHeaderProps) {
  return (
    <div className="border rounded p-4 bg-gray-50  dark:bg-dark">
      <h2 className="text-xl font-semibold">{classData.name}</h2>
      <p>معلم: {classData.teacher}</p>
      <p>موضوع: {classData.subject}</p>
      <p>تاریخ شروع: {classData.start_date}</p>
    </div>
  );
}

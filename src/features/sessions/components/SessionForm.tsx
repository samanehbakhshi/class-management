import GeneralForm from '@/components/form/GeneralForm';
import React from 'react'
import { useCreateSession } from '../hooks/useCreateSession';
import { useUpdateClass } from '@/features/classes/hooks/useUpdateClass';
import useClass from '@/features/classes/hooks/useClass';
import { sessionSchema } from '../validaiton';
type Props = {
    classId: number | undefined;
    editId: number | undefined;
    isOpen: boolean;
    onClose: ()=> void;
}

export default function SessionForm({onClose , isOpen, classId, editId}: Props) {
  const defaultValues = {
    date: undefined,
    id: undefined,
    end_time: undefined,
    start_time: undefined,
  }; 
  const classFormConfig = [
    
    { name: "date", label: "تایخ ", type: "date", required: true },
    { name: "start_time", label: "زمان شروع", type: "time", required: true },
    { name: "end_time", label: "زمان پایان", type: "time", required: true },
  ];


 

  const createMutation = useCreateSession();
  const updateMutation = useUpdateClass();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        {editId ? "ویرایش جلسه" : "افزودن جلسه"}
      </h2>

      <GeneralForm
        config={classFormConfig}
        editId={editId}
        createItem={createMutation}
        updateItem={updateMutation}
        onClose={onClose}
        useGetItem={useClass}
        defaultValues={defaultValues}
        schema={sessionSchema}
        extraCreatePayload={{
          class_id: classId!,
        }}
      />
    </div>
  );
}

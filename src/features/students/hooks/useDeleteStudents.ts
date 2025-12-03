"use client";
import { useMutation, useQueryClient } from '@tanstack/react-query';
 import React from 'react'
import { deleteStudent } from '../api/deleteStudent';
 
 export default function useDeleteStudents() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number)=> deleteStudent(id),
        onSuccess:() =>{
            queryClient.invalidateQueries({queryKey: ["students"]});
        },
        onError: (err: any)=> {
            console.error(err)
        }
    })
 }
 
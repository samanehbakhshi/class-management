export interface GetStudentsParams {
    search?: string;
    page?: number;
    limit?: number;
    filters?: {
        class_id?: number;
        province?: string;
        city?: string;

    }
}
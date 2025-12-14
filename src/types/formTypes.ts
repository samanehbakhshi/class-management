export type FormFieldType =
  | "text"
  | "email"
  | "number"
  | "time"
  | "select"
  | "textarea"
  | "date"
  | "checkbox";

export interface FormFieldConfig {
  name: string; // field key
  label: string; // UI label
  type: FormFieldType; // input type
  required?: boolean; // is field required?
  placeholder?: string; // placeholder text
  options?: {
    // for selects
    value: string | number;
    label: string;
  }[];
  fullWidth?: boolean; // optional styling helper
}

export type FormConfig = FormFieldConfig[];

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Institute {
  id: string;
  name: string;
  email: string;
  image: string;
  password: string;
  numberOfCourses: number;
  numberOfTeachers: number;
}

export interface TableData {
  [key: string]: any;
}

export interface TableHeader {
  label: string;
}

export interface TableProps {
  tableHeader: TableHeader[];
  tableData: TableData[];
  isEdit?: boolean;
  isDelete?: boolean;
}

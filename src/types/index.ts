export type InitialValue = {
  initialValue: string | number;
  required?: string;
  min?: { value: number; message: string };
  max?: { value: number; message: string };
};

export type InputsSchema = {
  [key: string]: InitialValue;
};

export type InputErrorType = {
  [key: string]: string | undefined;
};

export type InputValue = {
  [key: string]: string | number;
};
export type Book = {
  id: number;
  bookName: string;
  bookPrice: number;
  bookCover: string | ArrayBuffer;
};

export type CartItems = {
  id: number;
  bookName: string;
  bookCover: string | ArrayBuffer;
  bookPrice: number;
  quantity: number;
};

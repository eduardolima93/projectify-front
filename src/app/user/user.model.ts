export interface User {
  readonly id?: number | string;
  readonly name?: string;
  email?: string;
  password?: string;
  about?: string;
  skills?: Array<string>;
  coursing?: string;
}

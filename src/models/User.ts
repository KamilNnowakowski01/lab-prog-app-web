export interface User {
  id: string;
  name: string;
  role: 'admin' | 'devops' | 'developer';
  idAuth?: string,
  email?: string,
}
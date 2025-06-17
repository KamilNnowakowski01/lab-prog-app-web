export interface User {
  id: string;
  username: string;
  passwordHash: string;
  name: string;
  role: 'admin' | 'devops' | 'developer';
}
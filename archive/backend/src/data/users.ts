import bcrypt from 'bcrypt';
import { User } from '../models/User';

const hash = (password: string) => bcrypt.hashSync(password, 10);

export const users: User[] = [
  {
    id: "50a14f08-5211-44c8-8459-a73621002468",
    username: "jan.kowalski",
    passwordHash: hash("test123"),
    name: "Jan Kowalski",
    role: "admin",
  },
  {
    id: "60adb20c-c72a-4d6e-b655-3174a258bb40",
    username: "anna.nowak",
    passwordHash: hash("test123"),
    name: "Anna Nowak",
    role: "developer",
  },
  {
    id: "f29ed2e9-8d67-4792-87d5-6a32cc6b59f9",
    username: "marek.wisniewski",
    passwordHash: hash("test123"),
    name: "Marek Wiśniewski",
    role: "devops",
  },
  {
    id: "641329fc-6e50-416e-88a8-342b847a22a3",
    username: "katarzyna.wojcik",
    passwordHash: hash("test123"),
    name: "Katarzyna Wójcik",
    role: "devops",
  },
  {
    id: "2ef36326-2679-4ccd-89ca-a44112a7ca5a",
    username: "tomasz.zielinski",
    passwordHash: hash("test123"),
    name: "Tomasz Zieliński",
    role: "developer",
  },
  {
    id: "54a98ab0-273e-4650-a141-9852be49c4e1",
    username: "agnieszka.dabrowska",
    passwordHash: hash("test123"),
    name: "Agnieszka Dąbrowska",
    role: "developer",
  },
];

import { Admin, Member } from "./classes.js";

const systemAdmin = new Admin("Master Admin", "A-101");
const ADMIN_PASSCODE = "admin123";

const libraryInventory = new Map();

libraryInventory.set("978-0141439518", {
  title: "Pride and Prejudice",
  author: "Jane Austen",
  genre: "Classic Fiction",
  publicationYear: 1813,
  publisher: "Penguin Classics",
  totalCopies: 4,
  availableCopies: 4,
  location: "Shelf A-1",
  coverUrl: "https://placehold.co",
  addedAt: "2026-01-15T09:30:00Z"
});

libraryInventory.set("978-0451524935", {
  title: "1984",
  author: "George Orwell",
  genre: "Dystopian",
  publicationYear: 1949,
  publisher: "Signet Classics",
  totalCopies: 5,
  availableCopies: 2,
  location: "Shelf A-3",
  coverUrl: "https://placehold.co",
  addedAt: "2026-02-10T14:15:00Z"
});

const registeredMembers = new Map();
registeredMembers.set("M-101", new Member("Alice Johnson", "M-101"));
registeredMembers.set("M-102", new Member("Bob Smith", "M-102"));

export { libraryInventory, registeredMembers, systemAdmin, ADMIN_PASSCODE };

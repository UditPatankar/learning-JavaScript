class User {
   constructor(name, id, role) {
      this.name = name;
      this.id = id;
      this.role = role;
   }
}

class Admin extends User {
   constructor(name, id) {
      super(name, id, "admin");
   }

   addBook(libraryInventory, isbn, title, author, genre, publicationYear, publisher) {
      if (libraryInventory.has(isbn)) {
         const existingBook = libraryInventory.get(isbn);
         existingBook.totalCopies += 1;
         existingBook.availableCopies += 1;
         
         return { 
            success: true, 
            message: `Restocked "${existingBook.title}". Total copies: ${existingBook.totalCopies}.` 
         };
      }

      const newBook = {
         title: title,
         author: author,
         genre: genre,
         publicationYear: Number(publicationYear),
         publisher: publisher,
         totalCopies: 1,
         availableCopies: 1,
         location: "Shelf TBD",
         coverUrl: `https://placehold.co{encodeURIComponent(title)}`,
         addedAt: new Date().toISOString()
      };

      libraryInventory.set(isbn, newBook);
      
      return { 
         success: true, 
         message: `Successfully added "${title}" to the inventory.` 
      };
   }

   removeBook(libraryInventory, isbn) {
      if (!libraryInventory.has(isbn)) {
         return { 
            success: false, 
            message: `Error: Book with ISBN ${isbn} does not exist in inventory.` 
         };
      }
      
      const bookTitle = libraryInventory.get(isbn).title;
      libraryInventory.delete(isbn);
      
      return { 
         success: true, 
         message: `Successfully removed "${bookTitle}" from the system.` 
      };
   }
}

class Member extends User {
   constructor(name, id) {
      super(name, id, "member");
      this.borrowedBooks = [];
      this.maxLimit = 3;
   }

   borrowBook(libraryInventory, isbn) {
      if (!libraryInventory.has(isbn)) {
         return { success: false, message: "Book does not exist in our library." };
      }

      const book = libraryInventory.get(isbn);

      if (this.borrowedBooks.length >= this.maxLimit) {
         return { success: false, message: `Limit reached. Max limit is ${this.maxLimit} books.` };
      }

      if (this.borrowedBooks.includes(isbn)) {
         return { success: false, message: `You have already borrowed a copy of "${book.title}".` };
      }

      if (book.availableCopies <= 0) {
         return { success: false, message: `"${book.title}" is currently out of stock.` };
      }

      book.availableCopies -= 1;
      this.borrowedBooks.push(isbn);

      return { success: true, message: `Successfully borrowed "${book.title}".` };
   }

   returnBook(libraryInventory, isbn) {
      const bookIndex = this.borrowedBooks.indexOf(isbn);
      if (bookIndex === -1) {
         return { success: false, message: "You haven't borrowed this book." };
      }

      if (!libraryInventory.has(isbn)) {
         this.borrowedBooks.splice(bookIndex, 1);
         return { success: true, message: "Book returned (Title was missing from globally stored stock)." };
      }

      const book = libraryInventory.get(isbn);
      book.availableCopies += 1;
      this.borrowedBooks.splice(bookIndex, 1);

      return { success: true, message: `Successfully returned "${book.title}".` };
   }
}

export { Admin, Member };

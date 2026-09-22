const BASE = "https://jsonplaceholder.typicode.com";
async function fetchHelper(URL, options) {
   const response = await fetch(URL, options);
   if(!response.ok) throw new Error(`HTTP Error: ${response.status}`);
   return await response.json();
}
// 1. Use fetch() to retrieve a list of users from https://jsonplaceholder.typicode.com/users and log the names to the console
async function task1() {
   console.log("     --- TASK 1 ---      ");
   try {
      const users = await fetchHelper(`${BASE}/users`);
      if(!users) console.log("No users list!");
      users.forEach((user) => {
         console.log(user.username);
      });
   }
   catch(error) {
      console.error(error);
   }
}

// 2. Fetch all posts by userId=1 from https://jsonplaceholder.typicode.com/posts?userId=1 and display the titles in the DOM
async function task2() {
   console.log("     --- TASK 2 ---      ");
   try {
      const queryString = new URLSearchParams({userId: 1}).toString();
      const posts = await fetchHelper(`${BASE}/posts?${queryString}`);

      const task2El = document.getElementById("task-2");
      const frag = document.createDocumentFragment();
      posts.forEach((post) => {
         const pEl = document.createElement("p");
         pEl.innerText = post.title;
         frag.append(pEl);
         console.log(pEl);
      });
      task2El.append(frag);
   }
   catch(error) {
      console.error(error);
   }
}

// 3. Send a POST request to https://jsonplaceholder.typicode.com/posts with a new post (title, body, userId). Show the response in console
async function task3() {
   console.log("     --- TASK 3 ---      ");
   try {
      const response = await fetchHelper(`${BASE}/posts`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({title: 'creating a new resource', userId: 1, body: 'content of my post'}),
      });
      console.log(response);
   }
   catch(error) {
      console.error(error);
   }
}

// 4. Update the post with ID = 1 by sending a PUT request with a new title and body. Use the same endpoint
async function task4() {
   console.log("     --- TASK 4 ---      ");
   try {
      const response = await fetchHelper(`${BASE}/posts/1`, {
         method: "PUT",
         headers : { 'Content-Type': 'application/json' },
         body: JSON.stringify({ title: "new title by PUT", body: 'new updated content for same post' }),
      });
      console.log(response);  // you will lose the userId coz you did not passed it 
   }
   catch(error) {
      console.error(error);
   }
}

// 5. Send a PATCH request to update just the title of post ID = 1
async function task5() {
   console.log("     --- TASK 5 ---      ");
   try {
      const response = await fetchHelper(`${BASE}/posts/1`, {
         method: "PATCH",
         headers : { 'Content-Type': 'application/json' },
         body: JSON.stringify({ title: "new title by PATCH" }),
      });
      console.log(response);  // only title gets updated rest stays intact
   }
   catch(error) {
      console.error(error);
   }
}

// 6. Send a DELETE request to remove post with ID = 1. Log the status of the response
async function task6() {
   console.log("     --- TASK 6 ---      ");
   try {
      const response = await fetch(`${BASE}/posts/1`, { method: "DELETE", });
      console.log("response status:", response.status);  // delete mostly do not sends a body or sends empty body
   }
   catch(error) {
      console.error(error);
   }
}

// 7. Send a POST request to https://jsonplaceholder.typicode.com/posts with Content-Type: application/json in headers. Log the response
async function task7() {
   console.log("     --- TASK 7 ---      ");
   try {
      const response = await fetchHelper(`${BASE}/posts`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({title: 'Testing Task 7', userId: 1, body: 'an valid JSON gift'}),
      });
      console.log(response);  
   }
   catch(error) {
      console.error(error);
   }
}

// 8. Create a custom function request(url, options) that wraps fetch. Use it to GET users and POST a new post
async function request(URL, options) {
   const response = await fetch(URL, options);
   if(!response.ok) throw new Error(`HTTP Error: ${response.status}`);
   return await response.json();
}
async function task8() {
   console.log("     --- TASK 8 ---      ");
   try {
      // GET users
      const users = await request(`${BASE}/users`);
      if(!users) console.log("No users list!");
      users.forEach((user) => {
         console.log(user.username);
      });

      // POST new post
      const response = await request(`${BASE}/posts`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({title: 'creating a new resource', userId: 1, body: 'content of my post'}),
      });
      console.log(response);
   }
   catch(error) {
      console.error(error);
   }
}

// 9. Make a fetch call to a broken URL and use .catch() or try...catch to show a user-friendly error message
async function task9() {
   console.log("     --- TASK 9 ---      ");
   try {
      const users = await fetchHelper(`${BASE}/user`);
      if(!users) console.log("No users list!");
      users.forEach((user) => {
         console.log(user.username);
      });
   }
   catch(error) {
      console.error(error); 
      const errorDisplay = document.getElementById("error-message"); 
      if (errorDisplay) {
         errorDisplay.innerText = "Oops! We had trouble loading the users. Please try again later.";
      }
   }
}

// 10. Use AbortController to cancel a long-running fetch request (you can delay the response using a mock server or setTimeout)
async function task10() {
   console.log("     --- TASK 10 ---      ");
   try {
      const controller = new AbortController();
      const {signal} = controller;

      // start the fetch request with attached signal
      const fetchPromise = fetch(`${BASE}/users`, {signal});
      console.log("Fetch process has started....");

      // abort after 10ms
      setTimeout(() => {
         controller.abort();
         console.log("Abort triggered by timeout!");
      }, 10); 

      const response = await fetchPromise;
      const data = await response.json();
      console.log(data);
   }
   catch(error) { 
      if (error.name === 'AbortError') 
         console.error("Request was Aborted successfully!."); 
      else 
         console.error(error); 
   }
}

// RUNNER
(async function main() {
   await task1();
   await task2();
   await task3();
   await task4();
   await task5();
   await task6(); 
   await task7(); 
   await task8(); 
   await task9(); 
   await task10(); 
})().catch((error) => console.error(error));

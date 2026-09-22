// ==========================================
// 1. WHAT IS THE FETCH API?
// ==========================================
// fetch(URL, options) : returns a PROMISE
   // pending - the request is travelling over the network
   // fulfilled - you get a RESPONSE object ( Not the actual data yet )
   // rejected - ONLY on network failure (404 is NOT rejected! we need to handle this explicitly)

   // TWO-STAGE WAITING: 
   // fetch() -> promise#1 settles to (Response Object - header+status has arrived but BODY has NOT fully arrived yet)
   // response.json() -> promise#2 (actual parsed data)
   // why? bcoz the body trvales in CHUNKS (streaming) & json() waits for full body to arrive then parses it

// ==========================================
// 2. USING FETCH WITH ASYNC / AWAIT
// ==========================================
   async function basicGet() {
      console.log("       2. USING FETCH WITH ASYNC / AWAIT   ");
      console.log("Request going out... promise: pending");

      // stage 1 waiting:
      // Only this functions exe stops & control returns to the script
      // once this promise#1 is settles, control resumes here 
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

      // now we have the RESPONSE but not the actual data yet
      console.log('stage 1 waiting done:', {
         ok: response.ok,
         status: response.status,
         "content-type": response.headers.get("content-type"),
      });

      // stage 2 waiting:
      // wait for full BODY to arrive
      const data = await response.json();
      console.log("stage 2 waiting done (actual data):", data);
   }

// 3. HTTP Methods : 'verbs' of web
   // Every request tells the server what action to perform on a resource:
   // - GET    -> READ / fetch data (default method if omitted).
   // - POST   -> CREATE brand new resource.
   // - PUT    -> REPLACE an entire existing resource (omitted fields get erased/lost).
   // - PATCH  -> UPDATE specific fields of a resource (unmentioned fields stay untouched).
   // - DELETE -> REMOVE a resource.

   // same URL, diff method -> diff actions

// ==========================================
// 4. FETCH USAGE EXAMPLES
// ==========================================
   const BASE = "https://jsonplaceholder.typicode.com"
   // helper method for fetch logic
   async function getJSON(URL, options) { 
      const response = await fetch(URL, options);  // wait for response object to arrive
      if(!response.ok) throw new Error(`HTTP error: ${response.status}`);   // check manually if req was successful
      return await response.json();    // wait for the body to arrive, then parse it to JS object
   }

   async function fetchUsage() {
      console.log("       4. FETCH USAGE EXAMPLES   ");
      try {
         // - Getting Resources(GET)
         // Get the array of all the posts from the server
         const allPosts = await getJSON(`${BASE}/posts`);
         console.log("GET all Posts,", allPosts.length, "first post:", allPosts[0]);

         // - Query Params - extra info, inside the URL itself after "?"
         // ?key=value&key=value -> server uses this to FILTER/LIMIT the data
         // URLSearchParams().toString() turns {userId:1, _embed:"comments", _limit:2} into query string "userId=1&_embed=comments&_limit=2"
         const queryParamsString = new URLSearchParams({userId:1, _embed:"comments", _limit:2}).toString();
         const filteredPosts = await getJSON(`${BASE}/posts?${queryParamsString}`);
         console.log("query params → got", filteredPosts.length, "posts of userId 1:", filteredPosts);
         
         // - Creating Resource(POST) 
         //    you must declare that the method is POST,
         //    headers - the meta-data about request 'Content-Type": "application/json' tells the server:
         //    the body I am sending is JSON - so parse it as JSON
         //    JSON.stringify(newPost) converts the JS Object into JSON string stream
         const newPost = {userId: 1, title: "How to create new resource using fetch()", body: 'My post content...'};
         const result = await getJSON(`${BASE}/posts`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newPost),   // the actual PAYLOAD 
         });
         // JSONPlaceholder(fake API) echoes your object back + assigns new id, but actuallyre resource never got created & it's just an fine mimic
         console.log("POST created new post,", result);

         // - Custom Headers
         // Headers travel in the metadata envelope of the request packet.
         // Servers check headers FIRST (e.g. Authorization keys) to verify WHO you are 
         // you can also pass custom key-value pairs
         // server reads the header FIRST to verify, BEFORE reading the body or accessing the database.
         const customHeaderResult = await getJSON(`${BASE}/posts/1`, {
            headers: {
               'Content-Type': 'application/json',
               "Authorization": "Bearer my_secret_token_123", // standard auth credential
               "Custom-Header": "custom meta-data", // cutom key-value meta-data
            }
         });
         console.log("Custom Header, request accepted by server", customHeaderResult);

         // - Updating an entire Resource(PUT)
         // to update ENTIRE resource -> send full object
         // if you miss something - that's lost 
         const updatePost = {userId: 1, title: "How to update/replace the entire resource using fetch()", body: 'My post content...'};
         const updateResult = await getJSON(`${BASE}/posts/1`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatePost)
         });
         console.log("PUT updated post:", updateResult);

         // - Updating a part of Resource(PATCH)
         // update part -> send only what needs to change, rest stays intact
         const patchPost = {title: "How to update part of the resource using fetch()"};
         const patchResult = await getJSON(`${BASE}/posts/1`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(patchPost)
         });
         console.log("PATCH updated title of post:", patchResult);

         // - Deleting a Resource (DELETE)
         // Using raw fetch() gives us the Response object directly. Since DELETE operations 
         // mostly return empty bodies ({}), we only need to inspect metadata like delRes.status 
         // instead of reading and parsing the body stream with getJSON().
         const delRes = await fetch(`${BASE}/posts/1`, { method: 'DELETE' });
         console.log("DELETE result", delRes.status);
      }
      catch(error) {
         console.error("One of the operation was falied in fetchUsage()", error.message);
      }
   }

// ==========================================
// 5. Creating a Request Object
// ==========================================
   async function createRequest() {
      console.log("       5. Creating a Request Object   ");
      try {
         // create resources as plain js object(payload) 
         const newTodo1 = { userId: 3, title: "learn fetch completely", completed: false };
         const newTodo2 = { userId: 4, title: "learn Promises properly.", completed: true };

         // create default Option Object
         const defaultOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer secret_token_321" }
         }

         // create REQUEST Object - 
         // Request( 
            // Argument 1: Where to go (Server address / URL), 
            // Argument 2: What to do when you get there (The action, the meta-data, the payload)
         // )
         const req1 = new Request(`${BASE}/todos`, {
            ...defaultOptions,
            body: JSON.stringify(newTodo1)
         });
         const req2 = new Request(`${BASE}/todos`, {
            ...defaultOptions,
            body: JSON.stringify(newTodo2)
         })

         const res1 = await getJSON(req1);
         console.log("response for REQUEST 1", res1);
         const res2 = await getJSON(req2);
         console.log("response for request 2", res2);
      }
      catch(err){
         console.error(err.message);
      }
   }

// ==========================================
// 6. Handling Response 
// ==========================================
   async function handleResponse() {
      console.log("       6. Handling Response    ");
      const response = await fetch(`${BASE}/users/1`);

      // the RESPONSE object arrived but not the full body yet.
      console.log(
         "ok           →", response.ok,     // true only for 200–299
         "\nstatus       →", response.status,// 200
         "\nfinal url    →", response.url,   // url after redirects
         "\ncontent-type →", response.headers.get("content-type"),
      );

      // body-reading methods, pick per content-type:
      //   .json() → parse JSON   |   .text() → plain text   |   .blob() → files
      const user = await response.json();
      console.log("parsed user:", user.name);

      // ### EDGE CASE: body can be consumed ONLY ONCE (it's a stream!)
      try {
         await response.json(); // trying to read the SAME body again
      } catch (err) {
         console.error("reading body twice →", err.message); // body already read!
      }
      // need data twice? store the parsed result in a variable first.
   }

// ==========================================
// 7. Handling Errors
// ==========================================
   async function handleErrors() {
      console.log("       7. Handling Errors   ");
      try {
         // THE TRAP: fetch does NOT reject a promise on 404/500!
         // a 404 means the HTTP conversation itself SUCCEEDED (reached the server/server replied!).
         // fetch rejects ONLY when the request couldn't even happen: could not even reach the server
         //    no internet, DNS fail, server unreachable, blocked by CORS...

         // family 1 demo — fetch rejects ITSELF (network-level failure):
         try {
            await fetch("https://no-such-domain-om123.xyz");
         } catch (err) {
            console.error("Family 1 : network fail →", err.name, "-", err.message);
         }

         // family 2 demo — HTTP error: fetch is perfectly "happy", WE must throw:
         const res404 = await fetch(`${BASE}/posts/9999`); 
         console.log("Family 2: 404 case → ok:", res404.ok, "| status:", res404.status, "| but NO error thrown!");

         // this throw sends control to the catch below
         if (!res404.ok) throw new Error(`HTTP Error: ${res404.status}`);
      } catch (err) {
         console.error("caught →", err.message); // our manually-thrown HTTP error lands here
      }

      // FINAL MENTAL MODEL — try/catch around await fetch catches 3 families:
      // 1. network errors  → fetch itself rejected (TypeError: fetch failed)
      // 2. HTTP errors     → WE threw after checking !response.ok (404/500...)
      // 3. our own bugs    → typos, undefined vars, bad .json() parse... same catch
   }

// ==========================================
// 8. CANCELING A REQUEST (AbortController)
// ==========================================
// WHAT THIS MEANS:
// Sometimes a request takes too long, or the user navigates away/types something new.
// You can use AbortController to CANCEL an in-flight fetch request instantly.

async function cancelRequestDemo() {
   console.log("          8. CANCELING A REQUEST          ");

   // Step 1: Create a controller instance
   const controller = new AbortController();
   const { signal } = controller; // pull out its 'signal' property

   try {
      console.log("Starting a fetch request...");

      // Step 2: Pass the signal inside fetch options
      const fetchPromise = fetch(`${BASE}/posts`, { signal });

      // Step 3: Cancel (abort) the request after 50ms (before it finishes)
      setTimeout(() => {
         console.log("Time's up! Aborting request...");
         controller.abort(); // This cancels the network request!
      }, 50);

      const response = await fetchPromise;
      if(!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      console.log("Data received:", data);

   } catch (err) {
      // Step 4: Canceling throws an 'AbortError'
      if (err.name === "AbortError") {
         console.error("Request was successfully CANCELED by AbortController!");
      } else {
         console.error("Other error:", err.message);
      }
   }
}

// RUN all 
   async function main() {
      await basicGet();
      await fetchUsage();
      await createRequest();
      await handleResponse();
      await handleErrors();
      await cancelRequestDemo();
   }
   main().catch(err => console.error(err.message));
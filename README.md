# ieeetest
Solutions


<h1>Task 1</h1>


Ui


<img width="1600" height="1000" alt="image" src="https://github.com/user-attachments/assets/434dba57-cdf7-47d9-9ce5-c90e6dcebaeb" />

add on


<img width="1600" height="837" alt="image" src="https://github.com/user-attachments/assets/8a3a37c1-dc31-4611-994b-86d38a55134b" />


<h1>Task 2</h1>
This project features a fully integrated Node.js & Express REST API that manages the IEEE RITB Team Section dynamically. The React frontend automatically fetches, sorts, and renders the club members directly from the backend, completely eliminating static frontend data.

How It Works
GET /members: The React app calls this endpoint on page load. The backend automatically sorts all members by their hierarchyLevel (ensuring Chairpersons and leadership elegantly appear first in the grid) and serves them to the UI.
POST /members: Adds a new member to the database with strict integrity validation (e.g., USNs must be uniquely distinct and exactly 10 alphanumeric characters long).
DELETE /members/:usn: Securely removes a specific member from the UI based on their USN.
Running the Full-Stack System Locally
To experience the real-time database updates, you need to run both the frontend and backend servers simultaneously.

1. Start the Backend API: Open a terminal, navigate to the backend folder, and start the Express server (runs on port 3000):

bash
cd backend
node index.js
2. Start the Frontend App: Open a second terminal in the project root directory and start the Vite development server:

bash
npm run dev
⚡ Try the Live Update Magic
While both servers are running and you have your React webpage open (http://localhost:5173), open a third terminal (PowerShell) and inject a new member into the database using this command:

powershell
Invoke-RestMethod -Uri "http://localhost:3000/members" -Method Post -ContentType "application/json" -Body '{"name":"Demo User","usn":"1RV21CS999","chapter":"Web Development Team","role":"Frontend Developer","hierarchyLevel":4,"email":"demo@ieee.org","bio":"Just added via the REST API!"}'
(If you are on Mac/Linux, use cURL instead):

bash
curl -X POST http://localhost:3000/members -H "Content-Type: application/json" -d '{"name":"Demo User","usn":"1RV21CS999","chapter":"Web Development Team","role":"Frontend Developer","hierarchyLevel":4,"email":"demo@ieee.org","bio":"Just added via the REST API!"}'
The Result: Go to your browser and hit refresh. You will instantly see the new "Demo User" glassmorphic card seamlessly generated and inserted into the Team Section grid!

<h1>Task 3</h1>


##  **Part A — JavaScript (Counter Function)**

### ❌ Bugs Identified

1. **Closure issue with `var i`**

   * `var` is **function-scoped**, not block-scoped.
   * All `setTimeout` callbacks capture the **same final value** of `i` (`3`).

2. **Counter function never invoked**

   * `Counter()` is defined but not executed.

3. **No event binding**

   * `handleIncrement` exists but is not attached to any UI element.

---

###  Corrected Code

```javascript
function Counter() {
  let count = 0;

  const handleIncrement = () => {
    count = count + 1;
    console.log("Count is now: " + count);
    document.getElementById('display').innerText = count;
  };

  // Attach increment handler
  document
    .getElementById("incrementBtn")
    .addEventListener("click", handleIncrement);

  // Fix closure issue
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log("Iteration: " + i);
    }, 1000);
  }
}

// invoke function
Counter();
```

---

###  Explanation

| Issue           | Fix                   | Reason                                                       |
| --------------- | --------------------- | ------------------------------------------------------------ |
| `var i`         | replaced with `let i` | `let` creates block scope → each timeout keeps correct value |
| Handler unused  | Added event listener  | Enables UI interaction                                       |
| Function unused | Called `Counter()`    | Otherwise nothing executes                                   |

Expected output after 1s:

```
Iteration: 0
Iteration: 1
Iteration: 2
```

---

##  **Part B — Express.js API**

###  Bugs Identified

1. **Missing `await`**

   * `fetchUserFromDB()` is async but called synchronously.

2. **Typo: `userDate`**

   * Variable name mismatch → ReferenceError.

3. **Multiple response risk**

   * After `res.status(404).send()`, execution continues.

4. **Route handler should be async**

   * Needed to properly use `await`.

---

### ✅ Corrected Code

```javascript
const express = require('express');
const app = express();

app.get('/user/:id', async (req, res) => {
  try {
    const userData = await fetchUserFromDB(req.params.id);

    if (!userData) {
      return res.status(404).send("User not found");
    }

    res.json({
      status: "success",
      data: userData
    });

  } catch (error) {
    res.status(500).send("Server Error: " + error.message);
  }
});

async function fetchUserFromDB(id) {
  return { id, name: "IEEE Member" };
}
```

---

### 🧠 Explanation

| Issue                  | Fix                  | Reason                      |
| ---------------------- | -------------------- | --------------------------- |
| Async function ignored | Added `await`        | Prevents unresolved Promise |
| `userDate` typo        | Changed → `userData` | Avoids runtime crash        |
| Double response        | Added `return`       | Stops execution after 404   |
| Sync handler           | Made route `async`   | Required for async DB calls |

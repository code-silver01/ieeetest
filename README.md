# ieeetest
Solutions


<h1>Task 1</h1>


Ui


<img width="1600" height="1000" alt="image" src="https://github.com/user-attachments/assets/434dba57-cdf7-47d9-9ce5-c90e6dcebaeb" />

add on


<img width="1600" height="837" alt="image" src="https://github.com/user-attachments/assets/8a3a37c1-dc31-4611-994b-86d38a55134b" />


<h1>Task 2</h1>


This project implements a **Node.js + Express REST API** integrated with a **React frontend** to dynamically manage IEEE RITB team members.

The frontend **fetches and renders members directly from the backend**, eliminating static data.

---

## ⚙️ API Functionality

### **GET /members**

* Called automatically when the React app loads.
* Backend sorts members using `hierarchyLevel`.
* Leadership roles appear first in the UI grid.

---

### **POST /members**

* Adds a new member.
* Validation enforced:

  * USN must be **unique**
  * Exactly **10 alphanumeric characters**

---

### **DELETE /members/:usn**

* Removes a member securely using their USN.

---

## 🖥️ Running the Full-Stack System Locally

Both backend and frontend servers must run simultaneously.

---

### ✅ 1. Start Backend API (Port 3000)

```bash
cd backend
node index.js
```

---

### ✅ 2. Start Frontend (Vite)

```bash
npm run dev
```

---

## ⚡ Live Database Update Demo

With both servers running and the frontend open:

```
http://localhost:5173
```

Open a **third terminal** and add a member dynamically.

---

### ▶ PowerShell (Windows)

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/members" -Method Post -ContentType "application/json" -Body '{"name":"Demo User","usn":"1RV21CS999","chapter":"Web Development Team","role":"Frontend Developer","hierarchyLevel":4,"email":"demo@ieee.org","bio":"Just added via the REST API!"}'
```

---

### ▶ Mac / Linux (cURL)

```bash
curl -X POST http://localhost:3000/members -H "Content-Type: application/json" -d '{"name":"Demo User","usn":"1RV21CS999","chapter":"Web Development Team","role":"Frontend Developer","hierarchyLevel":4,"email":"demo@ieee.org","bio":"Just added via the REST API!"}'
```

---

## ✅ Result

Refresh the browser and the newly added **Demo User** instantly appears as a dynamically generated **glassmorphic team card** in the grid.


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

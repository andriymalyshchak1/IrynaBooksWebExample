# DFW Book Rental

A simple web app for short-term physical book rentals in the Dallas–Fort Worth area. Browse books, filter by date, message owners, list your own books, and (for admins) manage users.

---

## How to get this project on your computer (total beginner guide)

If you’ve never used Git or the terminal before, follow these steps in **Cursor**.

### Step 1: Create a folder for the project

On your computer, create a new folder where you want the project to live. For example:

- **Mac:** Open Finder, go to where you want it (e.g. Documents), right‑click → **New Folder**, and name it something like `IrynaBooks` or `DFW-Book-Rental`.
- **Windows:** Open File Explorer, go to the right place (e.g. Documents), right‑click → **New** → **Folder**, and give it a name.

You don’t need to put any files inside it yet.

### Step 2: Open that folder in Cursor

1. Open **Cursor**.
2. Go to **File → Open Folder** (or **Open…** on Mac).
3. Select the **empty folder** you just created.
4. Click **Open**. Cursor will show that folder as your workspace (you might see an empty sidebar—that’s fine).

### Step 3: Open the Terminal in Cursor

1. In Cursor, look at the top menu: **Terminal**.
2. Click **Terminal** → **New Terminal** (or use the shortcut if you see it).
3. A panel will open at the bottom of the window with a **terminal**. You’ll see a line of text and a blinking cursor—that’s where you type commands.

### Step 4: Clone the project with Git

In that terminal, type the following and then press **Enter**:

```bash
git clone https://github.com/andriymalyshchak1/IrynaBooksWebExample.git .
```

Important:

- Type it exactly (or copy and paste). The space before the dot at the end is intentional.
- The dot at the end means “put the project files **here** in this folder” instead of creating a new subfolder.

After it finishes, you should see the project files (like `package.json`, `src`, `index.html`, etc.) in Cursor’s file explorer on the left.

---

## How to run the web app

Once the project is cloned:

1. In the **same terminal** in Cursor, run:

   ```bash
   npm install
   ```

   Wait until it finishes (it downloads the project’s dependencies).

2. Then run:

   ```bash
   npm run dev
   ```

3. The terminal will show a line like **Local: http://localhost:5173/** (the number might be different). Click that link or copy it into your browser to open the app.

To stop the app, go back to the terminal and press **Ctrl+C** (or **Cmd+C** on Mac).

---

## What’s in this project

- **Landing page** – Intro and “Find books”.
- **Browse** – Book cards, date filter, “Message” on each card.
- **List a book** – Add a book from your collection (after logging in).
- **Messages** – View conversations about books (after logging in).
- **Login** – Demo: use any email/password and pick a user from the “Log in as” dropdown.
- **Account** – See your name and log out.
- **Admin** – For the admin user (Jordan Lee): add users, suspend/reinstate accounts, and see books listed and borrowed per user.

Built with **React**, **Vite**, and **React Router**. No backend; data is stored in the browser (localStorage) and mock files for this demo.

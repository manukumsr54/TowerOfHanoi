# 🗼 Tower of Hanoi — React Game--

An interactive **Tower of Hanoi puzzle game** built with **JavaScript, React, and Vite**.
The project combines a clean, responsive user interface with the classic **Tower of Hanoi recursive algorithm**, allowing users to interact with the puzzle and understand how the solution works.

---

## 🚀 About the Project

The **Tower of Hanoi** is a classic mathematical puzzle consisting of three rods and a number of disks of different sizes.

The objective is to move all disks from the **source rod** to the **destination rod**, following these rules:

1. Only **one disk** can be moved at a time.
2. A larger disk cannot be placed on top of a smaller disk.
3. Every disk must eventually be moved from the source rod to the destination rod.

This project implements the puzzle using **JavaScript and React**, with the game interface allowing users to interact with the towers and perform valid moves.

---

## ✨ Features

* 🗼 Interactive Tower of Hanoi puzzle
* 🎮 User-controlled disk movements
* 🧠 Recursive Tower of Hanoi algorithm
* ⚡ Built with Vite for fast development
* ⚛️ React-based component architecture
* 🎨 Custom-built basic UI
* ✅ Move validation
* 📊 Move tracking
* 🔄 Game reset functionality
* 📱 Responsive interface
* 💡 Clean and beginner-friendly implementation

---

## 🛠️ Tech Stack

| Technology     | Purpose                                |
| -------------- | -------------------------------------- |
| **React**      | Building the interactive UI            |
| **JavaScript** | Game logic and algorithm               |
| **Vite**       | Development environment and build tool |
| **HTML**       | Application structure                  |
| **CSS**        | Styling and layout                     |

---

## 🧠 Tower of Hanoi Algorithm

The core of the project is based on the classic **recursive Tower of Hanoi algorithm**.

For `n` disks:

```text
1. Move n-1 disks from Source → Auxiliary
2. Move the largest disk from Source → Destination
3. Move n-1 disks from Auxiliary → Destination
```

### Recursive Concept

```javascript
function towerOfHanoi(n, source, auxiliary, destination) {
    if (n === 1) {
        console.log(`Move disk 1 from ${source} to ${destination}`);
        return;
    }

    towerOfHanoi(n - 1, source, destination, auxiliary);

    console.log(`Move disk ${n} from ${source} to ${destination}`);

    towerOfHanoi(n - 1, auxiliary, source, destination);
}
```

The minimum number of moves required to solve the puzzle is:

```text
2ⁿ - 1
```

For example:

| Disks | Minimum Moves |
| ----: | ------------: |
|     1 |             1 |
|     2 |             3 |
|     3 |             7 |
|     4 |            15 |
|     5 |            31 |
|    10 |          1023 |

---

## ⚛️ React Implementation

React is used to manage the game interface and state.

The application keeps track of the disks on each tower and updates the UI whenever the player makes a move.

Conceptually, the state can be represented as:

```javascript
const [towers, setTowers] = useState({
    A: [],
    B: [],
    C: []
});
```

When a valid move is made, the corresponding tower state is updated and React automatically re-renders the interface.

---

## 🎮 How the Game Works

The game starts with all disks placed on the **first tower**.

```text
Source          Auxiliary          Destination

  |                 |                   |
  |                 |                   |
  |                 |                   |
 ---                |                   |
-----                |                   |
-------              |                   |
=======              |                   |
```

The player moves disks between the three towers while following the puzzle rules.

The game checks whether a move is valid before updating the state.

---

## 📂 Project Structure

A typical project structure looks like:

```text
tower-of-hanoi/
│
├── public/
│
├── src/
│   ├── components/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── ...
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project

```bash
cd tower-of-hanoi
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Vite will provide a local development URL, usually:

```text
http://localhost:5173
```

Open it in your browser to play the game.

---

## 📦 Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

## 📈 Complexity

The Tower of Hanoi algorithm has an exponential time complexity.

### Time Complexity

```text
O(2ⁿ)
```

### Space Complexity

```text
O(n)
```

The `O(n)` space complexity comes primarily from the recursive call stack.

---

## 🎯 Learning Outcomes

Through this project, I practiced and strengthened my understanding of:

* JavaScript fundamentals
* Recursion
* Algorithm implementation
* React components
* React state management
* Event handling
* Conditional rendering
* Dynamic UI updates
* Vite development workflow
* Building an interactive browser-based application

---

## 🔮 Future Improvements

Possible improvements for future versions include:

* 🤖 Automatic solution animation
* ⏱️ Timer
* 🏆 Best-score system
* 💾 Persistent game progress
* 🎚️ Difficulty selection
* 🎨 Improved animations
* 🔊 Sound effects
* 🌙 Light/Dark themes
* 📊 Move efficiency statistics
* 📱 Improved mobile experience

---

## 👨‍💻 Developer

**Manu Kumar**

CSE Student | Full-Stack Developer

Interested in building interactive applications, solving problems with algorithms, and exploring modern web technologies.

---

## ⭐ Project Highlights

> A hands-on implementation of the classic Tower of Hanoi problem combining **recursive algorithms with an interactive React interface**.

Built from scratch using **JavaScript, React, and Vite**.

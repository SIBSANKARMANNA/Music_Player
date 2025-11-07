# 🎵 Web-Based Music Player Application

An interactive **Web Music Player** built using **React.js**, **TailwindCSS**, **Node.js**, and **MongoDB**.  
This project delivers a smooth, responsive, and modern audio player with playlist management, global playback controls, and song uploading capabilities.

---

## 🎧 Overview

This web-based music player provides users with an engaging experience to **play, manage, and organize** their favorite songs.  
It supports creating playlists, uploading songs, controlling playback, and offers a real-time progress bar with volume control — all within a visually appealing UI.

---

## 🎯 Project Features

- 🖥️ **Modern User Interface** — Built with React and TailwindCSS for a clean and intuitive look.  
- 🎶 **Audio Playback** — Uses the HTML5 `<audio>` API for seamless song playing and control.  
- 📜 **Playlist Management** — Create, edit, and remove playlists dynamically.  
- ⏯️ **Play Controls** — Play, pause, skip next/previous, seek, and adjust volume.  
- 🎚️ **Progress & Volume Controls** — Real-time progress tracking with slider-based volume adjustment.  
- 🗂️ **Song Management** — Upload new songs, delete existing ones, and assign songs to playlists.  
- 💡 **Song Details Display** — Shows current track title, artist, album, and duration.  
- 📱 **Responsive Design** — Fully responsive, optimized for desktop, tablet, and mobile.  

---

## 🧩 Tech Stack

| Layer | Technology Used |
|-------|------------------|
| Frontend | React.js, TailwindCSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Audio Engine | HTML5 `<audio>` API |
| Package Manager | npm |

---

## 📂 Project Structure

```
music-player-app/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   └── controllers/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/music-player-app.git
cd music-player-app
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
npm start
```
> Backend runs on default port `5000` (or as configured in `.env`).

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
> Frontend runs on default port `5173` (Vite).

---

## 🕹️ How to Use the Application

1. **Start both frontend and backend servers**  
   - Backend: `npm start`  
   - Frontend: `npm run dev`  

2. **Home Page Overview:**  
   - Displays navigation with **songs** and **playlists**.  
   - Includes **upload new song** button.  
   - Lists all available songs with options to **Play**, **Delete**, and **Add to Playlist** (dropdown).  

3. **Global Audio Player:**  
   - Appears when a song is played.  
   - Controls include:  
     - ⏮️ Previous  
     - ▶️ Play / ⏸️ Pause  
     - ⏭️ Next  
     - 🔊 Volume Up / 🔈 Volume Down  
     - ⏱️ Real-time music progress bar with current time and total duration  

4. **Playlist Management:**  
   - Access the playlist section via navigation.  
   - Features include:  
     - ▶️ Play **individual** or **all songs together**  
     - 🗑️ Remove songs from playlist  
     - ➕ Create a **new playlist**  

5. **Responsive UI:**  
   - Designed to adapt to multiple screen sizes.  
   - Interactive and smooth transition effects powered by TailwindCSS.  

---

## 🧠 Data Structure Example

### 🎵 Song Object
```json
{
  "title": "Blinding Lights",
  "artist": "The Weeknd",
  "album": "After Hours",
  "duration": "3:20",
  "url": "/uploads/blinding-lights.mp3",
  "playlist": "Pop Hits"
}
```

### 🎶 Playlist Object
```json
{
  "name": "Pop Hits",
  "songs": [
    "Blinding Lights",
    "Levitating",
    "Watermelon Sugar"
  ]
}
```

---

## 🧰 Example Commands

| Command | Description |
|----------|-------------|
| `npm start` | Start the backend server |
| `npm run dev` | Start the frontend server |
| `npm install` | Install dependencies for either frontend or backend |
| `npm run build` | Build the frontend for production |

---

## 🧑‍💻 Author

**👋 [Your Name]**  
Full Stack Developer | React.js | Node.js | MongoDB | TailwindCSS  

- 🌐 GitHub: https://github.com/SIBSANKARMANNA
- 💼 LinkedIn: https://www.linkedin.com/in/sibsankarmanna/

---


## 🏁 Future Enhancements

- 🎧 Add shuffle and repeat functionality  
- 💾 Enable saving user preferences (last played song, volume, etc.)  
- 📀 Integrate lyrics display or visualizer animation  
- ☁️ Enable song streaming from cloud storage  

---

### 🎶 Enjoy your favorite tunes anytime, anywhere! 🎧

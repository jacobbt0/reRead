# RE-READ MARKETPLACE

**RE-READ MARKETPLACE** is a platform designed for college students to buy and sell used books categorized by department and semester. It provides an easy-to-use interface with features like real-time search, user chat, and admin management.

## 🚀 Features

- 📚 **Book Listings** - Filterable by title, author, department, and semester.
- 🔎 **Real-time Search** - Find books instantly.
- 💬 **Chat System** - Direct communication between buyers and sellers.
- 🛠️ **Admin Dashboard** - Manage users and books.
- 🚨 **User Ban Feature** - Admins can restrict users violating guidelines.
- 🖼️ **Image Upload** - Sellers can upload book images.


## 🏗️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **State Management**: Zustand
- **Real-time Features**: Socket.io

## ⚡ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/jacobbt0/reRead.git
cd reRead
```

### 2️⃣ Install Dependencies
#### Backend
```bash

npm install
```
#### Frontend
```bash
cd frontend
npm install
```

### 3️⃣ Setup Environment Variables
Create a **.env** file in the `server` directory and add:
```env
PORT= 8888
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4️⃣ Start the Development Server
#### Backend
```bash
npm run dev
```
#### Frontend
```bash
cd frontend
npm run dev
```

## 📌 Usage
1. **Sign Up/Login** to access the platform.
2. **List a Book** by providing details and an image.
3. **Search** for books using title or author.
4. **Chat** with sellers directly before purchasing.
5. **Admins** can manage users, ban accounts.



## 🤝 Contributing
Contributions are welcome! If you want to improve the project:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## 📜 License
This project is licensed under the **MIT License**.

---




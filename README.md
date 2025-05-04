
# ChatX - Real-Time Messaging App

ChatX is a modern, fully functional single-page messaging application built with Next.js, TypeScript, and Tailwind CSS. It features a clean, responsive design with real-time chat capabilities, emoji reactions, and smooth animations powered by Framer Motion. This project showcases a commercial-grade frontend with no external UI libraries, focusing on custom-built components and a polished user experience.

## Features

- **Single Page Application (SPA):** Seamless navigation between landing page, chat interface, about, and contact sections.
- **Real-Time Chat:**
  - Live messaging with message bubbles.
  - Typing indicators for both user and recipients.
  - Emoji reactions on messages with a hover-based picker.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop devices.
- **Navbar & Footer:** Persistent navigation with back functionality and user status indicators.
- **Animations:** Smooth transitions and interactions using Framer Motion.
- **User Management:**
  - Dynamic user list with online/offline/away status.
  - Toggleable online users sidebar.
- **Mock Data:** Realistic user and message data without API dependencies.
- **Professional UI:** Clean, modern design with Tailwind CSS styling.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **No UI Libraries:** All components are custom-built.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.x or later)
- npm (v9.x or later) or yarn/pnpm

## Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd chatx
   ```

2. **Install Dependencies:**
   Using npm:
   ```bash
   npm install
   ```
   Or using yarn:
   ```bash
   yarn install
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Or with yarn:
   ```bash
   yarn dev
   ```

4. **Open in Browser:**
   Navigate to `http://localhost:3000` to see the app in action.

## Project Structure

- `app/page.tsx`: The single file containing all components and logic.
- No additional pages or external CSS files are used, keeping everything self-contained.

## Usage

- **Landing Page:** Click "Start Messaging" to enter the chat interface.
- **Chat Interface:**
  - Select a user from the list to start chatting.
  - Type messages and press Enter or click the Send button.
  - Hover over received messages to add emoji reactions.
  - Toggle the online users sidebar with the Users icon.
- **Navigation:** Use the navbar to switch between Home, About, and Contact views.
- **Back Navigation:** Click the back arrow to return to previous views or the user list from chat.

## Customization

- **Users Data:** Modify the `users` array in `page.tsx` to change user details or status.
- **Messages:** Adjust the mock replies in the `handleSendMessage` function.
- **Styling:** Update Tailwind classes in the components for different colors or layouts.
- **Animations:** Tweak Framer Motion props for different animation effects.

## Screenshots

*(Add screenshots here if available)*

## Contributing

Contributions are welcome! Please:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Built by Soumojit ([sanjugon2003@gmail.com](mailto:sanjugon2003@gmail.com)).

---

Enjoy chatting with ChatX! For any issues or feature requests, feel free to open an issue on the repository.

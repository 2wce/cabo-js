# Cabo Web App

Welcome to the Cabo Web App, a digital version of the card game Cabo. This project is built using TypeScript, Vite, React, XState, and PartyKit. Below you'll find information on the project setup, development process, and game rules.

## Table of Contents

- [Installation](#installation)
- [Development](#development)
- [Build](#build)
- [Gameplay Instructions](#gameplay-instructions)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with the Cabo Web App, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/cabo-web-app.git
   cd cabo-web-app
   ```

2. **Install dependencies:**

   Ensure you have Node.js and npm installed. Then run:

   ```bash
   npm install
   ```

## Development

To start the development server, use:

```bash
npm run dev
```

This will launch the app in development mode. Open your browser and navigate to `http://localhost:3000` to see the app in action. The page will reload if you make edits, and you will see any lint errors in the console.

## Build

To create a production build, run:

```bash
npm run build
```

This will bundle the app into static files for production. You can then serve these files using a web server of your choice.

## Gameplay Instructions

### Objective

The objective of Cabo is to have the lowest total value of cards at the end of the game.

### Setup

1. Shuffle the deck and deal four cards to each player.
2. Without looking, each player arranges their four cards face down in front of them.
3. Each player looks at the two outermost cards once and memorizes their values.

### Card Values

- Numbered cards (0-10): face value.
- Jack (J): 11 points.
- Queen (Q): 12 points.
- King (K): 13 points.

### Playing the Game

1. **Draw Phase:**

   - On your turn, draw a card from the deck or the discard pile.

2. **Action Phase:**

   - Replace: Exchange the drawn card with one of your face-down cards.
   - Peek: Look at one of your face-down cards (only if you drew from the deck).
   - Spy: Look at one of another player’s face-down cards (only if you drew from the deck).
   - Swap: Swap one of your face-down cards with one of another player’s cards (only if you drew from the deck).

3. **End Turn:**

   - Discard the drawn card if you didn’t replace any of your cards.

4. **Calling Cabo:**
   - If you think you have the lowest total value of cards, you can call "Cabo." Each other player gets one more turn, then all cards are revealed, and scores are tallied.

### Ending the Game

- The game ends when a player calls "Cabo" or the deck is exhausted.
- The player with the lowest total card value wins.

## Technologies Used

- **TypeScript:** Strongly typed programming language that builds on JavaScript.
- **Vite:** Next-generation front-end tooling. It's fast and provides a great development experience.
- **React:** JavaScript library for building user interfaces.
- **XState:** State machines and statecharts for managing complex state in React.
- **PartyKit:** Framework for building real-time collaborative applications.

## Contributing

We welcome contributions! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using the Cabo Web App! If you have any questions or feedback, please open an issue on the GitHub repository. Enjoy the game!

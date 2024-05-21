import { createAndShuffleDeck } from "../../utils";
import setup from "./setup";
import { Player } from "./types";

const machine = setup().createMachine({
  id: "cabo-machine",
  initial: "waitingForPlayers",
  states: {
    waitingForPlayers: {
      on: {
        "add-player": {
          actions: ({ context, event }) => {
            console.log("Adding player...", event.payload);
            context.players.push(event.payload);
          },
        },
        "start-game": {
          target: "dealCards",
          guard: ({ context }) => context.players.length >= 2,
        },
      },
      description: "The game is waiting for players to join.",
    },
    dealCards: {
      always: {
        target: "playerTurn",
        actions: ({ context }) => {
          // if no players have cards, deal cards
          if (context.players.every((player) => player.hand.length === 0)) {
            // Shuffle deck and deal cards to players
            const deck = createAndShuffleDeck();

            // Deal cards to players
            let cardIndex = 0;
            for (const player of context.players) {
              // Assuming each player is dealt 4 cards
              player.hand = deck.slice(cardIndex, cardIndex + 4);
              cardIndex += 4;
            }

            context.deck = deck.slice(cardIndex);
          }
        },
      },
      entry: ({ context }) => {
        // Shuffle deck and deal cards to players
        // Set the first player as the current player
        context.currentPlayer = context.players[0];
        context.round = 1;
      },
      description: "The dealer deals cards to each player.",
    },
    playerTurn: {
      on: {
        "draw-card": {
          target: "playerDraw",
          actions: ({ context }) => {
            console.log("Drawing card...", context);
            // Shift the first player to the end of the array after their turn
            context.players.push(context.players.shift() as Player);
            // Set the new first player as the current player
            context.currentPlayer = context.players[0];
          },
        },
        "call-cabo": {
          target: "endRound",
        },
      },
      description: "The current player takes their turn.",
    },
    playerDraw: {
      on: {
        "from-deck": {
          target: "playerAction",
          actions: ({ context }) => {
            const card = context.deck.pop() as string;

            context.currentPlayer?.hand.push(card);
          },
        },
        "from-discard": {
          target: "playerAction",
          actions: ({ context }) => {
            const card = context.discardPile.pop() as string;

            context.currentPlayer?.hand.push(card);
          },
        },
      },
      description: "The player draws a card from the deck or discard pile.",
    },
    playerAction: {
      on: {
        discard: {
          target: "nextPlayer",
          actions: ({ context }) => {
            const card = context.currentPlayer?.hand.pop() as string;

            context.discardPile.push(card);
          },
        },
        swap: {
          target: "nextPlayer",
          actions: ({ context, event }) => {
            // Assert that there are at least two players
            if (!context.currentPlayer) {
              throw new Error("There is no current player");
            }

            const { handIndex, targetPlayerIndex, targetHandIndex } =
              event.payload;

            const temp = context.currentPlayer.hand[handIndex];
            context.currentPlayer.hand[handIndex] =
              context.players[targetPlayerIndex].hand[targetHandIndex];

            context.players[targetPlayerIndex].hand[targetHandIndex] = temp;
          },
        },
        peek: {
          target: "nextPlayer",
          actions: ({ context }) => {
            // Peek logic
            console.log("Peeking at the top card of the deck...", context);
          },
        },
      },
      description: "The player takes an action with the drawn card.",
    },
    nextPlayer: {
      always: {
        target: "playerTurn",
      },
      entry: ({ context }) => {
        if (!context.currentPlayer) {
          throw new Error("There is no current player");
        }

        const currentIndex = context.players.indexOf(context.currentPlayer);
        const nextIndex = (currentIndex + 1) % context.players.length;
        context.currentPlayer = context.players[nextIndex];
      },
      description: "The turn shifts to the next player.",
    },
    endRound: {
      always: [
        {
          target: "gameOver",
          guard: ({ context }) => context.gameOver,
        },
        {
          target: "newRound",
        },
      ],
      entry: ({ context }) => {
        // Calculate scores
        console.log("Calculating scores...", context);
      },
      description: "The round ends and scores are calculated.",
    },
    newRound: {
      always: {
        target: "dealCards",
      },
      entry: ({ context }) => {
        context.round += 1;
        // Reset deck, discard pile, and player hands
      },
      description: "A new round begins.",
    },
    gameOver: {
      type: "final",
      description: "The game is over and the final scores are displayed.",
    },
  },
  context: {
    deck: [],
    round: 0,
    players: [],
    gameOver: false,
    discardPile: [],
    currentPlayer: undefined,
  },
});

export default machine;

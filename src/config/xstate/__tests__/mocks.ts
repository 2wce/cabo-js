import { ActorRefFrom } from "xstate";
import machine from "../machine";

type ActorRef = ActorRefFrom<typeof machine>;

export const addPlayers = (actor: ActorRef, numberOfPlayers: number) => {
  for (let i = 0; i < numberOfPlayers; i++) {
    const playerId = i + 1;
    actor.send({
      type: "add-player",
      payload: {
        name: `Player ${playerId as unknown as string}`,
        hand: [],
        id: playerId,
      },
    });
  }

  actor.send({
    type: "start-game",
  });

  return actor;
};

export const PLAYER_1_HAND = [
  "3 of Spades",
  "4 of Clubs",
  "5 of Hearts",
  "6 of Clubs",
];

export const PLAYER_2_HAND = [
  "2 of Spades",
  "3 of Clubs",
  "5 of Clubs",
  "6 of Hearts",
];

export const initialContext = {
  deck: [],
  currentPlayer: {
    id: 1,
    name: "Player 1",
    hand: PLAYER_1_HAND,
  },
  round: 1,
  gameOver: false,
  discardPile: [],
  players: [
    {
      id: 1,
      name: "Player 1",
      hand: PLAYER_1_HAND,
    },
    {
      id: 2,
      name: "Player 2",
      hand: PLAYER_2_HAND,
    },
  ],
};

import { setup } from "xstate";
import { Context, Event } from "./types";

export default () => {
  return setup({
    types: {
      events: {} as Event,
      context: {} as Context,
    },
    schemas: {
      events: {
        addPlayer: {
          type: "object",
          properties: {},
        },
        startGame: {
          type: "object",
          properties: {},
        },
        drawCard: {
          type: "object",
          properties: {},
        },
        callCabo: {
          type: "object",
          properties: {},
        },
        fromDeck: {
          type: "object",
          properties: {},
        },
        fromDiscard: {
          type: "object",
          properties: {},
        },
        discardCard: {
          type: "object",
          properties: {},
        },
        swapCard: {
          type: "object",
          properties: {},
        },
        peekCard: {
          type: "object",
          properties: {},
        },
        spyCard: {
          type: "object",
          properties: {},
        },
      },
      context: {
        deck: {
          type: "array",
          items: {
            type: "string",
          },
          description:
            'Generated automatically based on the key: "deck" in initial context values',
        },
        round: {
          type: "number",
          description:
            'Generated automatically based on the key: "round" in initial context values',
        },
        players: {
          type: "array",
          items: {
            type: "string",
          },
          description:
            'Generated automatically based on the key: "players" in initial context values',
        },
        gameOver: {
          type: "boolean",
          description:
            'Generated automatically based on the key: "gameOver" in initial context values',
        },
        discardPile: {
          type: "array",
          items: {
            type: "string",
          },
          description:
            'Generated automatically based on the key: "discardPile" in initial context values',
        },
        currentPlayer: {
          type: "undefined",
          description:
            'Generated automatically based on the key: "currentPlayer" in initial context values',
        },
      },
    },
    guards: {},
  });
};

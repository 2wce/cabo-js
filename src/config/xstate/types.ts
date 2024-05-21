export type ActionEvent =
  | { type: "discard" }
  | {
      type: "swap";
      payload: SwapPayload;
    }
  | { type: "peek" }
  | { type: "replace" }
  | { type: "spy" }
  | { type: "deal" };

export type SwapPayload = {
  targetPlayerIndex: number;
  targetHandIndex: number;
  handIndex: number;
};

export type Event =
  | ActionEvent
  | DrawEvent
  | { type: "add-player"; payload: Player }
  | { type: "start-game" }
  | { type: "call-cabo" };

export type Context = {
  deck: string[];
  round: number;
  players: Player[];
  gameOver: boolean;
  discardPile: string[];
  currentPlayer?: Player;
};
export type DrawEvent =
  | { type: "from-deck" }
  | { type: "from-discard" }
  | { type: "draw-card" };

export type Player = {
  id: number;
  name: string;
  hand: string[];
};

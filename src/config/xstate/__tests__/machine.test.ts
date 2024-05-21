import {
  Mock,
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import { createActor } from "xstate";
import { createAndShuffleDeck } from "../../../utils";
import machine from "../machine";
import {
  PLAYER_1_HAND,
  PLAYER_2_HAND,
  addPlayers,
  initialContext,
} from "./mocks";

vi.mock("../../../utils", () => ({
  createAndShuffleDeck: vi.fn(),
}));

describe("machine", () => {
  beforeEach(() => {
    (createAndShuffleDeck as Mock).mockReturnValue(
      PLAYER_1_HAND.concat(PLAYER_2_HAND)
    );
  });

  afterEach(() => {
    // restoring date after each test run
    vi.restoreAllMocks();
  });

  test("should have correct initial state", () => {
    const actor = createActor(machine);

    actor.start();
    // Check if we are waiting to join
    expect(actor.getSnapshot().value).toBe("waitingForPlayers");

    addPlayers(actor, 2);

    // console.log(actor.getSnapshot());
    // Check if we are playing
    expect(actor.getSnapshot().value).toBe("playerTurn");

    // Check if we have correct initial context
    expect(actor.getSnapshot().context).toEqual(initialContext);
  });
});

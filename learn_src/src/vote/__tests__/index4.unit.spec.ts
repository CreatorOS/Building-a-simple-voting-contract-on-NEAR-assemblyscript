import { getWinningProposal } from "../assembly";
import { VMContext } from "near-sdk-as";
describe("winningProposal", () => {
  it("gets the winning proposal", () => {
    VMContext.setSigner_account_id(process.env.get("user1"));
    const winningProposal = getWinningProposal();
    expect(winningProposal).not.toBe("None");
  })
})

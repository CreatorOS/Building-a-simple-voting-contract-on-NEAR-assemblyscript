import { addProposal } from "../assembly";
import { VMContext } from "near-sdk-as";
describe("addProposal", () => {
  it("adds a proposal", () => {
    VMContext.setSigner_account_id("alice.testnet");
    const added = addProposal("proposal");
    expect(added).toBeTruthy();
  })
})

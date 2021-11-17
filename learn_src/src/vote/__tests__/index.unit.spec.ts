import * as contract from "../assembly";
import { VMContext } from "near-sdk-as";

describe("Voting contract", () => {
  it("adds a proposal", () => {
    const added = contract.addProposal("proposal");
    expect(added).toBeTruthy();
  })

  it("allows users to vote", () => {
    contract.addProposal("proposal");
    const voted = contract.vote("proposal");
    expect(voted).toBeTruthy();
  })

  it("prohibits revoting", () => {
    contract.vote("proposal");
    const voted = contract.vote("proposal");
    expect(voted).toBeFalsy();
  })

  it("gets the winning proposal", () => {
    const winningProposal = contract.getWinningProposal();
    expect(winningProposal).not.toBe("None");
  })

})

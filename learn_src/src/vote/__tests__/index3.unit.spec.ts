import { vote } from "../assembly";
import { VMContext } from "near-sdk-as";
describe("revoting", () => {
  it("prohibits revoting", () => {
    VMContext.setSigner_account_id(process.env.get("user1"));
    vote("proposal");
    const voted = vote("proposal");
    expect(voted).toBeFalsy();
  })

})

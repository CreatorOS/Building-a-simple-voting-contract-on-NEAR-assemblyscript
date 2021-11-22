# Building a simple voting contract on NEAR
In this quest, we will write a simple voting contract on NEAR using AssemblyScript. The contract will allow users to create proposals and vote on them. Ready? set, code!

## Writing the contract's state
Take a look at these imports from NEAR's AssemblyScript SDK, those should go in first when writing.
```ts
import { context, PersistentMap, PersistentVector } from "near-sdk-as";
```
Now let's write, you guessed it, the voting class. It has two fields: a boolean to indicate whether the voter has voted or not, and a string that represents the proposal the voter has voted for.
Your job is to:

STEP 1 - set the voted field to false.

STEP 2 - set the vote firld to the string value "None".
```ts
export class Voter {
    voted: boolean;  
    vote: string;   

    constructor() {
        this.voted = /*STEP 1*/;
        /*STEP 2*/;
    }
}
```
Good, let's go on, shall we?

## Creating helper collections
Before we continue on to write our contract's methods, we have to introduce some collections to store data for us, have a look at these:
 - The First map is to keep a hashmap, the voter's NEAR account ID is the key, and the value is an instance of calss Voter, that we wrote in the previous subquest.
 - The second map keeps a record of number of votes for each peoposal.
 - The third collection is a vector, it simply keeps a list of proposals.
```ts
export const voters = new PersistentMap<string, Voter>("t");
export const proposalVotes = new PersistentMap<string, u32>("v");
export const proposals = new PersistentVector<string>("p");
```
Now the fun begins, let's write the contract's functionality!

## Starting with functionality - adding a proposal
We need to write a function to add proposals. it should basically do two things: storing the peoposal in the proposals list, and initialize a key-valye pair for it in proposalVotes map. You have two simple things to do:

STEP 1 - push the proposal passed as a function parameter to proposal list. Syntax : list.push(item)

STEP 2 - store a new pair in proposalVotes map, it should take proposal as a key and zero as an initial value. Syntax: map.set(key,value);
```ts
export function addProposal(proposal: string): boolean {
    if (proposal != "None") {
        /*STEP 1*/;
        /*STEP 2*/
        return true;
    }
    return false;
}
```
What now? Oh yes, we need to allow creating voter accounts.

## Moving on - creating a voter
Not really complicated, we only have to create a Voter instance and store in voters map! We created an instance for you and initialized its fields. Now, set the new key-value pair in te voters map, context.sender is the key, you guess the value ;)

STEP 1 - store the new pair in voters. Remember, map.set(key, value);
```ts
export function createVoter(): boolean {
    const voted = voters.get(context.sender);
    if (!voted) {
        const voterNew = new Voter();
        voterNew.vote = "None";
        voterNew.voted = false;
        /*STEP 1*/;
        return true;
    }
    return false;
}
```
## The main guy - writing the voting functionality
let's allow our users to vote! take a look at the function below.
Three steps are left for you to implement:

STEP 1 - fetch the Voter object associated with the caller's NEAR account ID.

STEP 2 - change the boolean value of voted.

STEP 3 - again, store the new pair in voters. the key is context.sender, butwhat is the value?
```ts
export function vote(proposalName: string): boolean {
    const voter = voters.getSome(/*STEP 1*/);
    let proposal = proposalVotes.getSome(proposalName);
    if (voter.voted) {
        return false;
    }
    else {
        voter.vote = proposalName;
        voter.voted = /*STEP 2*/;
        proposal = proposal + 1;
        proposalVotes.set(proposalName, proposal);
        voters.set(/*STEP 3*/);
        return true;
    }
}
```

## Last touches - getting the winning proposal
We would like to know the result, right? Notice that we have not used the proposals vector yet, now we will!
Two things for you my geeky friend:

STEP 1 - update the value of highestVote.

STEP 2 - update the value of winningProposals, remember, we store them in the proposals vector.
```ts
export function getWinningProposal(): string {
    let winningProposal = "None";
    let highestVote: u32 = 0;
    for (let i = 0; i < proposals.length; i++) {
        let proposalVote = proposalVotes.getSome(proposals[i]);
        if (proposalVote > highestVote) {
            /*STEP 1*/;
            /*STEP 2*/;
        }
    }
    return winningProposal
}
```
And what do you know, we are done!
Stay tuned and happy coding!

# Building a simple voting contract on NEAR
Decentralized voting has several use cases including voting in DAOs, voting for auction based products, voting within a decentralized community activity etc. This quest aims to teach you to build a simple voting functionality on the NEAR Protocol.

In this quest, we will write a simple voting contract on NEAR using AssemblyScript. 

The contract will 
- Allow admins to create proposals 
- and users to vote on them. 
 
Ready? Set, code!

## Writing the contract's state
Take a look at these imports from NEAR's AssemblyScript SDK. This import statement is the first line of code in our contract.

```ts
import { context, PersistentMap, PersistentVector } from "near-sdk-as";
```

Now let's write the voting class. It has two fields: a boolean to indicate whether the voter has voted or hasn't, and a string that represents the proposal the voter has voted for.
Your job is to fill in the missing code snippets with the help of the steps mentioned below.

STEP 1 - Initialize the voted field with false.

STEP 2 - Initialize the vote field with the string value "None".

```ts
export class Voter {
    voted: boolean;  
    vote: string;   

    constructor() {
        this.voted = /*FILL IN THE MISSING CODE SNIPPET (STEP 1)*/;
        /*FILL IN THE MISSING CODE SNIPPET (STEP 2)*/;
    }
}
```
Now that we are setup, let's go on, shall we?

## Creating helper collections
Before we go on to write our contract's methods, we have to introduce some collections to store data for us. Let us have a look at these.
 - The First map is similar to a hashmap with key:value pairs. The voter's NEAR account ID is the key, and the value is an instance of class Voter that we wrote in the previous subquest.
 - The second map keeps a record of the number of votes for each proposal.
 - The third collection is a vector. It simply saves a list of proposals.
 
```ts
export const voters = new PersistentMap<string, Voter>("t");
export const proposalVotes = new PersistentMap<string, u32>("v");
export const proposals = new PersistentVector<string>("p");
```
Now the fun begins. Let's write the contract's functionality!

## Starting with functionality - adding a proposal
We need to write a function to add proposals. It should do two things: store the proposal in the ***proposals*** list and initialize a key-value pair for it in proposalVotes map. Fill in the missing code snippets using the following step instructions:

STEP 1 - Push the proposal passed as a function parameter to the proposal list. Syntax: list.push(item)

STEP 2 - Store a new pair in proposalVotes map, it should take proposal as a key and zero as an initial value. Syntax: map.set(key,value);

```ts
export function addProposal(proposal: string): boolean {
    if (proposal != "None") {
        /*FILL IN THE MISSING CODE SNIPPET(STEP 1)*/;
        /*FILL IN THE MISSING CODE SNIPPET(STEP 2)*/
        return true;
    }
    return false;
}
```
What now? The next step is to allow creating voter accounts.

## Moving on - creating a voter
This will not be complicated, we only have to create a Voter instance and store it in the voters map! We created an instance for you and initialized its fields. Now, set the new key-value pair in the voters map, context.sender is the key, you guess the value ;)
Fill in the missing code snippets.

STEP 1 - Store the new pair in voters. Remember, map.set(key, value);
```ts
export function createVoter(): boolean {
    const voted = voters.get(context.sender);
    if (!voted) {
        const voterNew = new Voter();
        voterNew.vote = "None";
        voterNew.voted = false;
        /*ILL IN THE MISSING CODE SNIPPET (STEP 1)*/;
        return true;
    }
    return false;
}
```
## The main guy - writing the voting functionality
Let's allow our users to vote! Take a look at the function below.
Fill in the missing code snippets. 
Three steps are left for you to implement:

STEP 1 - Fetch the Voter object associated with the caller's NEAR account ID.

STEP 2 - Change the boolean value of voted.

STEP 3 - Again, store the new pair in voters. The key is context.sender, but what is the value?

```ts
export function vote(proposalName: string): boolean {
    const voter = voters.getSome(/*FILL IN THE MISSING CODE SNIPPET (STEP 1)*/);
    let proposal = proposalVotes.getSome(proposalName);
    if (voter.voted) {
        return false;
    }
    else {
        voter.vote = proposalName;
        voter.voted = /*FILL IN THE MISSING CODE SNIPPET(STEP 2)*/;
        proposal = proposal + 1;
        proposalVotes.set(proposalName, proposal);
        voters.set(/*FILL IN THE MISSING CODE SNIPPET(STEP 3)*/);
        return true;
    }
}
```

## Last touches - getting the winning proposal
We would like to know the result, right? Notice that we have not used the proposals vector yet, now we will!
Fill in the missing code snippets. Two things for you my geeky friend:

STEP 1 - Update the value of highestVote.

STEP 2 - Update the value of winningProposal.Remember, we store proposals in the ***proposals*** vector.

```ts
export function getWinningProposal(): string {
    let winningProposal = "None";
    let highestVote: u32 = 0;
    for (let i = 0; i < proposals.length; i++) {
        let proposalVote = proposalVotes.getSome(proposals[i]);
        if (proposalVote > highestVote) {
            /*FILL IN THE MISSING CODE SNIPPET (STEP 1)*/;
            /*FILL IN THE MISSING CODE SNIPPET (STEP 2)*/;
        }
    }
    return winningProposal;
}
```

And what do we know, we are done with the quest. You have now successfully created a simple voting contract on the NEAR protocol.
Stay tuned and happy coding!

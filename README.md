To solve this ticket, I'm separating it for 3 individuals. We're not just solving the ticket, but i gave them the possibility to think outside the box. I know that there may be some corner cases that i can't see, but the individual working on the task #1 will see. If they see it, they will be able to talk with their team mates to discuss the new test assertion. We're not working alone, and two heads think better than one.
I choose 3 individuals to cooperate because I could separate it into 3 independent tasks. So then, it will not weigh for anyone and it will not be too lightweight for anyone.
The documentation task is a task that will teach the developer to documentate everything. It is very important to have our request and responses documented.
The developer responsible for the test tasks will learn the final user's needs. They will be responsible to implement the mentioned tests which are the core for the application to work, but they will also be encouraged to think what is possible to happen.
The developer responsible for the function refactor will be learn about letting the code clear, optimized and working. I let for them a comment to avoid breaking changes. If they don't know what is that, now it is a good time to learn. If they know, the task will go well. Anyway, a refactor task always teach us a lot.

If it was a real task, i would also say to the individual responsible for the logic implementation to remove the TRIVIAL_PARTITION_KEY and the MAX_PARTITION_KEY_LENGTH from the code and use them as env var.
I would also discuss with the team to make the error error returned to the client application follow an error pattern instead of returning a string.

## [Ticket Breakdown](Ticket_Breakdown.md)

Original ticket: Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.

This ticket may be breaked down for 2-5 individuals to perform.

Task #1 - 2 hours
Summary: Create unit tests about the original ticket. The tests must cover the following user story:
"The Facility should be able to give a personalized id for an agent so then they will be able to have friendly ids"

Take into consideration that for this task to have success, you need to make sure that:

- The Facility is able to give a personalized id for an agent
- The id should not be greater than the max partition key length
- If the event is not informed, a literal 0 must be returned. Because it is its trivial key.

Implementation Details:
Create one test for each received input from the client. It will make the code readeable.
The task that ensure that the event is not informed, currently exists. You may keep it with no changes.
If you find other corner cases, feel yourself free to cover them, but make the Task #2's owner noticed

Task #2 - 3 hours
Summary: Based on the original ticket, refactor the dpk.js file to accept the customized id

Take into consideration that for this task to have success, you need to make sure that:

- If the function receives an event without a custom partition key, a SHA3-512 hash of the event is used as the partition key
- If the function doesn't receives the event, so the trivial partition key will be used.
- The old tests must still be working.
- The deterministicPartitionKey must be returned
- If the custom partition key exceeds the MAX_PARTITION_KEY_LENGTH, throw an error to the client application.

Implementation Details:
Refactor the dpk.js avoiding breaking changes related to the old frontend requests. The person responsible for the task #3 may help you with that.

Task #3 - 1~3 hours (it depends if the documentation already exists)
Summary: Based on the original ticket, update the documentation (or create one if it doesn't exists) inserting a contract between frontend and backend for this new request / response.

- The documentation must contain the contract for the request that calls getShiftsByFacility, generateReport
- The documentation must explain what is each parameter passed via request
- The documentation must explain what is each parameter received via response
- If there is a documentation and you are updating, keeps the frontend dev and the backend dev in touch.
- If there is no documentation and you are creating the new one, the team must be noticed.

## [Refactoring](Refactoring.md)

If you are a JS novice, here's how to get started:

1. [Install Node.js](https://nodejs.org/en/download/) (we use `^16`, the latest LTS)
2. Run `npm i` in this repo to install dependencies
3. Run `npm test` to run the automated tests
4. Run `npm start` to launch `index.js` for any manual testing

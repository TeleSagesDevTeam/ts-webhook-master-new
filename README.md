## webhooks
When blockchain monitor inserts new trade events into pocketbase db, logic inside `poket2/pb_hooks` fires webhooks based on what is happening, then those transactions are handled using webhooks and appropriate actions are taken.

there are 3 routes for now:
/createPool - is fired upon creation of a new pool inside a smart contract, it updates apropriate row inside `Gatherings` table changing poolIntex from -1 (created inside dashboard, but not yet created via smart contract) to appropriate poolIndex that was given by SC

/grant - is fired upon buying keys and handles logic of generating one time invites for telegram group

/revoke - is fired upon selling keys and is responsible for kicking user and revoking invites.


# bun or node.js
`bun install`
`bun index.js`
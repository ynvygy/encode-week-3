# encode-week-3

Commands used
yarn ts-node --files ./scripts/deployMyToken.ts
yarn ts-node --files ./scripts/deployBallot.ts Chocolate Strawberry Vanilla Coconut
yarn ts-node --files ./scripts/mintTokens.ts
yarn ts-node --files ./scripts/delegateVotingPower.ts
yarn ts-node --files ./scripts/grantMinterRole.ts
yarn ts-node --files ./scripts/castVote.ts
yarn ts-node --files ./scripts/getPower.ts
yarn ts-node --files ./scripts/getWinner.ts

Report (Mumbai):

Tx: 0x914813cd57b7738d641975f5957e4a95717a6c6c6d5f0ddb6930a5c6eada7faf
0x3e702e39e0649bd8581d07a5bf1b9e5924d94ce0 => created the token contract at => 0x60243c03b2f9a7390cD8542F13baB1627db8d783

Tx: 0x78ea9b7ae44869a2ba5c938506e08d842afff8a3f67779ebe60c1da41d2a2fe1
0x3e702e39e0649bd8581d07a5bf1b9e5924d94ce0 => created the ballot contract at => 0xf91061ba12f2d4f2b6d91c9be88290d00e8d114d

Tx: 0x7ff3b74cfb3e87fe153e0bb18d65149eab470afaad524be102def3b52838f70b
0x3e702e39e0649bd8581d07a5bf1b9e5924d94ce0 => minted 5 tokens for himself

Tx: 0x03e6ea0e21617afa85e0d087b4cbf7ded76b7c77a300d9a5ed3e58449aa428a9
0x3e702e39e0649bd8581d07a5bf1b9e5924d94ce0 => delegated to himself

Tx: 0xe0afe5adb7be3521bb73b142299499d3f90e3ee2c765c3bce117615e424b39f2
0x3e702e39e0649bd8581d07a5bf1b9e5924d94ce0 => granted minter role to => 0xf1eE3175eBe4B9Ff80Ec0441C9Aa66a319a16d75

Tx: 0x26753e9ffb303c10817970aaf788ec250b531a9bfca0504e3720f25ff7f3f24d
0xf1eE3175eBe4B9Ff80Ec0441C9Aa66a319a16d75 => minted 5 tokens for himself

Tx: 0xf5fa5130e202f52ead6e675ecfa601aa20e907dc29634a74b41e5e360bca990b
0xf1eE3175eBe4B9Ff80Ec0441C9Aa66a319a16d75 => delegated to himself

---

## Initial voting start was set to +150 blocks from deploy, at this time just around 100 passed

Non-Tx:
0x3e702e39e0649bd8581d07a5bf1b9e5924d94ce0 => ran getPower on himself => got error "ERC20Votes: block not yet mined"

---

## Finally 150 passed

Tx: 0xf12667a3fd49f1ba347b5ba4cfab3977785e9e439b3dc04cbc9af07b8bd71cc9
0xf1eE3175eBe4B9Ff80Ec0441C9Aa66a319a16d75 => Voted 1 amount for Strawberry

Tx: 0x60243c03b2f9a7390cD8542F13baB1627db8d783
0x3e702e39e0649bd8581d07a5bf1b9e5924d94ce0 => Voted 2 amount for Vanilla

Non-Tx:
0x3e702e39e0649bd8581d07a5bf1b9e5924d94ce0 => Ran getWinner => The winner name: Vanilla

const {
  Connection,
  PublicKey,
  Keypair,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} = require('@solana/web3.js');
const {
  Token,
  TOKEN_PROGRAM_ID,
} = require('@solana/spl-token');

async function createToken() {
  // Connect to cluster
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  
  // Our token's mint
  const mintAuthority = Keypair.generate();
  
  // Create mint account
  const mint = await Token.createMint(
    connection,
    payer,
    mintAuthority.publicKey,
    null, // freeze authority (you can use null to disable)
    9, // decimals (typical for most tokens)
    TOKEN_PROGRAM_ID,
  );
  
  console.log(`Token created: ${mint.publicKey.toString()}`);
  
  // Create a token account for holding your tokens
  const tokenAccount = await mint.createAccount(payer.publicKey);
  
  // Mint tokens to the account
  await mint.mintTo(
    tokenAccount,
    mintAuthority.publicKey,
    [mintAuthority],
    1000000000000, // amount (adjust based on your tokenomics)
  );
  
  console.log('Tokens minted');
}
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Cashier } from "../target/types/cashier";

describe("cashier", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Cashier as Program<Cashier>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});

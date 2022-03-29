use anchor_lang::prelude::*;

declare_id!("GH6SLYoAS6D2Vq2UJGQ3bGDCLma9n2fi61X4VtgLozq7");

#[program]
pub mod cashier {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

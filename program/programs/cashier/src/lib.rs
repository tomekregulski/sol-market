use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

declare_id!("GH6SLYoAS6D2Vq2UJGQ3bGDCLma9n2fi61X4VtgLozq7");

#[program]
pub mod cashier {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }

    pub fn purchase_marketplace_item(ctx: Context<Purchase>, amount: u64) -> ProgramResult {

        token::transfer(
            ctx.accounts.into_transfer_to_pda_context(),
            amount,
        )?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct Purchase<'info> {
    /// CHECK: this is safe because we have run client-side validation on the wallet initializing the transaction
    #[account(signer)] 
    pub sender: AccountInfo<'info>,
    pub token_mint: Account<'info, Mint>, 
    #[account(mut)]
    pub sender_magai_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub magai_bank_token_account: Account<'info, TokenAccount>,
    /// CHECK: this is safe because the mint authority is stored in an environmental variable
    // #[account(signer)] 
    // pub magai_mint_authority: AccountInfo<'info>,
    // pub system_program: Program<'info, System>,
    // pub rent: Sysvar<'info, Rent>,
    pub token_program: Program<'info, Token>,
}

impl<'info> Purchase<'info> {
    fn into_transfer_to_pda_context(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        let cpi_accounts = Transfer {
            from: self
            .sender_magai_token_account
            .to_account_info()
            .clone(),
            to: self.magai_bank_token_account.to_account_info().clone(),
            authority: self.sender.clone(),
        };
        CpiContext::new(self.token_program.to_account_info(), cpi_accounts)
    }
}
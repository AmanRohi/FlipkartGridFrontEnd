import React from "react";
import Navbar from "./Navbar";

function TermsandCondition() {
  return (
    <div className="flex flex-col justify-center gap-6">
      <Navbar />
      <div className="flex flex-col justify-center items-center ">
        <p className="text-[22px] font-medium tracking-wide underline text-violet-700">
          Term & Conditions
        </p>
        <div className="w-full flex justify-between px-8 py-6">
          <div className="w-[600px]   flex flex-col gap-2 tracking-wider">
            <p className="text-[18px] text-center font-medium text-violet-800">Sellers</p>
            <p>
              1. By participating the loyalty program and issuing fungible
              tokens, the seller agrees to abide by these terms and conditions.
            </p>
            <p>
              2. The seller agrees to issue and redeem fungible tokens in
              accordance with the program rules and guidelines. The value of
              tokens issued and the rewards offered should be clearly defined
              and transparent to users.
            </p>
            <p>
              3.All transactions involving fungible tokens, including
              settlements with E-commerce platforms and customers, will be
              recorded on the blockchain. Sellers should ensure accurate and
              timely settlements and maintain proper records.
            </p>
            <p>
              4.All transactions involving fungible tokens, including
              settlements with E-commerce platforms and customers, will be
              recorded on the blockchain. Sellers should ensure accurate and
              timely settlements and maintain proper records.
            </p>
            <p>
              5.Sellers must provide necessary information to users for them to
              understand how tokens are earned, redeemed, and the underlying
              tokenomics. The program's transparency and auditability are
              essential.
            </p>
            <p>
              6.Sellers should offer customer support related to token
              redemption, inquiries, and issues. Timely resolution of user
              concerns is expected
            </p>
          </div>
          <div className="w-[600px] flex flex-col gap-2 tracking-wider">
            <p className="text-center text-[19px] font-medium text-violet-800 ">Users</p>
            <p>
              1. Participation in the loyalty program is open to registered
              users of the platform who meet the eligibility criteria. Users
              agree to provide accurate and up-to-date information during
              registration.
            </p>
            <p>
              2. Users earn fungible tokens based on qualifying actions such as
              purchases, referrals, and social media interactions, as defined by
              the program guidelines. Tokens are issued as per the established
              tokenomics
            </p>
            <p>
              3.Users can use earned tokens for redemption as rewards from
              participating sellers and partners. Each redemption will be
              recorded on the blockchain for transparency.
            </p>
            <p>
              4.Users are responsible for the security of their digital wallets.
              Any unauthorized access to the wallet resulting in token loss is
              the user's
            </p>
            <p>
              5.Tokens in a user's wallet may have a decaying nature after a
              specified period. Users are advised to use their tokens within the
              stipulated time to prevent token loss.
            </p>
            <p>
              6.Users have the right to access their transaction history, earned
              tokens, and redeemed rewards through the provided interface. All
              transactions are recorded on the blockchain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsandCondition;

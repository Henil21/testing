import React from 'react';
import './creditsPolicy.css';

const CreditPolicy = () => {
  return (
    <div className="credits-policy-container">
      <div className="header">
        <h1>Credit Policy</h1>
        <p>Effective Date: 11/July/2024</p>
      </div>
      <div className="policy-content">
        <section>
          <h2>1. Credit Purchase Options</h2>
          <ul>
            <li>
              <strong>Payment Methods:</strong> Users can purchase credits using secure payment methods, including credit/debit cards, UPI, online banking, and digital wallets.
            </li>
            <li>
              <strong>Packages:</strong> Credits are sold in predefined packages to suit diverse user needs. Discounts may apply for bulk purchases.
            </li>
            <li>
              <strong>Currency:</strong> All transactions will be processed in [INR/USD] or the applicable local currency.
            </li>
          </ul>
        </section>

        <section>
          <h2>2. Validity of Credits</h2>
          <ul>
            <li>
              <strong>Credit Expiry:</strong> Purchased credits are valid for 12 months from the date of purchase unless otherwise specified in promotional offers. Expired credits cannot be refunded or reactivated.
            </li>
            <li>
              <strong>Rollover Policy:</strong> Unused credits from active accounts can roll over to subsequent periods if a new package is purchased before expiry.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Scope of Use</h2>
          <p>Credits purchased through Axamine AI provide users access to premium features tailored to enhance healthcare and general research needs.</p>
          <ul>
            <li>
              <strong>1 Credit:</strong> Provides users with a single interaction through the LLM-based chat for general inquiries and health-related guidance.
            </li>
            <li>
              <strong>3 Credits:</strong> Allows the generation of a comprehensive research report tailored to specific topics, valuable for medical and academic purposes.
            </li>
            <li>
              <strong>5 Credits:</strong> Unlocks the advanced image vision feature for medical diagnostics, offering actionable insights to medical professionals.
            </li>
          </ul>
          <p>
            <strong>Credit Deduction Process:</strong> Credits are automatically deducted from the user’s account as soon as a service is accessed. Users can track their credit usage in real time via their dashboards.
          </p>
          <p>
            <strong>Periodic Review of Rates:</strong> Axamine AI periodically reviews credit rates to ensure fairness and accessibility, delivering maximum value to users.
          </p>
        </section>

        <section>
          <h2>4. Refund Policy</h2>
          <ul>
            <li>
              <strong>Non-Refundable Credits:</strong> Credits are non-refundable except in cases of proven system errors or technical faults attributable to Axamine AI.
            </li>
            <li>
              <strong>Refund Requests:</strong> Refund requests must be submitted within 7 working days of purchase and are subject to verification.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Credit Transfer</h2>
          <ul>
            <li>
              <strong>Non-Transferable:</strong> Credits are tied to the user's account and cannot be transferred or gifted to other accounts.
            </li>
            <li>
              <strong>Corporate Accounts:</strong> For enterprise users, credits may be distributed among sub-accounts as per contractual terms.
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Promotional Credits</h2>
          <ul>
            <li>
              <strong>Validity:</strong> Promotional credits may have different validity and usage terms, as outlined in the respective offer's terms and conditions.
            </li>
            <li>
              <strong>Limitations:</strong> These credits cannot be exchanged for cash or other services outside of Axamine AI's platform.
            </li>
          </ul>
        </section>

        <section>
          <h2>7. Account Suspension or Termination</h2>
          <p>In cases of account suspension or termination due to policy violations, unused credits will be forfeited, and no refunds will be issued.</p>
        </section>

        <section>
          <h2>8. Modifications to the Credit Policy</h2>
          <p>
            Axamine AI reserves the right to modify this policy at any time. Users will be notified of changes via email or platform announcements. Continued use of credits after policy updates will constitute acceptance of the revised terms.
          </p>
        </section>
           <section>
          <h2>9. Disclaimer on AI Outputs</h2>
          <p>
            Axamine AI and its team members are not responsible for any incorrect predictions or outputs generated by the AI system. Users are advised to exercise their own judgment and consult professionals when making decisions based on AI outputs.
          </p>
        </section>

        <section>
          <h2>10. Contact Information</h2>
          <p>
            For inquiries or support related to credit purchases or usage, contact us:<br />
            <strong>Email:</strong> support@axamine.ai<br />
            <strong>Phone:</strong> 90997975854 <br />
            <strong>Address:</strong> Ankleshwar 393001, Gujarat , India 
            
          </p>
        </section>
      </div>
    </div>
  );
};

export default CreditPolicy;

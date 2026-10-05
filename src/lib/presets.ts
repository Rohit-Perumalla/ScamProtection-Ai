export interface PresetExample {
  id: string;
  type: 'message' | 'url';
  label: string;
  expectedClass: 'SAFE' | 'SUSPICIOUS' | 'LIKELY SCAM';
  content: string;
  tag: string;
}

export const MESSAGE_PRESETS: PresetExample[] = [
  {
    id: 'bank-otp-urgent',
    type: 'message',
    label: 'Urgent Bank OTP Alert',
    expectedClass: 'LIKELY SCAM',
    tag: 'Financial / Credential',
    content: 'URGENT: Chase Bank Security Alert! Unauthorized login detected from Texas. Your account will be SUSPENDED within 24 hours. Verify your identity and enter your OTP immediately at: http://chase-security-verify.xyz/login'
  },
  {
    id: 'lottery-winner',
    type: 'message',
    label: 'Lottery Prize Winner',
    expectedClass: 'LIKELY SCAM',
    tag: 'Advance Fee / Reward',
    content: 'Congratulations! You have been selected as the 1st prize winner of $50,000 in the Global Consumer Rewards. Claim your payout now! Reply with your full name, banking details and OTP passcode.'
  },
  {
    id: 'package-delivery-delay',
    type: 'message',
    label: 'USPS Delivery Delay',
    expectedClass: 'SUSPICIOUS',
    tag: 'Delivery / Redirection',
    content: 'USPS Notice: Your package delivery has an unpaid redelivery fee of $1.85 due to missing address information. Click here to confirm your delivery schedule: https://bit.ly/usps-parcel-track-091'
  },
  {
    id: 'friend-dinner-safe',
    type: 'message',
    label: 'Dinner Confirmation',
    expectedClass: 'SAFE',
    tag: 'Legitimate Chat',
    content: 'Hey Alex! Are we still on for dinner at Mario’s tonight at 7:30 PM? Let me know if you want me to reserve a table for four. See you soon!'
  },
  {
    id: 'work-project-safe',
    type: 'message',
    label: 'Team Meeting Invite',
    expectedClass: 'SAFE',
    tag: 'Work Collaboration',
    content: 'Hi Team, please find the agenda for tomorrow’s Q3 cybersecurity review attached in the project repository. Please review the slides beforehand so we can focus on discussion. Best, Sarah.'
  },
  {
    id: 'tax-irs-threat',
    type: 'message',
    label: 'IRS Tax Legal Action',
    expectedClass: 'LIKELY SCAM',
    tag: 'Authority Coercion',
    content: 'FINAL NOTICE from Federal Tax Enforcement: A warrant has been issued against you for overdue tax liability. Immediate payment via wire transfer is required to avoid arrest. Act now!'
  }
];

export const URL_PRESETS: PresetExample[] = [
  {
    id: 'url-bank-ip',
    type: 'url',
    label: 'IP Host Bank Phishing',
    expectedClass: 'LIKELY SCAM',
    tag: 'Direct IP + Brand Spoof',
    content: 'http://192.168.1.104/secure-chase-bank/login.php'
  },
  {
    id: 'url-paypa1-typo',
    type: 'url',
    label: 'PayPal Typosquat TLD',
    expectedClass: 'LIKELY SCAM',
    tag: 'Typosquatting + .xyz',
    content: 'http://paypa1-account-resolution.xyz/verify-security'
  },
  {
    id: 'url-shortener-prize',
    type: 'url',
    label: 'Shortened Prize Link',
    expectedClass: 'SUSPICIOUS',
    tag: 'Bitly + Opaque Destination',
    content: 'https://bit.ly/claim-free-iphone-gift-card'
  },
  {
    id: 'url-github-safe',
    type: 'url',
    label: 'GitHub Repository',
    expectedClass: 'SAFE',
    tag: 'Legitimate Software Host',
    content: 'https://github.com/OWASP/CheatSheetSeries'
  },
  {
    id: 'url-who-safe',
    type: 'url',
    label: 'World Health Org Page',
    expectedClass: 'SAFE',
    tag: 'Verified Official Domain',
    content: 'https://www.who.int/news-room/fact-sheets'
  }
];

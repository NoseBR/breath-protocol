export interface Credential {
  name: string;
  type: string;
  category: "Membership" | "Finance" | "Identity";
  description: string;
  gradient: string;
  initial: string;
  verified: boolean;
}

export const credentials: Credential[] = [
  // ── Membership (25) ──────────────────────────
  { name: "Accor Live Limitless", type: "Membership", category: "Membership", description: "Unlock exclusive deals and promotions, personalized offers, and seamless stays with your Accor Live Limitless", gradient: "from-signal-rose to-[#E05585]", initial: "AL", verified: false },
  { name: "Caesars Rewards", type: "Membership", category: "Membership", description: "Maximize your entertainment with exciting deals and promotions! Access special deals and promotions with", gradient: "from-vital-violet to-[#5E22A0]", initial: "CR", verified: false },
  { name: "MGM Rewards", type: "Membership", category: "Membership", description: "Experience the best of MGM Resorts with exclusive deals and offers. Your MGM Rewards membership gives you", gradient: "from-thermal-cyan to-[#00A88A]", initial: "MR", verified: false },
  { name: "SkyMiles Loyalty Progr...", type: "Membership", category: "Membership", description: "Your passport to elevated travel! Access special member deals and promotions with your Delta SkyMiles loyalty", gradient: "from-breath-lavender to-vital-violet", initial: "SM", verified: false },
  { name: "Ryanair Membership Pr...", type: "Membership", category: "Membership", description: "Snag exclusive member-only sales and special offers with your Ryanair Membership Profile.", gradient: "from-[#073590] to-[#0A4DC7]", initial: "RA", verified: false },
  { name: "JetBlue TrueBlue Mem...", type: "Membership", category: "Membership", description: "Enjoy TrueBlue perks! Verify your JetBlue membership to unlock a variety of deals and offers.", gradient: "from-[#0033A0] to-[#0055CC]", initial: "JB", verified: false },
  { name: "American AAdvantage", type: "Membership", category: "Membership", description: "Access special offers and promotions designed exclusively for American AAdvantage members.", gradient: "from-[#C8102E] to-[#E02040]", initial: "AA", verified: false },
  { name: "Wyndham Rewards", type: "Membership", category: "Membership", description: "Your key to unforgettable stays! Access exclusive member deals and promotions with your Wyndham Rewards", gradient: "from-[#00659E] to-[#0080C8]", initial: "WR", verified: false },
  { name: "Etihad Guest Members...", type: "Membership", category: "Membership", description: "Experience luxury with special promotions and opportunities! Verify your Etihad Guest membership for", gradient: "from-[#BD8B3E] to-[#D4A44E]", initial: "EG", verified: false },
  { name: "Shangri-La Circle Mem...", type: "Membership", category: "Membership", description: "Indulge in privileges with member-exclusive offers and special deals. Verify your Shangri-La Circle membership", gradient: "from-[#8B6F4E] to-[#A08560]", initial: "SL", verified: false },
  { name: "Taj InnerCircle (India)", type: "Membership", category: "Membership", description: "Discover special member-only deals and unique promotions with your Taj InnerCircle Membership.", gradient: "from-[#B8860B] to-[#D4A017]", initial: "TJ", verified: false },
  { name: "Wynn Rewards", type: "Membership", category: "Membership", description: "Elevate your moments at Wynn Resorts. Access special offers and promotions designed exclusively for Wynn", gradient: "from-[#8B0000] to-[#B22222]", initial: "WY", verified: false },
  { name: "Skywards Frequent Flyer", type: "Membership", category: "Membership", description: "Journey more, earn more! Access special offers and deals with your Emirates Skywards Frequent Flyer Membership.", gradient: "from-[#D4AF37] to-[#C49A2A]", initial: "EK", verified: false },
  { name: "KrisFlyer Membership", type: "Membership", category: "Membership", description: "Experience the world and explore a variety of promotions and opportunities with your KrisFlyer Membership.", gradient: "from-[#003B6F] to-[#005599]", initial: "KF", verified: false },
  { name: "Asia Miles Membership", type: "Membership", category: "Membership", description: "Unlock a world of rewards! Access special offers on flights, hotels, shopping, and more with your Asia Miles", gradient: "from-[#6B1D5E] to-[#8B2575]", initial: "AM", verified: false },
  { name: "SKYPASS", type: "Membership", category: "Membership", description: "Access special promotions and offers! Verify your Korean Air SKYPASS Membership.", gradient: "from-[#003087] to-[#0050B0]", initial: "KE", verified: false },
  { name: "Marriott Bonvoy Memb...", type: "Membership", category: "Membership", description: "Your gateway to incredible stays! Access a wealth of engaging promotions and offers with your Marriott Bonvoy", gradient: "from-[#862633] to-[#A33040]", initial: "MB", verified: false },
  { name: "Radisson Rewards", type: "Membership", category: "Membership", description: "Access exclusive member-only offers and promotions with your Radisson Rewards Membership.", gradient: "from-[#003B71] to-[#005599]", initial: "RR", verified: false },
  { name: "Hilton Honors Members...", type: "Membership", category: "Membership", description: "Access exclusive member-only offers and promotions with your Hilton Honors Membership.", gradient: "from-[#104C97] to-[#1565C0]", initial: "HH", verified: false },
  { name: "Velocity Frequent Flyer", type: "Membership", category: "Membership", description: "Access exclusive member-only offers and promotions with your Velocity Frequent Flyer membership.", gradient: "from-[#E4002B] to-[#FF1744]", initial: "VF", verified: false },
  { name: "Royal Orchid Plus", type: "Membership", category: "Membership", description: "Elevate your travel with exciting promotions and deals with your Royal Orchid Plus membership.", gradient: "from-[#6A0DAD] to-[#8B2FC0]", initial: "RO", verified: false },
  { name: "Frontier Miles", type: "Membership", category: "Membership", description: "Unlock value and flexibility! Access exclusive deals and promotions with your Frontier Miles membership.", gradient: "from-[#006847] to-[#008060]", initial: "FM", verified: false },
  { name: "Spirit Free Spirit Memb...", type: "Membership", category: "Membership", description: "Fly smarter and save more! Access exclusive member-only offers and promotions with your Spirit Free Spirit", gradient: "from-[#FFD200] to-[#FFBA00]", initial: "SS", verified: false },
  { name: "Lufthansa Miles & More", type: "Membership", category: "Membership", description: "Unlock premium travel benefits! Access exclusive offers and promotions with your Lufthansa Miles & More", gradient: "from-[#05164D] to-[#0A2270]", initial: "LH", verified: false },
  { name: "Turkish Miles & Smiles", type: "Membership", category: "Membership", description: "Experience superior travel! Access special offers and deals with your Turkish Miles & Smiles membership.", gradient: "from-[#C8102E] to-[#E02040]", initial: "TK", verified: false },

  // ── Finance (4) ──────────────────────────────
  { name: "Proof of Assets", type: "Finance", category: "Finance", description: "Connect your banks to automatically reflect your USD balance, unlocking tiers at $100, $10K, $1M.", gradient: "from-signal-rose to-[#E05585]", initial: "PA", verified: false },
  { name: "Proof of Investments", type: "Finance", category: "Finance", description: "Show verified balances across your investment accounts connected through Mastercard. Balances are rounded to", gradient: "from-signal-rose to-[#D04070]", initial: "PI", verified: false },
  { name: "Proof of Retirement Savin...", type: "Finance", category: "Finance", description: "Demonstrate your verified retirement savings from accounts like 401(k) and IRAs connected through", gradient: "from-signal-rose to-[#C03060]", initial: "PR", verified: false },
  { name: "Proof of Mortgage", type: "Finance", category: "Finance", description: "Verify outstanding mortgage balances from your Mastercard-linked lending institutions, rounded to the", gradient: "from-signal-rose to-[#B02050]", initial: "PM", verified: false },

  // ── Identity (2) ─────────────────────────────
  { name: "Proof of KYC via Masterc...", type: "Identity", category: "Identity", description: "Verify your identity instantly by connecting a bank account through Mastercard. We confirm the account holder and", gradient: "from-signal-rose to-[#E05585]", initial: "KY", verified: false },
  { name: "Proof of Residency", type: "Identity", category: "Identity", description: "Confirm your residency details using Mastercard-linked financial institutions. Country names are normalized to ISO", gradient: "from-signal-rose to-[#D04070]", initial: "RE", verified: false },
];

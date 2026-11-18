export const firm = {
  name: "Khan Associates",
  principal: "Asif Khan",
  mission: "Our work is beyond advice. It is practical wisdom.",
  email: "info@khanassoc.io",
  phone: "(619) 857-2878",
  phoneHref: "tel:+16198572878",
  address: ["2109 Striker Wy", "Celina, TX 75009"],
  hours: "7 AM – 7 PM Pacific, seven days a week",
  // Set to the Typeform intake URL once the form exists; until then the site points people to email.
  intakeUrl: "",
};

export const services = [
  {
    slug: "individual",
    name: "Individual Returns",
    price: "$200 per filing",
    summary:
      "Federal and state returns for W-2 earners, investors, landlords, and households that file in more than one state.",
    includes: [
      "Form 1040 and state returns",
      "Schedules C, D, and E for side income, investments, and rentals",
      "A prior-year review for missed credits",
    ],
  },
  {
    slug: "business",
    name: "Business Returns",
    price: "$200 per filing",
    summary:
      "Sole proprietors, partnerships, and S corporations, with a review of the year's books before filing.",
    includes: [
      "Forms 1065, 1120-S, and 1120",
      "K-1 preparation and distribution",
      "Quarterly estimate calculations",
    ],
  },
  {
    slug: "planning",
    name: "Tax Planning",
    price: "Quoted after consultation",
    summary:
      "Projections and decisions ahead of year end: entity choice, retirement contributions, and the timing of income.",
    includes: [
      "A written projection with scenarios",
      "A safe-harbor estimate schedule",
      "A follow-up call before December 31",
    ],
  },
  {
    slug: "representation",
    name: "IRS Notices & Representation",
    price: "Quoted after consultation",
    summary:
      "We answer notices, handle audits and payment plans, and speak to the IRS on your behalf under Form 2848.",
    includes: [
      "Notice review within two business days",
      "Power of attorney and transcript pulls",
      "Installment agreements and penalty abatement",
    ],
  },
];

export const steps = [
  {
    label: "Consultation",
    when: "Day 1",
    body: "A short call to review last year's return and agree on scope. Pricing is set before any work starts.",
  },
  {
    label: "Secure upload",
    when: "Day 1–3",
    body: "You get a private link to upload documents. Nothing is sent by email.",
  },
  {
    label: "Preparation and review",
    when: "Within a week",
    body: "Asif prepares the return and walks you through it, line by line if you want.",
  },
  {
    label: "Sign and file",
    when: "Same day",
    body: "You sign electronically with identity verification, and we file.",
  },
];

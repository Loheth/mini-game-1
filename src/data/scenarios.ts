export interface Character {
  id: string;
  name: string;
  description: string;
  behavior: string;
  isUnsafe: boolean;
}

export interface Scenario {
  id: number;
  theme: string;
  characters: Character[];
}

export const scenarios: Scenario[] = [
  {
    id: 1,
    theme: "Suspicious Email Activity",
    characters: [
      {
        id: "char1",
        name: "Alex",
        description: "Opens email attachments from unknown senders",
        behavior: "Opens email attachments from unknown senders without verifying the sender",
        isUnsafe: true,
      },
      {
        id: "char2",
        name: "Sam",
        description: "Verifies sender before opening attachments",
        behavior: "Always verifies sender identity before opening any email attachments",
        isUnsafe: false,
      },
      {
        id: "char3",
        name: "Jordan",
        description: "Uses email filtering and scans attachments",
        behavior: "Uses email filtering software and scans all attachments before opening",
        isUnsafe: false,
      },
    ],
  },
  {
    id: 2,
    theme: "Password Security",
    characters: [
      {
        id: "char1",
        name: "Casey",
        description: "Uses unique passwords for each account",
        behavior: "Uses unique, strong passwords for each account and stores them in a password manager",
        isUnsafe: false,
      },
      {
        id: "char2",
        name: "Morgan",
        description: "Reuses the same password everywhere",
        behavior: "Reuses the same password across multiple accounts for convenience",
        isUnsafe: true,
      },
      {
        id: "char3",
        name: "Riley",
        description: "Enables two-factor authentication",
        behavior: "Enables two-factor authentication on all accounts that support it",
        isUnsafe: false,
      },
    ],
  },
  {
    id: 3,
    theme: "Public Wi-Fi Usage",
    characters: [
      {
        id: "char1",
        name: "Taylor",
        description: "Connects to any open Wi-Fi network",
        behavior: "Connects to any open Wi-Fi network without checking its legitimacy",
        isUnsafe: true,
      },
      {
        id: "char2",
        name: "Avery",
        description: "Uses VPN on public networks",
        behavior: "Always uses a VPN when connecting to public Wi-Fi networks",
        isUnsafe: false,
      },
      {
        id: "char3",
        name: "Quinn",
        description: "Avoids sensitive transactions on public Wi-Fi",
        behavior: "Avoids accessing sensitive accounts or making transactions on public Wi-Fi",
        isUnsafe: false,
      },
    ],
  },
  {
    id: 4,
    theme: "Software Updates",
    characters: [
      {
        id: "char1",
        name: "Blake",
        description: "Installs updates immediately when available",
        behavior: "Installs security updates immediately when they become available",
        isUnsafe: false,
      },
      {
        id: "char2",
        name: "Cameron",
        description: "Ignores update notifications",
        behavior: "Ignores update notifications and postpones them indefinitely",
        isUnsafe: true,
      },
      {
        id: "char3",
        name: "Dakota",
        description: "Schedules regular update checks",
        behavior: "Schedules regular automatic update checks and installs them promptly",
        isUnsafe: false,
      },
    ],
  },
  {
    id: 5,
        theme: "Social Engineering",
    characters: [
      {
        id: "char1",
        name: "Emery",
        description: "Shares personal info on social media",
        behavior: "Shares personal information, location, and daily routines publicly on social media",
        isUnsafe: true,
      },
      {
        id: "char2",
        name: "Finley",
        description: "Uses privacy settings and limits sharing",
        behavior: "Uses strict privacy settings and limits what personal information is shared online",
        isUnsafe: false,
      },
      {
        id: "char3",
        name: "Harper",
        description: "Verifies requests before sharing data",
        behavior: "Always verifies requests for personal information before sharing any data",
        isUnsafe: false,
      },
    ],
  },
  {
    id: 6,
    theme: "USB Device Security",
    characters: [
      {
        id: "char1",
        name: "Indigo",
        description: "Plugs in unknown USB devices",
        behavior: "Plugs in USB devices found on the ground or received from unknown sources",
        isUnsafe: true,
      },
      {
        id: "char2",
        name: "Jules",
        description: "Scans USB devices before use",
        behavior: "Scans all USB devices with antivirus software before accessing them",
        isUnsafe: false,
      },
      {
        id: "char3",
        name: "Kai",
        description: "Only uses trusted USB devices",
        behavior: "Only uses USB devices from trusted sources and never plugs in unknown devices",
        isUnsafe: false,
      },
    ],
  },
  {
    id: 7,
    theme: "Phishing Awareness",
    characters: [
      {
        id: "char1",
        name: "Lane",
        description: "Clicks links without checking URLs",
        behavior: "Clicks on links in emails and messages without checking the URL or sender",
        isUnsafe: true,
      },
      {
        id: "char2",
        name: "Nova",
        description: "Hovers over links to verify URLs",
        behavior: "Hovers over links to verify URLs before clicking and checks for suspicious domains",
        isUnsafe: false,
      },
      {
        id: "char3",
        name: "Phoenix",
        description: "Types URLs directly instead of clicking",
        behavior: "Types URLs directly into the browser instead of clicking links in messages",
        isUnsafe: false,
      },
    ],
  },
  {
    id: 8,
    theme: "Data Backup",
    characters: [
      {
        id: "char1",
        name: "River",
        description: "Backs up data regularly to cloud",
        behavior: "Backs up important data regularly to encrypted cloud storage",
        isUnsafe: false,
      },
      {
        id: "char2",
        name: "Sage",
        description: "Never backs up important files",
        behavior: "Never backs up important files, risking permanent data loss",
        isUnsafe: true,
      },
      {
        id: "char3",
        name: "Skyler",
        description: "Uses multiple backup methods",
        behavior: "Uses multiple backup methods including local and cloud storage",
        isUnsafe: false,
      },
    ],
  },
  {
    id: 9,
    theme: "Browser Security",
    characters: [
      {
        id: "char1",
        name: "Tatum",
        description: "Disables browser security features",
        behavior: "Disables browser security features and pop-up blockers for convenience",
        isUnsafe: true,
      },
      {
        id: "char2",
        name: "Wren",
        description: "Uses ad blockers and security extensions",
        behavior: "Uses ad blockers and security extensions to protect against malicious content",
        isUnsafe: false,
      },
      {
        id: "char3",
        name: "Zion",
        description: "Keeps browser updated",
        behavior: "Keeps browser updated and uses secure browsing practices",
        isUnsafe: false,
      },
    ],
  },
  {
    id: 10,
    theme: "Multi-Factor Authentication",
    characters: [
      {
        id: "char1",
        name: "Ace",
        description: "Enables MFA everywhere possible",
        behavior: "Enables multi-factor authentication on all accounts that support it",
        isUnsafe: false,
      },
      {
        id: "char2",
        name: "Blaze",
        description: "Refuses to use MFA",
        behavior: "Refuses to use multi-factor authentication, considering it too inconvenient",
        isUnsafe: true,
      },
      {
        id: "char3",
        name: "Cruz",
        description: "Uses authenticator apps",
        behavior: "Uses authenticator apps instead of SMS for more secure MFA",
        isUnsafe: false,
      },
    ],
  },
];


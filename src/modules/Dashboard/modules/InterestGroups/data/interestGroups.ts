// ./data/interestGroups.ts
export interface CareerPath {
    title: string;
    description: string;
    skills: string[];
  }
  
  export interface Event {
    id: string;
    title: string;
    link: string;
    venue: string;
    eventType: "Online" | "Offline";
    date: string;
    time: string;
    image: string;
  }
  
  export interface LearningPath {
    id: string;
    title: string;
    description: string;
    link: string;
  }
  
  export interface CardData {
    id?: number | string;
    name: string;
    muid?: string;
    role?: string;
    interest_groups?: { id: string; name: string }[];
    expertise?: string[];
    organizations?: { id: string; title: string; code: string; org_type: string }[];
    profile_pic?: string | null;
    image?: string;
    karma?: string;
  }
  
  export interface CommunityPartner {
    id: string;
    title: string;
    image: string;
    link: string;
  }
  
  export interface PartnerCompany {
    id: string;
    title: string;
    image: string;
    link: string;
  }
  
  export interface InterestGroupData {
    id: string;
    title: string;
    description: string;
    bannerImage: string;
    memberCount: number;
    memberSince: string;
    isPublic: boolean;
    tabs: {
      about: {
        description: string;
        careerPaths: CareerPath[];
      };
      forum: {
        placeholder: string;
      };
      members: CardData[];
      events: Event[];
      learningPaths: LearningPath[];
      thinkTank: CardData[];
      mentors: CardData[];
    };
    communityPartners: CommunityPartner[];
    partnerCompanies: PartnerCompany[];
  }
  
  // Array of all interest groups
  export const interestGroups: InterestGroupData[] = [
    // UI/UX Interest Group (your original data)
    {
      id: "15edd535-08d2-4619-9da7-944e21365de9",
      title: "UI/UX Interest Group",
      description: "A community dedicated to exploring user interface and user experience design, sharing best practices, and fostering creativity in digital product design.",
      bannerImage: "https://images.unsplash.com/photo-1495539406979-bf61750d38ad?q=80&w=3540&auto=format&fit=crop",
      memberCount: 65300,
      memberSince: "July 2022",
      isPublic: true,
      tabs: {
        about: {
          description: "Welcome to the UI/UX Interest Group! We’re a vibrant community of designers, researchers, and enthusiasts passionate about crafting intuitive and beautiful digital experiences.",
          careerPaths: [
            { title: "UI Designer", description: "Focuses on visual aesthetics and layout.", skills: ["Figma", "Adobe XD"] },
            { title: "UX Researcher", description: "Conducts user studies to improve usability.", skills: ["User Interviews", "Usability Testing"] },
          ],
        },
        forum: { placeholder: "Forum discussions will be displayed here." },
        members: [
          { id: 1, name: "Alice Johnson", muid: "alice123", profile_pic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80", karma: "1200", interest_groups: [{ id: "15edd535-08d2-4619-9da7-944e21365de9", name: "UI/UX Interest Group" }], organizations: [{ id: "org-1", title: "Design College", code: "DC01", org_type: "College" }] },
          { id: 2, name: "Bob Smith", muid: "bob456", profile_pic: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&q=80", karma: "950", interest_groups: [{ id: "15edd535-08d2-4619-9da7-944e21365de9", name: "UI/UX Interest Group" }], organizations: [{ id: "org-2", title: "Art Institute", code: "AI01", org_type: "College" }] },
          { id: 3, name: "Charlie Brown", muid: "charlie789", profile_pic: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&q=80", karma: "1800", interest_groups: [{ id: "15edd535-08d2-4619-9da7-944e21365de9", name: "UI/UX Interest Group" }], organizations: [{ id: "org-3", title: "UX Academy", code: "UXA01", org_type: "College" }] },
          { id: 4, name: "Diana Lee", muid: "diana101", profile_pic: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&q=80", karma: "750", interest_groups: [{ id: "15edd535-08d2-4619-9da7-944e21365de9", name: "UI/UX Interest Group" }], organizations: [{ id: "org-4", title: "Design School", code: "DS01", org_type: "College" }] },
          { id: 5, name: "Eve Parker", muid: "eve202", profile_pic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&q=80", karma: "2000", interest_groups: [{ id: "15edd535-08d2-4619-9da7-944e21365de9", name: "UI/UX Interest Group" }], organizations: [{ id: "org-5", title: "Creative Institute", code: "CI01", org_type: "College" }] },
        ],
        events: [
          { id: "evt-001", title: "UI/UX Design Sprint Workshop", link: "https://uiuxcommunity.com/events/design-sprint", venue: "Online via Zoom", eventType: "Online", date: "March 15, 2025", time: "14:00 - 17:00 GMT", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800" },
          { id: "evt-002", title: "Figma Advanced Prototyping Masterclass", link: "https://uiuxcommunity.com/events/figma-masterclass", venue: "Semarang Convention Center", eventType: "Offline", date: "April 10, 2025", time: "09:00 - 12:00 WIB", image: '/assets/interestgroup_assets/Top100Desigers3.png' },
          { id: "evt-003", title: "User Research Techniques Webinar", link: "https://uiuxcommunity.com/events/user-research-webinar", venue: "Online via Microsoft Teams", eventType: "Online", date: "May 5, 2025", time: "10:00 - 11:30 GMT", image: '/assets/interestgroup_assets/Top100Desigers2.png' },
          { id: "evt-004", title: "UI Design Trends 2025 Conference", link: "https://uiuxcommunity.com/events/ui-trends-2025", venue: "Jakarta Design Hub", eventType: "Offline", date: "June 20, 2025", time: "13:00 - 17:00 WIB", image: '/assets/interestgroup_assets/Top100Desigers3.png' },
          { id: "evt-005", title: "Accessibility in UX Design Workshop", link: "https://uiuxcommunity.com/events/accessibility-workshop", venue: "Online via Google Meet", eventType: "Online", date: "July 12, 2025", time: "15:00 - 16:30 GMT", image: '/assets/interestgroup_assets/Top100Desigers2.png' },
        ],
        learningPaths: [
          { id: "lp-001", title: "UI Design Fundamentals", description: "Master UI basics with Figma.", link: "/learning-paths/ui-design" },
        ],
        thinkTank: [
          { id: "tt-001", name: "Sarah Lin", role: "Senior UX Designer, Google", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80", expertise: ["UX Design", "Prototyping"] },
        ],
        mentors: [
          { id: "m-001", name: "Priya Sharma", role: "UI/UX Consultant, Freelance", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&q=80", expertise: ["UI Design", "User Research"] },
        ],
      },
      communityPartners: [
        { id: "cp-001", title: "UI/UX Community Semarang", image: "https://www.svgrepo.com/show/452142/adobe.svg", link: "https://uiuxsemarang.org" },
      ],
      partnerCompanies: [
        { id: "pc-001", title: "Tokoh Design Studio", image: "https://www.svgrepo.com/show/452202/figma.svg", link: "https://tokohstudio.com" },
      ],
    },
  
    // Web Development Interest Group
    {
      id: "25fdd535-08d2-4619-9da7-944e21365de9",
      title: "Web Development Interest Group",
      description: "A hub for web developers to collaborate, learn modern frameworks, and build cutting-edge web applications.",
      bannerImage: "https://images.unsplash.com/photo-1555949963-1f3bd3a856de?q=80&w=3540&auto=format&fit=crop",
      memberCount: 48200,
      memberSince: "March 2021",
      isPublic: true,
      tabs: {
        about: {
          description: "Join the Web Development Interest Group to master the art of building responsive, scalable, and performant websites. From front-end to back-end, we’ve got you covered!",
          careerPaths: [
            { title: "Front-End Developer", description: "Creates user-facing interfaces.", skills: ["HTML", "CSS", "React"] },
            { title: "Back-End Developer", description: "Manages server-side logic and databases.", skills: ["Node.js", "Express", "MongoDB"] },
          ],
        },
        forum: { placeholder: "Discuss web dev trends here." },
        members: [
          { id: 11, name: "Liam Carter", muid: "liam890", profile_pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&q=80", karma: "1500", interest_groups: [{ id: "25fdd535-08d2-4619-9da7-944e21365de9", name: "Web Development Interest Group" }], organizations: [{ id: "org-12", title: "Tech University", code: "TU01", org_type: "College" }] },
          { id: 12, name: "Sophia Nguyen", muid: "sophia234", profile_pic: "https://images.unsplash.com/photo-1517841902196-6df2113b4251?w=40&h=40&q=80", karma: "1100", interest_groups: [{ id: "25fdd535-08d2-4619-9da7-944e21365de9", name: "Web Development Interest Group" }], organizations: [{ id: "org-13", title: "Code Academy", code: "CA01", org_type: "College" }] },
          { id: 13, name: "Noah Patel", muid: "noah567", profile_pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&q=80", karma: "1900", interest_groups: [{ id: "25fdd535-08d2-4619-9da7-944e21365de9", name: "Web Development Interest Group" }], organizations: [{ id: "org-14", title: "Web Institute", code: "WI01", org_type: "College" }] },
        ],
        events: [
          { id: "evt-006", title: "React Summit 2025", link: "https://webdevcommunity.com/events/react-summit", venue: "Online via Zoom", eventType: "Online", date: "March 20, 2025", time: "13:00 - 16:00 GMT", image: "https://images.unsplash.com/photo-1551288049-b51d5a7480e7?q=80&w=800" },
          { id: "evt-007", title: "Node.js Bootcamp", link: "https://webdevcommunity.com/events/nodejs-bootcamp", venue: "Bandung Tech Hub", eventType: "Offline", date: "April 25, 2025", time: "10:00 - 14:00 WIB", image: '/assets/interestgroup_assets/Top100Desigers2.png' },
        ],
        learningPaths: [
          { id: "lp-002", title: "Full-Stack Web Development", description: "Learn to build full-stack apps with MERN.", link: "/learning-paths/full-stack" },
        ],
        thinkTank: [
          { id: "tt-002", name: "Ethan Brooks", role: "Lead Developer, Vercel", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&q=80", expertise: ["React", "Next.js"] },
        ],
        mentors: [
          { id: "m-002", name: "Olivia Hayes", role: "Senior Web Engineer, Freelance", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=40&h=40&q=80", expertise: ["JavaScript", "TypeScript"] },
        ],
      },
      communityPartners: [
        { id: "cp-002", title: "Web Dev Indonesia", image: "https://www.svgrepo.com/show/452228/html-5.svg", link: "https://webdevindo.org" },
      ],
      partnerCompanies: [
        { id: "pc-002", title: "NextJS Studio", image: "https://www.svgrepo.com/show/354113/nextjs-icon.svg", link: "https://nextjsstudio.com" },
      ],
    },
  
    // Cyber Security Interest Group
    {
      id: "35fdd535-08d2-4619-9da7-944e21365de9",
      title: "Cyber Security Interest Group",
      description: "A community focused on protecting digital systems, networks, and data from cyber threats.",
      bannerImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=3540&auto=format&fit=crop",
      memberCount: 32000,
      memberSince: "September 2020",
      isPublic: true,
      tabs: {
        about: {
          description: "The Cyber Security Interest Group is your go-to place for learning about cybersecurity best practices, ethical hacking, and staying ahead of digital threats.",
          careerPaths: [
            { title: "Ethical Hacker", description: "Tests systems for vulnerabilities.", skills: ["Kali Linux", "Wireshark"] },
            { title: "Security Analyst", description: "Monitors and protects networks.", skills: ["SIEM", "Firewalls"] },
          ],
        },
        forum: { placeholder: "Share cybersecurity tips here." },
        members: [
          { id: 14, name: "Mason Kim", muid: "mason890", profile_pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&q=80", karma: "1300", interest_groups: [{ id: "35fdd535-08d2-4619-9da7-944e21365de9", name: "Cyber Security Interest Group" }], organizations: [{ id: "org-15", title: "Security Academy", code: "SA01", org_type: "College" }] },
          { id: 15, name: "Ava Lopez", muid: "ava345", profile_pic: "https://images.unsplash.com/photo-1517841902196-6df2113b4251?w=40&h=40&q=80", karma: "900", interest_groups: [{ id: "35fdd535-08d2-4619-9da7-944e21365de9", name: "Cyber Security Interest Group" }], organizations: [{ id: "org-16", title: "Cyber College", code: "CC01", org_type: "College" }] },
        ],
        events: [
          { id: "evt-008", title: "Ethical Hacking Workshop", link: "https://cyberseccommunity.com/events/hacking-workshop", venue: "Online via Zoom", eventType: "Online", date: "March 25, 2025", time: "14:00 - 16:00 GMT", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800" },
        ],
        learningPaths: [
          { id: "lp-003", title: "Cybersecurity Basics", description: "Learn the fundamentals of securing systems.", link: "/learning-paths/cybersecurity" },
        ],
        thinkTank: [
          { id: "tt-003", name: "Lucas Reed", role: "Cybersecurity Expert, Cisco", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&q=80", expertise: ["Penetration Testing", "Network Security"] },
        ],
        mentors: [
          { id: "m-003", name: "Emma Watson", role: "Security Consultant, Freelance", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=40&h=40&q=80", expertise: ["Ethical Hacking", "Cryptography"] },
        ],
      },
      communityPartners: [
        { id: "cp-003", title: "CyberSec Indonesia", image: "https://www.svgrepo.com/show/452091/security.svg", link: "https://cybersecindo.org" },
      ],
      partnerCompanies: [
        { id: "pc-003", title: "SecureTech", image: "https://www.svgrepo.com/show/452092/shield.svg", link: "https://securetech.com" },
      ],
    },
  
    // Game Development Interest Group
    {
      id: "45fdd535-08d2-4619-9da7-944e21365de9",
      title: "Game Development Interest Group",
      description: "A community for game developers to create, share, and innovate in the world of gaming.",
      bannerImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=3540&auto=format&fit=crop",
      memberCount: 27500,
      memberSince: "January 2022",
      isPublic: true,
      tabs: {
        about: {
          description: "The Game Development Interest Group unites creators passionate about designing immersive gaming experiences using cutting-edge tools and techniques.",
          careerPaths: [
            { title: "Game Designer", description: "Crafts game mechanics and stories.", skills: ["Unity", "Unreal Engine"] },
            { title: "3D Artist", description: "Creates game assets and environments.", skills: ["Blender", "Maya"] },
          ],
        },
        forum: { placeholder: "Talk about game dev here." },
        members: [
          { id: 16, name: "Zoe Turner", muid: "zoe123", profile_pic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80", karma: "1600", interest_groups: [{ id: "45fdd535-08d2-4619-9da7-944e21365de9", name: "Game Development Interest Group" }], organizations: [{ id: "org-17", title: "Game College", code: "GC01", org_type: "College" }] },
        ],
        events: [
          { id: "evt-009", title: "Unity Game Jam 2025", link: "https://gamedevcommunity.com/events/game-jam", venue: "Online via Discord", eventType: "Online", date: "April 15, 2025", time: "12:00 - 18:00 GMT", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800" },
        ],
        learningPaths: [
          { id: "lp-004", title: "Game Dev with Unity", description: "Build your first game with Unity.", link: "/learning-paths/unity" },
        ],
        thinkTank: [
          { id: "tt-004", name: "James Carter", role: "Lead Game Designer, Epic Games", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&q=80", expertise: ["Game Design", "Unreal Engine"] },
        ],
        mentors: [
          { id: "m-004", name: "Mia Foster", role: "Indie Game Developer", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&q=80", expertise: ["Unity", "C#"] },
        ],
      },
      communityPartners: [
        { id: "cp-004", title: "Game Dev Hub", image: "https://www.svgrepo.com/show/452229/unity.svg", link: "https://gamedevhub.org" },
      ],
      partnerCompanies: [
        { id: "pc-004", title: "Pixel Studio", image: "https://www.svgrepo.com/show/452230/unreal-engine.svg", link: "https://pixelstudio.com" },
      ],
    },
  
    // Internet of Things (IoT) Interest Group
    {
      id: "55fdd535-08d2-4619-9da7-944e21365de9",
      title: "Internet of Things Interest Group",
      description: "A community exploring the intersection of hardware, software, and connectivity in IoT solutions.",
      bannerImage: "https://images.unsplash.com/photo-1568952433726-389014c78d5b?q=80&w=3540&auto=format&fit=crop",
      memberCount: 19800,
      memberSince: "May 2021",
      isPublic: true,
      tabs: {
        about: {
          description: "The IoT Interest Group connects enthusiasts and professionals working on smart devices, sensors, and connected systems.",
          careerPaths: [
            { title: "IoT Engineer", description: "Designs and builds IoT systems.", skills: ["Arduino", "Raspberry Pi"] },
            { title: "IoT Security Specialist", description: "Secures connected devices.", skills: ["Encryption", "Network Security"] },
          ],
        },
        forum: { placeholder: "Discuss IoT projects here." },
        members: [
          { id: 17, name: "Lucas Bennett", muid: "lucas456", profile_pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&q=80", karma: "1400", interest_groups: [{ id: "55fdd535-08d2-4619-9da7-944e21365de9", name: "Internet of Things Interest Group" }], organizations: [{ id: "org-18", title: "IoT Academy", code: "IA01", org_type: "College" }] },
        ],
        events: [
          { id: "evt-010", title: "IoT Hackathon 2025", link: "https://iotcommunity.com/events/hackathon", venue: "Surabaya Tech Center", eventType: "Offline", date: "May 10, 2025", time: "09:00 - 17:00 WIB", image: "https://images.unsplash.com/photo-1568952433726-389014c78d5b?q=80&w=800" },
        ],
        learningPaths: [
          { id: "lp-005", title: "IoT Basics with Arduino", description: "Start building IoT devices.", link: "/learning-paths/iot-arduino" },
        ],
        thinkTank: [
          { id: "tt-005", name: "Aiden Clark", role: "IoT Architect, Intel", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&q=80", expertise: ["Embedded Systems", "IoT Security"] },
        ],
        mentors: [
          { id: "m-005", name: "Ella Rivera", role: "IoT Developer, Freelance", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=40&h=40&q=80", expertise: ["MQTT", "ESP32"] },
        ],
      },
      communityPartners: [
        { id: "cp-005", title: "IoT Indonesia", image: "https://www.svgrepo.com/show/452143/arduino.svg", link: "https://iotindo.org" },
      ],
      partnerCompanies: [
        { id: "pc-005", title: "SmartTech IoT", image: "https://www.svgrepo.com/show/452144/raspberry-pi.svg", link: "https://smarttech-iot.com" },
      ],
    },
  
    // Human Resources Interest Group
    {
      id: "65fdd535-08d2-4619-9da7-944e21365de9",
      title: "Human Resources Interest Group",
      description: "A community for HR professionals to enhance skills in talent management, recruitment, and employee engagement.",
      bannerImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=3540&auto=format&fit=crop",
      memberCount: 15400,
      memberSince: "August 2020",
      isPublic: true,
      tabs: {
        about: {
          description: "The Human Resources Interest Group supports HR enthusiasts in mastering modern HR practices and fostering positive workplace cultures.",
          careerPaths: [
            { title: "HR Manager", description: "Oversees employee relations and policies.", skills: ["Recruitment", "Conflict Resolution"] },
            { title: "Talent Acquisition Specialist", description: "Sources and hires top talent.", skills: ["Interviewing", "ATS Tools"] },
          ],
        },
        forum: { placeholder: "Share HR insights here." },
        members: [
          { id: 18, name: "Isabella Moore", muid: "isabella789", profile_pic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80", karma: "1200", interest_groups: [{ id: "65fdd535-08d2-4619-9da7-944e21365de9", name: "Human Resources Interest Group" }], organizations: [{ id: "org-19", title: "HR Academy", code: "HRA01", org_type: "College" }] },
        ],
        events: [
          { id: "evt-011", title: "HR Trends 2025 Summit", link: "https://hrcommunity.com/events/hr-trends", venue: "Online via Zoom", eventType: "Online", date: "June 15, 2025", time: "10:00 - 13:00 GMT", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800" },
        ],
        learningPaths: [
          { id: "lp-006", title: "HR Management Essentials", description: "Learn core HR skills.", link: "/learning-paths/hr-management" },
        ],
        thinkTank: [
          { id: "tt-006", name: "Oliver Grant", role: "HR Director, LinkedIn", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&q=80", expertise: ["Talent Management", "Employee Engagement"] },
        ],
        mentors: [
          { id: "m-006", name: "Sophie Evans", role: "HR Consultant, Freelance", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&q=80", expertise: ["Recruitment", "HR Analytics"] },
        ],
      },
      communityPartners: [
        { id: "cp-006", title: "HR Network Indonesia", image: "https://www.svgrepo.com/show/452145/linkedin.svg", link: "https://hrnetworkindo.org" },
      ],
      partnerCompanies: [
        { id: "pc-006", title: "PeopleFirst HR", image: "https://www.svgrepo.com/show/452146/hr.svg", link: "https://peoplefirsthr.com" },
      ],
    },
  
    // Digital Marketing Interest Group
    {
      id: "75fdd535-08d2-4619-9da7-944e21365de9",
      title: "Digital Marketing Interest Group",
      description: "A community for marketers to master digital strategies, SEO, and content creation.",
      bannerImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=3540&auto=format&fit=crop",
      memberCount: 23700,
      memberSince: "November 2021",
      isPublic: true,
      tabs: {
        about: {
          description: "The Digital Marketing Interest Group is where marketers come to learn, share, and grow in the fast-paced world of online advertising and branding.",
          careerPaths: [
            { title: "SEO Specialist", description: "Optimizes websites for search engines.", skills: ["Google Analytics", "SEO Tools"] },
            { title: "Content Marketer", description: "Creates engaging digital content.", skills: ["Copywriting", "Social Media"] },
          ],
        },
        forum: { placeholder: "Discuss marketing strategies here." },
        members: [
          { id: 19, name: "Harper Scott", muid: "harper123", profile_pic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80", karma: "1350", interest_groups: [{ id: "75fdd535-08d2-4619-9da7-944e21365de9", name: "Digital Marketing Interest Group" }], organizations: [{ id: "org-20", title: "Marketing College", code: "MC01", org_type: "College" }] },
        ],
        events: [
          { id: "evt-012", title: "SEO Mastery Workshop", link: "https://digitalmarketingcommunity.com/events/seo-workshop", venue: "Online via Zoom", eventType: "Online", date: "July 20, 2025", time: "11:00 - 13:00 GMT", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800" },
        ],
        learningPaths: [
          { id: "lp-007", title: "Digital Marketing Fundamentals", description: "Learn SEO and PPC basics.", link: "/learning-paths/digital-marketing" },
        ],
        thinkTank: [
          { id: "tt-007", name: "Nathan Brooks", role: "Marketing Strategist, HubSpot", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&q=80", expertise: ["SEO", "Content Marketing"] },
        ],
        mentors: [
          { id: "m-007", name: "Lily Adams", role: "Digital Marketer, Freelance", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=40&h=40&q=80", expertise: ["Social Media", "Analytics"] },
        ],
      },
      communityPartners: [
        { id: "cp-007", title: "Digital Marketing Indonesia", image: "https://www.svgrepo.com/show/452147/google-analytics.svg", link: "https://digitalmarketingindo.org" },
      ],
      partnerCompanies: [
        { id: "pc-007", title: "BrandBoost", image: "https://www.svgrepo.com/show/452148/hubspot.svg", link: "https://brandboost.com" },
      ],
    },
  ];
  
  // Export individual groups for convenience (optional)
  export const uiuxInterestGroupData = interestGroups[0];
  export const webDevInterestGroupData = interestGroups[1];
  export const cyberSecInterestGroupData = interestGroups[2];
  export const gameDevInterestGroupData = interestGroups[3];
  export const iotInterestGroupData = interestGroups[4];
  export const hrInterestGroupData = interestGroups[5];
  export const digitalMarketingInterestGroupData = interestGroups[6];
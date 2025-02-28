// ./data/interestGroups.ts
export interface Opportunity {
  title: string;
  description: string;
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
  linkedin?: string;
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
  prerequisites: string[];
  officeHours: string;
  thinkTankMeeting: string;
  interestGroupLeads: {
    description: string;
    leads: {
      name: string;
      institution: string;
      linkedin: string;
      imageUrl: string;
    }[];
  };
  // Removed opportunities from root level
  peopleToFollow: {
    name: string;
    link: string;
  }[];
  blogsToFollow: {
    name: string;
    link: string;
  }[];
  topKeywords: string[];
  tabs: {
    about: {
      foundationDeck: string,
      description: string;
      opportunities: Opportunity[]; // Moved the big opportunities list here
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
  {
    id: "15edd535-08d2-4619-9da7-944e21365de9",
    title: "UI/UX Interest Group",
    description:
      "Welcome to the UI/UX Interest Group! We’re a vibrant community of designers, researchers, and enthusiasts passionate about crafting intuitive and beautiful digital experiences.",
    bannerImage:
      "https://images.unsplash.com/photo-1495539406979-bf61750d38ad?q=80&w=3540&auto=format&fit=crop",
    memberCount: 65300,
    memberSince: "July 2022",
    isPublic: true,
    officeHours: "Every Tuesday 7:30pm",
    thinkTankMeeting: "Saturdays 8:00pm",
    interestGroupLeads: {
      description:
        "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities within their interests.",
      leads: [
        {
          name: "Abikrishna S",
          institution: "St. Thomas Institute for Science and Technology",
          linkedin: "https://www.linkedin.com/in/abikrishna-s-70303323b/",
          imageUrl: "/assets/IG/UI-UX/IG Leads/Abikrishna S.png",
        },
      ],
    },
    // Removed opportunities from here
    peopleToFollow: [
      { name: "Julie Zhuo", link: "https://www.linkedin.com/in/julie-zhuo/" },
      { name: "Katie Dill", link: "https://www.linkedin.com/in/katie-dill-79168b3/" },
      { name: "Luke Wroblewski", link: "https://www.linkedin.com/in/lukew/" },
      { name: "Matt Przegietka", link: "https://www.linkedin.com/in/mattprzegietka/" },
    ],
    blogsToFollow: [
      { name: "Smashing Magazine", link: "https://www.smashingmagazine.com/" },
      { name: "Nielsen Norman Group (NN/g)", link: "https://www.nngroup.com/" },
      { name: "UX Collective", link: "https://uxdesign.cc/" },
    ],
    topKeywords: [
      "user-centered design",
      "wireframing",
      "prototyping",
      "usability testing",
      "interaction design",
      "accessibility",
      "responsive design",
      "microinteractions",
      "design systems",
    ],
    prerequisites: [
      "Learn wireframing and prototyping using tools like Figma to visualize and test design concepts.",
      "Develop a strong grasp of basic graphic design principles, such as alignment, contrast, and typography.",
      "Understand how to conduct user research and gather feedback to refine designs and meet user needs effectively.",
    ],
    tabs: {
      about: {
        foundationDeck: "https://www.notion.so/11e59e69b1bf807d8bf8dfe078c074d7?pvs=25",
        description:
          "Are you passionate about crafting seamless, intuitive digital experiences? The UI/UX Design Interest Group invites you to explore the world of user interfaces and experiences. Perfect for anyone interested in creating user-centric, engaging designs. Join us to learn how to balance aesthetics with functionality to improve user satisfaction and solve real-world problems.",
        opportunities: [
          {
            title: "UI Designer",
            description:
              "Focuses on creating aesthetically pleasing and functional user interfaces.",
          },
          {
            title: "UX Researcher",
            description:
              "Gathers user feedback and insights to improve the design process.",
          },
          {
            title: "Interaction Designer",
            description:
              "Works on interactive elements and transitions to enhance user engagement.",
          },
          {
            title: "UX Writer",
            description:
              "Specializes in crafting clear and effective content within user interfaces.",
          },
        ], // Moved the big opportunities list here
      },
      forum: { placeholder: "Forum discussions will be displayed here." },
      members: [
        {
          id: 1,
          name: "Alice Johnson",
          muid: "alice123",
          profile_pic:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80",
          karma: "1200",
          interest_groups: [
            { id: "15edd535-08d2-4619-9da7-944e21365de9", name: "UI/UX Interest Group" },
          ],
          organizations: [
            { id: "org-1", title: "Design College", code: "DC01", org_type: "College" },
          ],
        },
        {
          id: 2,
          name: "Bob Smith",
          muid: "bob456",
          profile_pic:
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&q=80",
          karma: "950",
          interest_groups: [
            { id: "15edd535-08d2-4619-9da7-944e21365de9", name: "UI/UX Interest Group" },
          ],
          organizations: [
            { id: "org-2", title: "Art Institute", code: "AI01", org_type: "College" },
          ],
        },
        {
          id: 3,
          name: "Charlie Brown",
          muid: "charlie789",
          profile_pic:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&q=80",
          karma: "1800",
          interest_groups: [
            { id: "15edd535-08d2-4619-9da7-944e21365de9", name: "UI/UX Interest Group" },
          ],
          organizations: [
            { id: "org-3", title: "UX Academy", code: "UXA01", org_type: "College" },
          ],
        },
        {
          id: 4,
          name: "Diana Lee",
          muid: "diana101",
          profile_pic:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&q=80",
          karma: "750",
          interest_groups: [
            { id: "15edd535-08d2-4619-9da7-944e21365de9", name: "UI/UX Interest Group" },
          ],
          organizations: [
            { id: "org-4", title: "Design School", code: "DS01", org_type: "College" },
          ],
        },
        {
          id: 5,
          name: "Eve Parker",
          muid: "eve202",
          profile_pic:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&q=80",
          karma: "2000",
          interest_groups: [
            { id: "15edd535-08d2-4619-9da7-944e21365de9", name: "UI/UX Interest Group" },
          ],
          organizations: [
            { id: "org-5", title: "Creative Institute", code: "CI01", org_type: "College" },
          ],
        },
      ],
      events: [
        {
          id: "evt-001",
          title: "UI/UX Design Sprint Workshop",
          link: "https://uiuxcommunity.com/events/design-sprint",
          venue: "Online via Zoom",
          eventType: "Online",
          date: "March 15, 2025",
          time: "14:00 - 17:00 GMT",
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800",
        },
        {
          id: "evt-002",
          title: "Figma Advanced Prototyping Masterclass",
          link: "https://uiuxcommunity.com/events/figma-masterclass",
          venue: "Semarang Convention Center",
          eventType: "Offline",
          date: "April 10, 2025",
          time: "09:00 - 12:00 WIB",
          image: "/assets/interestgroup_assets/Top100Desigers3.png",
        },
        {
          id: "evt-003",
          title: "User Research Techniques Webinar",
          link: "https://uiuxcommunity.com/events/user-research-webinar",
          venue: "Online via Microsoft Teams",
          eventType: "Online",
          date: "May 5, 2025",
          time: "10:00 - 11:30 GMT",
          image: "/assets/interestgroup_assets/Top100Desigers2.png",
        },
        {
          id: "evt-004",
          title: "UI Design Trends 2025 Conference",
          link: "https://uiuxcommunity.com/events/ui-trends-2025",
          venue: "Jakarta Design Hub",
          eventType: "Offline",
          date: "June 20, 2025",
          time: "13:00 - 17:00 WIB",
          image: "/assets/interestgroup_assets/Top100Desigers3.png",
        },
        {
          id: "evt-005",
          title: "Accessibility in UX Design Workshop",
          link: "https://uiuxcommunity.com/events/accessibility-workshop",
          venue: "Online via Google Meet",
          eventType: "Online",
          date: "July 12, 2025",
          time: "15:00 - 16:30 GMT",
          image: "/assets/interestgroup_assets/Top100Desigers2.png",
        },
      ],
      learningPaths: [
        {
          id: "lp-001",
          title: "UI Design Fundamentals",
          description: "Master UI basics with Figma.",
          link: "/learning-paths/ui-design",
        },
      ],
      thinkTank: [
        {
          id: "tt-001",
          name: "Sarah Lin",
          role: "Senior UX Designer, Google",
          image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80",
          expertise: ["UX Design", "Prototyping"],
        },
      ],
      mentors: [
        {
          id: "m-001",
          name: "Enric S Neelamkaavil",
          role: "Product Designer @UST Global, µLearn Alumni",
          linkedin: "https://www.linkedin.com/in/enricsneelamkavil/",
          image: "/assets/IG/UI-UX/Mentors/Enric S.jpg",
          expertise: ["UI Design", "User Research"],
        },
      ],
    },
    communityPartners: [
      {
        id: "cp-001",
        title: "UI/UX Community Semarang",
        image: "https://www.svgrepo.com/show/452142/adobe.svg",
        link: "https://uiuxsemarang.org",
      },
    ],
    partnerCompanies: [
      {
        id: "pc-001",
        title: "Tokoh Design Studio",
        image: "https://www.svgrepo.com/show/452202/figma.svg",
        link: "https://tokohstudio.com",
      },
    ],
  },
  {
    id: "235ccbd6-07d9-445b-9236-078d5d2903b2",
    title: "Web Development",
    description:
      "Ever wondered how web applications are built? Everything seems complex until you learn the basics. μLearn Foundation's Web Development Interest Group is designed to help you develop and refine your skills, bringing together people eager to explore emerging web technologies.",
    bannerImage:
      "https://images.unsplash.com/photo-1555949963-1f3bd3a856de?q=80&w=3540&auto=format&fit=crop",
    memberCount: 48200,
    memberSince: "March 2021",
    isPublic: true,
    officeHours: "Wednesday 9:00 PM @ Discord Lobby",
    thinkTankMeeting: "Friday 7:00 PM @ Google Meet",
    interestGroupLeads: {
      description:
        "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved.",
      leads: [
        {
          name: "JanuKrishna A S",
          institution: "Marian Engineering College",
          linkedin: "https://www.linkedin.com/in/janukrishna-a-s-4ba8301b2",
          imageUrl: "/assets/IG/Web Development/IG Leads/Janukrishna AS.jpg",
        },
        {
          name: "Maanas M S",
          institution: "Marian Engineering College",
          linkedin: "https://www.linkedin.com/in/maanasms/",
          imageUrl: "/assets/IG/Web Development/IG Leads/Maanas MS.jpg",
        },
      ],
    },
    prerequisites: [
      "Basic Computer Skills",
      "Basic Knowledge of the Internet",
      "HTML (HyperText Markup Language)",
      "CSS (Cascading Style Sheets)",
      "Basic JavaScript",
      "Version Control (Git)",
      "Browser Developer Tools",
      "Responsive Web Design",
      "Basic Graphic Design Principles",
      "Basic Knowledge of Web Hosting and Deployment",
      "Basic Knowledge of Web Accessibility",
    ],
    peopleToFollow: [
      { name: "Alex Sexton", link: "https://alexsexton.com/" },
      { name: "Tim Holman", link: "https://tholman.com/" },
    ],
    blogsToFollow: [
      { name: "A List Apart", link: "https://alistapart.com/" },
      { name: "Codrops", link: "https://tympanus.net/codrops/" },
      { name: "CSS Author", link: "https://cssauthor.com/" },
      { name: "Six Revisions", link: "https://x.com/sixrevisions" },
      { name: "100DaysOfCode", link: "https://www.100daysofcode.io/" },
      { name: "Freecodecamp", link: "https://www.freecodecamp.org/" },
    ],
    topKeywords: [
      "Agile",
      "Algorithm",
      "API",
      "Data Structure",
      "Deployment",
      "Domain Name",
      "MVP",
      "SSL",
      "Front-end",
      "Backend",
      "Full Stack",
      "Responsive Design",
    ],
    tabs: {
      about: {
        foundationDeck: "https://mulearnfoundation.notion.site/11e59e69b1bf80f1ad1ec76b48146da9?pvs=25",
        description:
          "Join the Web Development Interest Group to master the art of building responsive, scalable, and performant websites. From front-end to back-end, we’ve got you covered!",
        opportunities: [
          {
            title: "Full Stack Web Developer",
            description:
              "Work on both front-end and back-end, managing the entire application.",
          },
          {
            title: "Database Administrator",
            description:
              "Manage data storage, security, and organization for web applications.",
          },
          {
            title: "Frontend Developer",
            description:
              "Specialize in the visual and interactive parts of the site.",
          },
          {
            title: "Web Designer",
            description:
              "Focus on layout, color schemes, and aesthetics to enhance user experience.",
          },
          {
            title: "Backend Developer",
            description:
              "Handle server-side programming, managing application logic and databases.",
          },
        ],
      },
      forum: { placeholder: "Discuss web dev trends here." },
      members: [
        {
          id: 11,
          name: "Liam Carter",
          muid: "liam890",
          profile_pic:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&q=80",
          karma: "1500",
          interest_groups: [
            { id: "25fdd535-08d2-4619-9da7-944e21365de9", name: "Web Development Interest Group" },
          ],
          organizations: [
            { id: "org-12", title: "Tech University", code: "TU01", org_type: "College" },
          ],
        },
        {
          id: 12,
          name: "Sophia Nguyen",
          muid: "sophia234",
          profile_pic:
            "https://images.unsplash.com/photo-1517841902196-6df2113b4251?w=40&h=40&q=80",
          karma: "1100",
          interest_groups: [
            { id: "25fdd535-08d2-4619-9da7-944e21365de9", name: "Web Development Interest Group" },
          ],
          organizations: [
            { id: "org-13", title: "Code Academy", code: "CA01", org_type: "College" },
          ],
        },
        {
          id: 13,
          name: "Noah Patel",
          muid: "noah567",
          profile_pic:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&q=80",
          karma: "1900",
          interest_groups: [
            { id: "25fdd535-08d2-4619-9da7-944e21365de9", name: "Web Development Interest Group" },
          ],
          organizations: [
            { id: "org-14", title: "Web Institute", code: "WI01", org_type: "College" },
          ],
        },
      ],
      events: [
        {
          id: "evt-006",
          title: "React Summit 2025",
          link: "https://webdevcommunity.com/events/react-summit",
          venue: "Online via Zoom",
          eventType: "Online",
          date: "March 20, 2025",
          time: "13:00 - 16:00 GMT",
          image: "https://images.unsplash.com/photo-1551288049-b51d5a7480e7?q=80&w=800",
        },
        {
          id: "evt-007",
          title: "Node.js Bootcamp",
          link: "https://webdevcommunity.com/events/nodejs-bootcamp",
          venue: "Bandung Tech Hub",
          eventType: "Offline",
          date: "April 25, 2025",
          time: "10:00 - 14:00 WIB",
          image: "/assets/interestgroup_assets/Top100Desigers2.png",
        },
      ],
      learningPaths: [
        {
          id: "lp-002",
          title: "Full-Stack Web Development",
          description: "Learn to build full-stack apps with MERN.",
          link: "/learning-paths/full-stack",
        },
      ],
      thinkTank: [
        {
          id: "tt-002",
          name: "Ethan Brooks",
          role: "Lead Developer, Vercel",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&q=80",
          expertise: ["React", "Next.js"],
        },
      ],
      mentors: [
        {
          id: "m-002",
          name: "Amal CP",
          role: "Associate Software Developer @ SOTI",
          linkedin: "https://www.linkedin.com/in/amal-c-p/",
          image: "/assets/IG/Web Development/Mentors/Amal C P.jpg",
          expertise: [], // Assuming no expertise listed; add if available
        },
        {
          id: "m-003",
          name: "Bijo Mathew",
          role: "React Native Developer @ Superapps",
          linkedin: "https://www.linkedin.com/in/bijomathewjose/",
          image: "/assets/IG/Web Development/Mentors/Bijo.jpg",
          expertise: [],
        },
        {
          id: "m-004",
          name: "Arjun MS",
          role: "Backend Developer @ Gtech µLearn",
          linkedin: "https://www.linkedin.com/in/the-arjun-ms/",
          image: "/assets/IG/Web Development/Mentors/Arjun M S.jpg",
          expertise: [],
        },
        {
          id: "m-005",
          name: "Aswin Asok",
          role: "Co-Founder, MakeMyPass",
          linkedin: "https://www.linkedin.com/in/-aswinasok/",
          image: "/assets/IG/Web Development/Mentors/Aswin Asok.jpg",
          expertise: [],
        },
      ],
    },
    communityPartners: [
      { id: "cp-002-1", title: "Pygrammers", image: "/assets/IG/Web Development/Community Partners/Pygrammers.png", link: "#" },
      { id: "cp-002-2", title: "Engagesport", image: "/assets/IG/Web Development/Community Partners/Engagespot.jpg", link: "#" },
      { id: "cp-002-3", title: "Reflections", image: "/assets/IG/Web Development/Community Partners/Reflections.jpg", link: "#" },
      { id: "cp-002-4", title: "Faya", image: "/assets/IG/Web Development/Community Partners/Faya.jpg", link: "#" },
      { id: "cp-002-5", title: "OpenFintech", image: "/assets/IG/Web Development/Community Partners/Open Fin Tech.jpg", link: "#" },
      { id: "cp-002-6", title: "GitHub", image: "/assets/IG/Web Development/Community Partners/Github.png", link: "https://github.com" },
      { id: "cp-002-7", title: "Elixir Labs", image: "/assets/IG/Web Development/Community Partners/Elixir Labs.png", link: "#" },
      { id: "cp-002-8", title: "Open Grad", image: "/assets/IG/Web Development/Community Partners/Open Grad.png", link: "#" },
      { id: "cp-002-9", title: "Softnotions", image: "/assets/IG/Web Development/Community Partners/Softnotions.png", link: "#" },
      { id: "cp-002-10", title: "Hamon Solutions", image: "/assets/IG/Web Development/Community Partners/Hamon.jpeg", link: "#" },
      { id: "cp-002-11", title: "Alokin", image: "/assets/IG/Web Development/Community Partners/Alokin.jpg", link: "#" },
    ],
    partnerCompanies: [
      {
        id: "pc-002",
        title: "NextJS Studio",
        image: "https://www.svgrepo.com/show/354113/nextjs-icon.svg",
        link: "https://nextjsstudio.com",
      },
    ],
  },

  // Cyber Security Interest Group
  {
    id: "35fdd535-08d2-4619-9da7-944e21365de9",
    title: "Cybersecurity",
    description:
      "Curious about protecting the digital world? The Cybersecurity Interest Group by GTech μLearn delves into securing data and networks from potential threats. This group provides essential knowledge on staying safe online, ideal for those passionate about keeping cyberspace secure.",
    bannerImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=3540&auto=format&fit=crop",
    memberCount: 32000,
    memberSince: "September 2020",
    isPublic: true,
    officeHours: "Monday 7:30 PM @ Discord Lobby",
    thinkTankMeeting: "First Wednesday 7:00 PM @ Google Meet",
    interestGroupLeads: {
      description:
        "Cybersecurity Interest Group Leads oversee the activities and events within the cybersecurity community and act as the main point of contact for students eager to get involved. Students can reach out to these leads to explore opportunities in areas like ethical hacking, network defense, and security research, and stay informed about upcoming cybersecurity initiatives and events.",
      leads: [
        {
          name: "Dany Koshy P",
          institution: "College of Engineering Pathanapuram",
          linkedin: "https://www.linkedin.com/in/dany-koshy-p-a79328232/",
          imageUrl: "/assets/IG/Cyber Security/IG lead/Dany Koshy.jpg",
        },
        {
          name: "Aswin Krishna",
          institution: "Security Engineer @ KMart",
          linkedin: "https://www.linkedin.com/in/aswinkrishna07",
          imageUrl: "/assets/IG/Cyber Security/IG lead/Aswin Krishna.jpg",
        },
        {
          name: "Geo Mathew Joseph",
          institution: "Marian Engineering College",
          linkedin: "https://www.linkedin.com/in/geomathewjoseph",
          imageUrl: "/assets/IG/Cyber Security/IG lead/Geo Mathew.jpg",
        },
      ],
    },
    prerequisites: [
      "Cybersecurity requires a basic understanding of computer systems.",
      "Knowledge of operating systems, especially Linux and Windows, is crucial.",
      "Understanding networking concepts like IP addresses and protocols is essential.",
      "Familiarity with programming languages such as Python and Bash is beneficial.",
      "Web technologies like HTML and JavaScript are helpful in cybersecurity.",
      "Key concepts include encryption, authentication, and common threats like malware and phishing.",
      "Hands-on experience with tools like Wireshark, Nmap, and vulnerability scanners is essential.",
      "Problem-solving skills are critical for addressing cyber challenges.",
      "A continuous learning mindset is necessary to keep up with evolving cyber threats.",
    ],
    peopleToFollow: [
      { name: "Bruce Schneier", link: "https://www.schneier.com/" },
      { name: "Troy Hunt", link: "https://www.linkedin.com/in/troyhunt" },
      { name: "Brian Krebs", link: "https://www.linkedin.com/in/bkrebs" },
      { name: "InfoSec", link: "https://www.linkedin.com/company/infosec-institute/" },
      { name: "Cybersecurity Dive", link: "https://www.linkedin.com/showcase/cybersecuritydive/" },
    ],
    blogsToFollow: [
      { name: "Krebs on Security", link: "https://krebsonsecurity.com/" },
      { name: "Dark Reading", link: "https://www.darkreading.com/" },
      { name: "Threatpost", link: "https://threatpost.com/" },
    ],
    topKeywords: [
      "Encryption",
      "Firewall",
      "Penetration Testing",
      "Malware",
      "Phishing",
      "Intrusion Detection",
      "Ransomware",
      "Zero-Day",
      "Social Engineering",
      "DDoS",
    ],
    tabs: {
      about: {
        foundationDeck: "https://www.notion.so/Cybersecurity-11e59e69b1bf804c8fe3fd2acbca4258?pvs=4",
        description:
          "The Cyber Security Interest Group is your go-to place for learning about cybersecurity best practices, ethical hacking, and staying ahead of digital threats. Explore our resources at: <a href='https://mulearnfoundation.notion.site/11e59e69b1bf804c8fe3fd2acbca4258?pvs=25' target='_blank' rel='noopener noreferrer'>Download Link</a>",
        opportunities: [
          {
            title: "Cybersecurity Analyst",
            description:
              "Monitor networks for security breaches and prevent cyber threats.",
          },
          {
            title: "Ethical Hacker",
            description:
              "Test systems by attempting to break security to strengthen defenses.",
          },
          {
            title: "Information Security Manager",
            description: "Oversee and ensure the security of an organization's data.",
          },
          {
            title: "Security Software Developer",
            description:
              "Create software solutions specifically for enhancing security.",
          },
          {
            title: "Forensic Computer Analyst",
            description:
              "Investigate cybercrimes by analyzing evidence and gathering data.",
          },
        ],
      },
      forum: { placeholder: "Share cybersecurity tips here." },
      members: [
        {
          id: 14,
          name: "Mason Kim",
          muid: "mason890",
          profile_pic:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&q=80",
          karma: "1300",
          interest_groups: [
            { id: "35fdd535-08d2-4619-9da7-944e21365de9", name: "Cybersecurity Interest Group" },
          ],
          organizations: [
            { id: "org-15", title: "Security Academy", code: "SA01", org_type: "College" },
          ],
        },
        {
          id: 15,
          name: "Ava Lopez",
          muid: "ava345",
          profile_pic:
            "https://images.unsplash.com/photo-1517841902196-6df2113b4251?w=40&h=40&q=80",
          karma: "900",
          interest_groups: [
            { id: "35fdd535-08d2-4619-9da7-944e21365de9", name: "Cybersecurity Interest Group" },
          ],
          organizations: [
            { id: "org-16", title: "Cyber College", code: "CC01", org_type: "College" },
          ],
        },
      ],
      events: [
        {
          id: "evt-008",
          title: "Ethical Hacking Workshop",
          link: "https://cyberseccommunity.com/events/hacking-workshop",
          venue: "Online via Zoom",
          eventType: "Online",
          date: "March 25, 2025",
          time: "14:00 - 16:00 GMT",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800",
        },
      ],
      learningPaths: [
        {
          id: "lp-003",
          title: "Cybersecurity Basics",
          description: "Learn the fundamentals of securing systems.",
          link: "/learning-paths/cybersecurity",
        },
      ],
      thinkTank: [
        {
          id: "tt-003",
          name: "Lucas Reed",
          role: "Cybersecurity Expert, Cisco",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&q=80",
          expertise: ["Penetration Testing", "Network Security"],
        },
      ],
      mentors: [
        {
          id: "m-003",
          name: "Rejah Rehim",
          role: "CEO and Co-founder, Beagle Security",
          linkedin: "https://www.linkedin.com/in/rejah",
          image: "/assets/IG/Cyber Security/Mentors/Rejah Rehim.jpg",
          expertise: [], // Add if available
        },
        {
          id: "m-004",
          name: "Maninder Mohan",
          role: "Cyber Security Specialist",
          linkedin: "https://www.linkedin.com/in/manindar-m",
          image: "/assets/IG/Cyber Security/Mentors/Maninder Mohan.jpg",
          expertise: [],
        },
        {
          id: "m-005",
          name: "Vishnu Vijayan V S",
          role: "Chief Information Security Officer",
          linkedin: "https://www.linkedin.com/in/vishnu-vijayan-vs",
          image: "/assets/IG/Cyber Security/Mentors/Vishnu Vijayan V S.jpg",
          expertise: [],
        },
      ],
    },
    communityPartners: [
      {
        id: "cp-003-1",
        title: "Beagle Security",
        image: "/assets/IG/Cyber Security/Community Partners/Beagle Security.jpg",
        link: "#", // Replace with actual link if available
      },
      {
        id: "cp-003-2",
        title: "Zilicon Technologies",
        image: "/assets/IG/Cyber Security/Community Partners/Zilicon technologies.png",
        link: "#", // Replace with actual link if available
      },
    ],
    partnerCompanies: [
      {
        id: "pc-003",
        title: "SecureTech",
        image: "https://www.svgrepo.com/show/452092/shield.svg",
        link: "https://securetech.com",
      },
    ],
  },


  // Game Development Interest Group
  {
    id: "45fdd535-08d2-4619-9da7-944e21365de9",
    title: "Game Development",
    description:
      "Passionate about creating immersive experiences in gaming? The Game Development Interest Group is your gateway to learning about designing, programming, and storytelling in the world of games. Whether you're into creating captivating visuals, coding mechanics, or crafting narratives, join us to level up your game development skills.",
    bannerImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=3540&auto=format&fit=crop",
    memberCount: 27500,
    memberSince: "January 2022",
    isPublic: true,
    officeHours: "Friday 8:30 @ Discord Lobby",
    thinkTankMeeting: "2nd Saturday 8:30 PM @ Google Meet",
    interestGroupLeads: {
      description:
        "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities within their interests",
      leads: [
        {
          name: "Sabal Krishna S",
          institution: "St.Thomas Institute for Science and Technology, Trivandrum",
          linkedin: "https://www.linkedin.com/in/sabal-krishna-s-29b758298/",
          imageUrl: "/assets/IG/Game Development/IG Lead/image.jpg",
        },
      ],
    },
    prerequisites: [
      "Basic computer skills, such as installing software and managing files or folders.",
      "Familiarity with programming concepts, including variables, loops, and functions.",
      "Knowledge of C++ is a plus but not mandatory.",
      "Basic understanding of 3D math, such as vectors and transformations, for working with 3D objects.",
      "Awareness of fundamental game design principles, including level layout and gameplay mechanics.",
    ],
    peopleToFollow: [
      { name: "Hideo Kojima", link: "https://twitter.com/HIDEO_KOJIMA_EN" },
      { name: "John Carmack", link: "https://x.com/ID_AA_Carmack" },
      { name: "Rami Ismail", link: "https://x.com/tha_rami" },
      { name: "Cory Barlog", link: "https://x.com/corybarlog" },
    ],
    blogsToFollow: [
      {
        name: "Next Level Plugins",
        link: "https://nextlevelplugins.com/blog//2024/11/Level-Up-Your-Unreal-Engine-Game-Essential-Blogs-for-Developers.html",
      },
      {
        name: "Game Developer",
        link: "https://www.gamedeveloper.com/design/the-art-of-game-balance-evolution",
      },
      {
        name: "Game Dev Candids",
        link: "https://gamedevcandids.com/how-to-find-your-games-north-star/",
      },
    ],
    topKeywords: [
      "Game Engines",
      "Level Design",
      "Scripting",
      "3D Modeling",
      "AI for Games",
      "Game Physics",
      "UI/UX for Games",
      "Multiplayer Systems",
    ],
    tabs: {
      about: {
        foundationDeck: "https://www.notion.so/Game-Development-11e59e69b1bf8002aaa0e99daf76a94f?pvs=4",
        description:
          "The Game Development Interest Group unites creators passionate about designing immersive gaming experiences using cutting-edge tools and techniques. Explore our resources at: <a href='https://mulearnfoundation.notion.site/11e59e69b1bf8002aaa0e99daf76a94f?pvs=25' target='_blank' rel='noopener noreferrer'>Download Link</a>",
        opportunities: [
          {
            title: "Game Designer",
            description:
              "Shape the rules, mechanics, and storytelling for engaging gameplay.",
          },
          {
            title: "Game Programmer",
            description: "Code and optimize game mechanics, physics, and AI.",
          },
          {
            title: "3D Artist",
            description: "Design characters, environments, and props.",
          },
          {
            title: "Animator",
            description:
              "Create realistic or stylized movements for characters and objects.",
          },
          {
            title: "Level Designer",
            description: "Build engaging and balanced game levels.",
          },
          {
            title: "Sound Designer",
            description: "Develop immersive sound effects and music.",
          },
          {
            title: "UI/UX Designer",
            description:
              "Design user-friendly interfaces and enhance player experience.",
          },
          {
            title: "Quality Assurance Tester",
            description:
              "Ensure the game runs smoothly by identifying and reporting bugs.",
          },
          {
            title: "Narrative Designer",
            description: "Develop compelling stories, dialogues, and in-game lore.",
          },
        ],
      },
      forum: { placeholder: "Talk about game dev here." },
      members: [
        {
          id: 16,
          name: "Zoe Turner",
          muid: "zoe123",
          profile_pic:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80",
          karma: "1600",
          interest_groups: [
            { id: "45fdd535-08d2-4619-9da7-944e21365de9", name: "Game Development Interest Group" },
          ],
          organizations: [
            { id: "org-17", title: "Game College", code: "GC01", org_type: "College" },
          ],
        },
      ],
      events: [
        {
          id: "evt-009",
          title: "Unity Game Jam 2025",
          link: "https://gamedevcommunity.com/events/game-jam",
          venue: "Online via Discord",
          eventType: "Online",
          date: "April 15, 2025",
          time: "12:00 - 18:00 GMT",
          image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800",
        },
      ],
      learningPaths: [
        {
          id: "lp-004",
          title: "Game Dev with Unity",
          description: "Build your first game with Unity.",
          link: "/learning-paths/unity",
        },
        {
          id: "lp-005",
          title: "Unreal Engine 5 Game Developer",
          description: "Learn Unreal Engine 5 with this roadmap.",
          link: "https://roadmap.sh/r/unreal-engine-5-game-developer-19rqf",
        },
      ],
      thinkTank: [
        {
          id: "tt-004",
          name: "James Carter",
          role: "Lead Game Designer, Epic Games",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&q=80",
          expertise: ["Game Design", "Unreal Engine"],
        },
      ],
      mentors: [
        {
          id: "m-004",
          name: "Nikhil Chandran",
          role: "Founder & CEO @ TILTLABS",
          linkedin: "https://www.linkedin.com/in/nikhil-tiltlabs/",
          image: "/assets/IG/Game Development/Mentors/Nikhil Chandran.png",
          expertise: [], // Add if available
        },
        {
          id: "m-005",
          name: "Mukesh Dev",
          role: "Founder & CEO-Banzan Studios",
          linkedin: "https://www.linkedin.com/in/mukeshdev/",
          image: "/assets/IG/Game Development/Mentors/Mukesh Dev.png",
          expertise: [],
        },
        {
          id: "m-006",
          name: "Jobin Joseph",
          role: "Co-founder and CFO @ Norian Games",
          linkedin: "https://www.linkedin.com/in/jobin-joseph-8b0aa4265/",
          image: "/assets/IG/Game Development/Mentors/Jobin.png",
          expertise: [],
        },
      ],
    },
    communityPartners: [
      {
        id: "cp-004-1",
        title: "TILTLABS",
        image: "/assets/IG/Game Development/Community Partners/Tiltlabs.png",
        link: "#", // Replace with actual link if available
      },
      {
        id: "cp-004-2",
        title: "Banzan Studios",
        image: "/assets/IG/Game Development/Community Partners/Banzan.jpg",
        link: "#",
      },
      {
        id: "cp-004-3",
        title: "Norian Games",
        image: "/assets/IG/Game Development/Community Partners/Norian.png",
        link: "#",
      },
      {
        id: "cp-004-4",
        title: "AKEF",
        image: "/assets/IG/Game Development/Community Partners/AKEF.png",
        link: "#",
      },
      {
        id: "cp-004-5",
        title: "AnimationXpress",
        image: "/assets/IG/Game Development/Community Partners/AnimationXpress.jpeg",
        link: "#",
      },
    ],
    partnerCompanies: [
      {
        id: "pc-004",
        title: "Pixel Studio",
        image: "https://www.svgrepo.com/show/452230/unreal-engine.svg",
        link: "https://pixelstudio.com",
      },
    ],
  },

  {
    id: "55fdd535-08d2-4619-9da7-944e21365de9",
    title: "Internet Of Things",
    description:
      "Imagine a world where devices communicate seamlessly, revolutionizing industries and everyday life. The Internet of Things (IoT) bridges the physical and digital realms, enabling innovations in smart homes, healthcare, manufacturing, and more. The IoT Interest Group is your gateway to exploring this transformative technology, mastering its tools, and collaborating with like-minded innovators.",
    bannerImage:
      "https://images.unsplash.com/photo-1568952433726-389014c78d5b?q=80&w=3540&auto=format&fit=crop",
    memberCount: 19800,
    memberSince: "May 2021",
    isPublic: true,
    officeHours: "Sunday 7:30 PM @Discord Lobby",
    thinkTankMeeting: "1st Saturday 7:00 PM @Google Meet",
    interestGroupLeads: {
      description:
        "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities within their interests",
      leads: [
        {
          name: "Vaishnav RS",
          institution: "Marian Engineering College",
          linkedin: "http://linkedin.com/in/vaishnav-rs-9079a8164/",
          imageUrl: "/assets/IG/IoT/Leads/vaishnav.jpg",
        },
        {
          name: "Akhilesh A S",
          institution: "Trinity College of Engineering",
          linkedin: "https://www.linkedin.com/in/akhilesh-a-s-90abbb293/",
          imageUrl: "/assets/IG/IoT/Leads/Akhilesh.jpg",
        },
      ],
    },
    prerequisites: [
      "Master the Basics: Understand sensors, actuators, microcontrollers (like Arduino and Raspberry Pi), and power systems.",
      "Learn basic circuit design and component interfacing.",
      "Programming Skills: Learn C/C++ for microcontroller programming.",
      "Explore Python for data analysis and IoT scripting.",
      "Understand IoT Protocols: Explore protocols like MQTT, HTTP, CoAP, and LoRaWAN.",
      "Familiarize yourself with cloud platforms such as AWS IoT Core and Google IoT Cloud.",
      "Build Mini Projects: Start small, for example, create a smart home temperature monitor using an ESP8266 module and a DHT11 sensor.",
      "Marketing and Presentation Skills (optional but valuable): Learn to communicate your IoT solutions effectively to diverse audiences.",
    ],
    peopleToFollow: [
      {
        name: "Dr. Mazlan Abbas",
        link: "https://www.linkedin.com/in/mazlan?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BZANm3syKSpWPzCEkBX32bA%3D%3D",
      },
      {
        name: "Stacey Higginbotham",
        link: "https://www.linkedin.com/in/staceyhigginbotham",
      },
      {
        name: "Daniel Elizalde",
        link: "https://www.linkedin.com/in/danielelizalde?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B%2FGvF8xq3RQqhVm9QniGKUQ%3D%3D",
      },
      {
        name: "Borja Gómez Zarceño",
        link: "https://www.linkedin.com/in/borja-g%C3%B3mez-zarce%C3%B1o-7574674b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bcju9Hl%2BWSquCf2s1tahdlw%3D%3D",
      },
    ],
    blogsToFollow: [
      { name: "IoT for All", link: "https://www.iotforall.com/" },
      { name: "Hackster.io", link: "https://www.hackster.io/" },
      { name: "Arduino Blog", link: "https://blog.arduino.cc/" },
    ],
    topKeywords: [
      "IoT",
      "Internet of Things",
      "sensors",
      "MQTT",
      "Arduino",
      "Raspberry Pi",
      "LoRaWAN",
      "cloud computing",
      "smart devices",
      "IoT security",
      "edge computing",
      "IoT trends in 2024",
    ],
    tabs: {
      about: {
        foundationDeck: "https://www.notion.so/IoT-11e59e69b1bf804cb2f0ddce810b0ada?pvs=4",
        description:
          "The IoT Interest Group connects enthusiasts and professionals working on smart devices, sensors, and connected systems. Explore our resources at: <a href='https://mulearnfoundation.notion.site/11e59e69b1bf804cb2f0ddce810b0ada?pvs=25' target='_blank' rel='noopener noreferrer'>Download Link</a>",
        opportunities: [
          {
            title: "IoT Developer",
            description: "Create and deploy IoT applications.",
          },
          {
            title: "Embedded Systems Engineer",
            description: "Design hardware and firmware for IoT devices.",
          },
          {
            title: "IoT Data Analyst",
            description: "Analyze data from connected devices to extract insights.",
          },
          {
            title: "IoT Architect",
            description: "Plan and design scalable IoT infrastructures.",
          },
          {
            title: "Cloud Integration Specialist",
            description: "Connect IoT devices to cloud systems.",
          },
        ],
      },
      forum: { placeholder: "Discuss IoT projects here." },
      members: [
        {
          id: 17,
          name: "Lucas Bennett",
          muid: "lucas456",
          profile_pic:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&q=80",
          karma: "1400",
          interest_groups: [
            { id: "55fdd535-08d2-4619-9da7-944e21365de9", name: "Internet of Things Interest Group" },
          ],
          organizations: [
            { id: "org-18", title: "IoT Academy", code: "IA01", org_type: "College" },
          ],
        },
      ],
      events: [
        {
          id: "evt-010",
          title: "IoT Hackathon 2025",
          link: "https://iotcommunity.com/events/hackathon",
          venue: "Surabaya Tech Center",
          eventType: "Offline",
          date: "May 10, 2025",
          time: "09:00 - 17:00 WIB",
          image: "https://images.unsplash.com/photo-1568952433726-389014c78d5b?q=80&w=800",
        },
      ],
      learningPaths: [
        {
          id: "lp-005",
          title: "IoT Basics with Arduino",
          description: "Start building IoT devices.",
          link: "/learning-paths/iot-arduino",
        },
      ],
      thinkTank: [
        {
          id: "tt-005",
          name: "Aiden Clark",
          role: "IoT Architect, Intel",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&q=80",
          expertise: ["Embedded Systems", "IoT Security"],
        },
      ],
      mentors: [
        {
          id: "m-005",
          name: "Nizamudeen Yooncekutty",
          role: "Software Developer @ UST",
          linkedin: "https://www.linkedin.com/in/nizamudeen-yooncekutty-406181339/",
          image: "/assets/IG/IoT/Mentors/Nizamudeen.jpg",
          expertise: [], // Add if available
        },
        {
          id: "m-006",
          name: "Rajeevan A B",
          role: "Embedded System Developer @ Elsys Intelligent Devices",
          linkedin: "https://www.linkedin.com/in/rajeevan-a-b-4a2196181/",
          image: "/assets/IG/IoT/Mentors/Rajeevan.jpg",
          expertise: [],
        },
      ],
    },
    communityPartners: [
      {
        id: "cp-005",
        title: "IoT Indonesia",
        image: "https://www.svgrepo.com/show/452143/arduino.svg",
        link: "https://iotindo.org",
      },
    ],
    partnerCompanies: [
      {
        id: "pc-005",
        title: "SmartTech IoT",
        image: "https://www.svgrepo.com/show/452144/raspberry-pi.svg",
        link: "https://smarttech-iot.com",
      },
    ],
  },

  // Human Resources Interest Group
  {
    id: "65fdd535-08d2-4619-9da7-944e21365de9",
    title: "HR",
    description:
      "Curious about what makes great organizations thrive? The Human Resources Interest Group is your ultimate platform to uncover the secrets of people management, leadership development, and organizational success. Discover how HR shapes careers, drives innovation, and builds strong workplace cultures. Whether you're aspiring to lead teams, influence business decisions, or create impactful employee experiences, this is your chance to dive into the world of HR and unlock limitless career potential. Join us and start building a future where you make a difference.",
    bannerImage:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=3540&auto=format&fit=crop",
    memberCount: 15400,
    memberSince: "August 2020",
    isPublic: true,
    officeHours: "Wednesday 8:00PM",
    thinkTankMeeting: "3rd Wednesday 8:30PM",
    interestGroupLeads: {
      description:
        "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities within their interests.",
      leads: [
        {
          name: "Hithesh G",
          institution: "University College of Engineering, Kariavattom",
          linkedin: "https://www.linkedin.com/in/hithesh-g",
          imageUrl: "/assets/IG/HR/IG Lead/Hithesh G.jpg",
        },
      ],
    },
    prerequisites: [
      "No prior experience is necessary, though a basic understanding of management principles, communication skills, and organizational behavior is recommended.",
      "Familiarity with HR functions like talent acquisition, performance management, and employee relations is a plus.",
    ],
    peopleToFollow: [
      {
        name: "Dave Ulrich",
        link: "https://www.linkedin.com/in/daveulrichpro?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
      {
        name: "Brigette Hyacinth",
        link: "https://www.linkedin.com/in/brigettehyacinth?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
      {
        name: "Josh Bersin",
        link: "https://www.linkedin.com/in/bersin?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    ],
    blogsToFollow: [
      { name: "SHRM Blog", link: "https://www.shrm.org/blog" },
      { name: "HR Bartender", link: "https://www.hrbartender.com/day-job/" },
    ],
    topKeywords: [
      "Talent Acquisition",
      "Employee Engagement",
      "Learning & Development",
      "Performance Management",
      "Compensation & Benefits",
      "Workplace Culture",
      "Diversity & Inclusion",
      "Employee Relations",
      "HR Technology",
      "Organizational Development",
    ],
    tabs: {
      about: {
        foundationDeck: "https://www.notion.so/HR-11e59e69b1bf80dcb994c2ba100c04d5?pvs=4",
        description:
          "The Human Resources Interest Group supports HR enthusiasts in mastering modern HR practices and fostering positive workplace cultures. Explore our resources at: <a href='https://mulearnfoundation.notion.site/11e59e69b1bf80dcb994c2ba100c04d5?pvs=25' target='_blank' rel='noopener noreferrer'>Download Link</a>",
        opportunities: [
          {
            title: "Talent Acquisition Specialist",
            description: "Recruit and onboard top talent.",
          },
          {
            title: "Learning and Development Specialist",
            description:
              "Design and deliver training programs to enhance employee skills and career growth.",
          },
          {
            title: "Compensation and Benefits Analyst",
            description:
              "Develop competitive salary structures and benefits packages.",
          },
          {
            title: "Employee Engagement Manager",
            description:
              "Foster a positive workplace culture and improve employee satisfaction.",
          },
          {
            title: "HR Data Analyst",
            description:
              "Use data-driven insights to improve workforce planning and decision-making.",
          },
          {
            title: "Performance Management Specialist",
            description:
              "Develop systems to evaluate and enhance employee performance.",
          },
          {
            title: "HR Business Partner",
            description:
              "Align HR strategies with organizational goals to drive business success.",
          },
          {
            title: "Organizational Development Consultant",
            description:
              "Implement strategies to improve company efficiency and employee well-being.",
          },
        ],
      },
      forum: { placeholder: "Share HR insights here." },
      members: [
        {
          id: 18,
          name: "Isabella Moore",
          muid: "isabella789",
          profile_pic:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80",
          karma: "1200",
          interest_groups: [
            { id: "65fdd535-08d2-4619-9da7-944e21365de9", name: "Human Resources Interest Group" },
          ],
          organizations: [
            { id: "org-19", title: "HR Academy", code: "HRA01", org_type: "College" },
          ],
        },
      ],
      events: [
        {
          id: "evt-011",
          title: "HR Trends 2025 Summit",
          link: "https://hrcommunity.com/events/hr-trends",
          venue: "Online via Zoom",
          eventType: "Online",
          date: "June 15, 2025",
          time: "10:00 - 13:00 GMT",
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800",
        },
      ],
      learningPaths: [
        {
          id: "lp-006",
          title: "HR Management Essentials",
          description: "Learn core HR skills.",
          link: "/learning-paths/hr-management",
        },
      ],
      thinkTank: [
        {
          id: "tt-006",
          name: "Oliver Grant",
          role: "HR Director, LinkedIn",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&q=80",
          expertise: ["Talent Management", "Employee Engagement"],
        },
      ],
      mentors: [
        {
          id: "m-006",
          name: "Deepa Nair",
          role: "Senior Manager Human Resource @6D Technologies",
          linkedin:
            "https://www.linkedin.com/in/deepa-nair-b43b4646?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          image: "/assets/IG/HR/Mentors/Deepa Nair.jpg",
          expertise: [], // Add if available
        },
        {
          id: "m-007",
          name: "Jithin Chakkalakkal",
          role: "Senior Manager Human Resource @Reflections Info Systems",
          linkedin:
            "https://www.linkedin.com/in/jithinchakkalakkal?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          image: "/assets/IG/HR/Mentors/Jithin Chakkalakkal.jpg",
          expertise: [],
        },
        {
          id: "m-008",
          name: "Vijin VR",
          role: "Assistant Manager - People & Culture @Rebid",
          linkedin:
            "https://www.linkedin.com/in/vijin-v-r-22bb5b161?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          image: "/assets/IG/HR/Mentors/Vijin VR.jpg",
          expertise: [],
        },
        {
          id: "m-009",
          name: "Judlin Berna NM",
          role: "Human Resources Generalist @FAYA",
          linkedin:
            "https://www.linkedin.com/in/judlinbernanm?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          image: "/assets/IG/HR/Mentors/Judlin Berna.jpg",
          expertise: [],
        },
        {
          id: "m-010",
          name: "Bijo Abraham",
          role: "Talent Acquisition & Career Life Coach @SELECT HR Solutions",
          linkedin:
            "https://www.linkedin.com/in/bijo-abraham-a719a554?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          image: "/assets/IG/HR/Mentors/bijo.jpg",
          expertise: [],
        },
      ],
    },
    communityPartners: [
      {
        id: "cp-006",
        title: "HR Network Indonesia",
        image: "https://www.svgrepo.com/show/452145/linkedin.svg",
        link: "https://hrnetworkindo.org",
      },
    ],
    partnerCompanies: [
      {
        id: "pc-006",
        title: "PeopleFirst HR",
        image: "https://www.svgrepo.com/show/452146/hr.svg",
        link: "https://peoplefirsthr.com",
      },
    ],
  },


  // Digital Marketing Interest Group
  {
    id: "75fdd535-08d2-4619-9da7-944e21365de9",
    title: "Digital Marketing",
    description:
      "Excited to explore the dynamic world of digital marketing? The Digital Marketing Interest Group empowers you with practical and theoretical knowledge, covering SEO, email marketing, social media management, and analytics. This group is perfect for anyone passionate about creating impactful campaigns and analyzing audience behaviour.",
    bannerImage:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=3540&auto=format&fit=crop",
    memberCount: 23700,
    memberSince: "November 2021",
    isPublic: true,
    officeHours: "Tuesday 8:30PM",
    thinkTankMeeting: "4th Saturday 7:30PM",
    interestGroupLeads: {
      description:
        "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities within their interests",
      leads: [
        {
          name: "Marvin V Mathew",
          institution: "St. Thomas Institute of Science and Technology",
          linkedin: "https://www.linkedin.com/in/marvin-v-mathew",
          imageUrl: "/assets/IG/Digital Marketing/IG Lead/Marvin V Mathew.jpg",
        },
        {
          name: "KH Arjun",
          institution: "Marian Engineering College",
          linkedin: "https://www.linkedin.com/in/k-h-arjun-310913206/",
          imageUrl: "/assets/IG/Digital Marketing/IG Lead/KH Arjun.JPG",
        },
        {
          name: "Devadathan D R",
          institution: "St. Thomas Institute of Science and Technology",
          linkedin: "https://www.linkedin.com/in/devadathandr",
          imageUrl: "/assets/IG/Digital Marketing/IG Lead/Devadathan R.jpg",
        },
      ],
    },
    prerequisites: [
      "Familiarity with internet browsing, Google Docs, Sheets, and Presentations.",
      "Basic written communication skills for captions, emails, and blogs.",
      "Understanding hashtags, engagement metrics, and social media platforms.",
      "Experience with design tools like Canva or Microsoft PowerPoint.",
      "Google Account for tools like Google Analytics and Keyword Planner.",
      "Active social media accounts (Instagram, LinkedIn, or YouTube).",
      "Tools like Canva, Mailchimp, HubSpot, CapCut, and Ubersuggest.",
      "Reliable internet and a laptop/PC for tasks like content creation, SEO, and email automation.",
    ],
    peopleToFollow: [
      { name: "Neil Patel", link: "https://www.linkedin.com/in/neilkpatel" },
      { name: "Rand Fishkin", link: "https://www.linkedin.com/in/randfishkin" },
      { name: "Ann Handley", link: "https://www.linkedin.com/in/annhandley" },
    ],
    blogsToFollow: [
      { name: "Moz Blog", link: "https://moz.com/blog" },
      { name: "Neil Patel Blog", link: "https://neilpatel.com/blog/" },
      { name: "HubSpot Blog", link: "https://blog.hubspot.com" },
    ],
    topKeywords: [
      "SEO",
      "Email Marketing",
      "Social Media Management",
      "Content Marketing",
      "Digital Advertising",
      "Analytics",
      "PPC",
      "Influencer Marketing",
      "Conversion Rate Optimization",
      "Audience Engagement",
    ],
    tabs: {
      about: {
        foundationDeck: "https://www.notion.so/Digital-Marketing-11e59e69b1bf801cae94daada4c746db?pvs=4",
        description:
          "The Digital Marketing Interest Group is where marketers come to learn, share, and grow in the fast-paced world of online advertising and branding. Explore our resources at: <a href='https://mulearnfoundation.notion.site/11e59e69b1bf801cae94daada4c746db?pvs=25' target='_blank' rel='noopener noreferrer'>Download Link</a>",
        opportunities: [
          {
            title: "SEO Specialist",
            description:
              "Optimize websites and content to rank higher in search engine results.",
          },
          {
            title: "Email Marketing Specialist",
            description:
              "Design and implement email campaigns to engage and convert audiences.",
          },
          {
            title: "Social Media Manager",
            description:
              "Create and execute social media strategies to build brand presence and engagement.",
          },
          {
            title: "Content Strategist",
            description:
              "Plan and create compelling content to drive engagement and conversions.",
          },
          {
            title: "Digital Advertising Specialist",
            description:
              "Manage digital ad campaigns, analyze metrics, and optimize ad spend for better results.",
          },
          {
            title: "Marketing Analyst",
            description:
              "Analyze data to measure the effectiveness of digital marketing campaigns and optimize strategies.",
          },
          {
            title: "Conversion Rate Optimization Specialist",
            description:
              "Focus on improving the percentage of website visitors who complete desired actions.",
          },
        ],
      },
      forum: { placeholder: "Discuss marketing strategies here." },
      members: [
        {
          id: 19,
          name: "Harper Scott",
          muid: "harper123",
          profile_pic:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80",
          karma: "1350",
          interest_groups: [
            { id: "75fdd535-08d2-4619-9da7-944e21365de9", name: "Digital Marketing Interest Group" },
          ],
          organizations: [
            { id: "org-20", title: "Marketing College", code: "MC01", org_type: "College" },
          ],
        },
      ],
      events: [
        {
          id: "evt-012",
          title: "SEO Mastery Workshop",
          link: "https://digitalmarketingcommunity.com/events/seo-workshop",
          venue: "Online via Zoom",
          eventType: "Online",
          date: "July 20, 2025",
          time: "11:00 - 13:00 GMT",
          image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800",
        },
      ],
      learningPaths: [
        {
          id: "lp-007",
          title: "Digital Marketing Fundamentals",
          description: "Learn SEO and PPC basics.",
          link: "/learning-paths/digital-marketing",
        },
      ],
      thinkTank: [
        {
          id: "tt-007",
          name: "Nathan Brooks",
          role: "Marketing Strategist, HubSpot",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&q=80",
          expertise: ["SEO", "Content Marketing"],
        },
      ],
      mentors: [
        {
          id: "m-007",
          name: "Jijosh A T",
          role: "Managing Partner @ TechHazel Media",
          linkedin: "https://www.linkedin.com/in/jijosh-at-a70b1b77/",
          image: "/assets/IG/Digital Marketing/Mentors/Jijosh At.jpg",
          expertise: [], // Add if available
        },
        {
          id: "m-008",
          name: "Renju R",
          role: "Digital Marketing Direction @ FAYA Corporation",
          linkedin: "https://www.linkedin.com/in/renju-r-407a1a62/",
          image: "/assets/IG/Digital Marketing/Mentors/Renju.jpg",
          expertise: [],
        },
        {
          id: "m-009",
          name: "Deepraj R",
          role: "Senior Growth Marketer Consultant @ UprootSecurity",
          linkedin: "https://www.linkedin.com/in/deeprajr/",
          image: "/assets/IG/Digital Marketing/Mentors/Deepraj R.jpg",
          expertise: [],
        },
      ],
    },
    communityPartners: [
      {
        id: "cp-007-1",
        title: "TechHazel Media",
        image: "/assets/IG/Digital Marketing/Community Partners/TechHazel Media.png",
        link: "#", // Replace with actual link if available
      },
      {
        id: "cp-007-2",
        title: "Technopark Today",
        image: "/assets/IG/Digital Marketing/Community Partners/Technopark Today.png",
        link: "#",
      },
      {
        id: "cp-007-3",
        title: "Kerala Knowledge Economy Mission",
        image:
          "/assets/IG/Digital Marketing/Community Partners/Kerala Knowledge Economy Mission.png",
        link: "#",
      },
    ],
    partnerCompanies: [
      {
        id: "pc-007",
        title: "BrandBoost",
        image: "https://www.svgrepo.com/show/452148/hubspot.svg",
        link: "https://brandboost.com",
      },
    ],
  },
  //data science 
  {
    id: "85fdd535-08d2-4619-9da7-944e21365de9", // Unique ID for Data Science
    title: "Data Science",
    description:
      "Excited about uncovering insights from data? The Data Science Interest Group offers an opportunity to explore big data, machine learning, and predictive analysis, perfect for anyone interested in data-driven decision-making. Join us to understand how data can reveal patterns, trends, and solutions.",
    bannerImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=3540&auto=format&fit=crop", // Placeholder image related to data science
    memberCount: 18000, // Placeholder value; adjust as needed
    memberSince: "January 2023", // Placeholder; adjust as needed
    isPublic: true,
    officeHours: "Monday 8:30 PM",
    thinkTankMeeting: "2nd Friday 6:30 PM @ Google Meet",
    interestGroupLeads: {
      description:
        "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities within their interests.",
      leads: [
        {
          name: "Muhammed Ziyan",
          institution: "St. Thomas Institute for Science and Technology",
          linkedin: "https://www.linkedin.com/in/mziyan/",
          imageUrl: "/assets/IG/Data Science/IG Lead/Muhammed Ziyan.jpg",
        },
        {
          name: "Jeeva Vinod",
          institution: "Vidya Academy of Science and Technology",
          linkedin: "https://www.linkedin.com/in/jeeva-vinod-7b536a215",
          imageUrl: "/assets/IG/Data Science/IG Lead/Jeeva Vinod.jpg",
        },
      ],
    },
    prerequisites: [
      "Know Python, a programming language used for working with data.",
      "Learn SQL to manage and access data stored in databases.",
      "Understand basic statistics to analyze data and find patterns.",
      "Know how to use Excel functions to organize and work with data.",
    ],
    peopleToFollow: [
      { name: "Hilary Mason", link: "https://x.com/hmason" },
      { name: "Ben Lorica", link: "https://x.com/bigdata" },
      { name: "DJ Patil", link: "https://x.com/dpatil" },
      { name: "Cassie Kozyrkov", link: "https://www.linkedin.com/in/kozyrkov/" },
      { name: "Kirk Borne", link: "https://www.linkedin.com/in/kirkdborne/" },
    ],
    blogsToFollow: [
      { name: "Towards Data Science", link: "https://towardsdatascience.com/" },
      { name: "Data Science Central", link: "https://www.datasciencecentral.com/" },
      { name: "KD Nuggets", link: "https://www.kdnuggets.com/" },
    ],
    topKeywords: [
      "Data Cleaning",
      "Machine Learning",
      "Big Data",
      "Data Visualization",
      "Python",
      "R",
      "Predictive Modeling",
      "Algorithms",
      "Data Wrangling",
      "Neural Networks",
    ],
    tabs: {
      about: {
        foundationDeck: "",
        description:
          "The Data Science Interest Group connects enthusiasts and professionals passionate about uncovering insights from data. Explore our resources at: <a href='https://mulearnfoundation.notion.site/11e59e69b1bf80dcb994c2ba100c04d5?pvs=25' target='_blank' rel='noopener noreferrer'>Foundation Deck</a>",
        opportunities: [
          {
            title: "Data Scientist",
            description: "Analyze data to extract actionable insights.",
          },
          {
            title: "Data Engineer",
            description: "Develop and maintain data pipelines for processing data.",
          },
          {
            title: "Machine Learning Engineer",
            description: "Design models to predict outcomes from data.",
          },
          {
            title: "Business Intelligence Analyst",
            description: "Use data to make informed business decisions.",
          },
          {
            title: "Data Analyst",
            description:
              "Work on datasets to derive trends and insights for companies.",
          },
        ],
      },
      forum: { placeholder: "Discuss data science topics here." },
      members: [
        {
          id: 20,
          name: "Emma Carter",
          muid: "emma456",
          profile_pic:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80", // Placeholder image
          karma: "1100", // Placeholder value
          interest_groups: [
            { id: "85fdd535-08d2-4619-9da7-944e21365de9", name: "Data Science Interest Group" },
          ],
          organizations: [
            {
              id: "org-21",
              title: "Data Science Academy",
              code: "DSA01",
              org_type: "College",
            }, // Placeholder organization
          ],
        },
      ],
      events: [
        {
          id: "evt-013",
          title: "Data Science Bootcamp 2025",
          link: "https://datasciencecommunity.com/events/bootcamp", // Placeholder link
          venue: "Online via Zoom",
          eventType: "Online",
          date: "August 10, 2025", // Placeholder date
          time: "14:00 - 17:00 GMT", // Placeholder time
          image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800", // Placeholder image
        },
      ],
      learningPaths: [
        {
          id: "lp-008",
          title: "Data Science Basics",
          description: "Learn foundational data science skills with Python.",
          link: "/learning-paths/data-science", // Placeholder link
        },
      ],
      thinkTank: [
        {
          id: "tt-008",
          name: "Alex Thompson",
          role: "Data Science Lead, Google",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&q=80", // Placeholder image
          expertise: ["Machine Learning", "Big Data"], // Placeholder expertise
        },
      ],
      mentors: [
        {
          id: "m-008",
          name: "Arjun MS",
          role: "Backend Developer @Gtech µLearn",
          linkedin: "https://www.linkedin.com/in/the-arjun-ms/",
          image: "/assets/IG/Data Science/Mentors/Arjun M S.jpg",
          expertise: [], // Add if available
        },
      ],
    },
    communityPartners: [], // Set to empty array since provided data has null
    partnerCompanies: [
      {
        id: "pc-008",
        title: "DataTech Solutions",
        image: "https://www.svgrepo.com/show/452149/python.svg", // Placeholder image (Python-related)
        link: "https://datatechsolutions.com", // Placeholder link
      },
    ],
  },

  {
    id: "95fdd535-08d2-4619-9da7-944e21365de9", // Unique ID for Cloud and DevOps
    title: "Cloud and DevOps",
    description:
      "Wonder how applications are deployed and managed in the cloud? Cloud computing and DevOps are the backbone of modern IT infrastructure, ensuring that software is delivered faster, more efficiently, and with higher reliability. The Cloud Computing & DevOps Interest Group at GTech μLearn is here to equip you with the skills needed to master cloud platforms, automation tools, and continuous integration/continuous deployment (CI/CD) practices. Join us to explore, learn, and collaborate on real-world projects, and dive into the future of cloud-native technologies.",
    bannerImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=3540&auto=format&fit=crop", // Placeholder image related to cloud/devops
    memberCount: 22000, // Placeholder value; adjust as needed
    memberSince: "June 2022", // Placeholder; adjust as needed
    isPublic: true,
    officeHours: "Wednesday 7PM @ Gathering Field",
    thinkTankMeeting: "Thursday 6:00 PM @ Google Meet",
    interestGroupLeads: {
      description:
        "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities within their interests.",
      leads: [
        {
          name: "Lezin VM",
          institution: "College of Engineering Aranmula",
          linkedin: "https://www.linkedin.com/in/lezin-vm/",
          imageUrl: "/assets/IG/Devops/IG Leads/Lezin V M.jpeg",
        },
      ],
    },
    prerequisites: [
      "Having a basic understanding of programming languages like Python, Java, or JavaScript will help with automation and cloud applications.",
      "Familiarity with operating systems (Linux and Windows) is important, as most tools run on these platforms.",
      "Knowledge of version control systems like Git, basic networking concepts (IP addresses, DNS, HTTP/HTTPS), and virtualization (VMs, Docker) will also be helpful.",
      "Familiarity with cloud platforms like AWS, Azure, or Google Cloud is an advantage but not required.",
    ],
    peopleToFollow: [
      { name: "Werner Vogels", link: "https://twitter.com/Werner" },
      { name: "Kelsey Hightower", link: "https://twitter.com/kelseyhightower" },
      { name: "Nicole Forsgren", link: "https://twitter.com/nicolefv" },
      { name: "Jeff Barr", link: "https://twitter.com/jeffbarr" },
      { name: "Martin Fowler", link: "https://martinfowler.com/" },
    ],
    blogsToFollow: [
      { name: "AWS News Blog", link: "https://aws.amazon.com/blogs/aws/" },
      { name: "All Things Distributed", link: "https://www.allthingsdistributed.com/" },
      { name: "DevOps.com", link: "https://devops.com/" },
      { name: "Cloudonaut", link: "https://cloudonaut.io/" },
      { name: "Google Cloud DevOps and SRE Blog", link: "https://cloud.google.com/blog/products/devops-sre" },
    ],
    topKeywords: [
      "CI/CD",
      "Containerization",
      "Kubernetes",
      "Docker",
      "Cloud Platforms",
      "Infrastructure as Code (IaC)",
      "Serverless",
      "DevOps Pipelines",
      "Monitoring",
      "SRE",
    ],
    tabs: {
      about: {
        foundationDeck: "",
        description:
          "The Cloud Computing & DevOps Interest Group connects enthusiasts and professionals passionate about modern IT infrastructure. Explore our resources at: <a href='https://mulearnfoundation.notion.site/11e59e69b1bf807d8bf8dfe078c074d7?pvs=25' target='_blank' rel='noopener noreferrer'>Download Link</a>",
        opportunities: [
          {
            title: "DevOps Engineer",
            description: "Develop processes for faster code releases.",
          },
          {
            title: "Cloud Engineer",
            description: "Manage cloud services and applications.",
          },
          {
            title: "Site Reliability Engineer",
            description: "Maintain uptime and ensure application performance.",
          },
          {
            title: "Automation Engineer",
            description: "Automate infrastructure and software deployment.",
          },
          {
            title: "Cloud Architect",
            description: "Design cloud-based solutions for organizations.",
          },
        ],
      },
      forum: { placeholder: "Discuss cloud and DevOps topics here." },
      members: [
        {
          id: 21,
          name: "Liam Patel",
          muid: "liam789",
          profile_pic:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&q=80", // Placeholder image
          karma: "1450", // Placeholder value
          interest_groups: [
            { id: "95fdd535-08d2-4619-9da7-944e21365de9", name: "Cloud and DevOps Interest Group" },
          ],
          organizations: [
            {
              id: "org-22",
              title: "Tech Institute",
              code: "TI01",
              org_type: "College",
            }, // Placeholder organization
          ],
        },
      ],
      events: [
        {
          id: "evt-014",
          title: "Cloud DevOps Summit 2025",
          link: "https://clouddevopscommunity.com/events/summit", // Placeholder link
          venue: "Online via Zoom",
          eventType: "Online",
          date: "September 15, 2025", // Placeholder date
          time: "13:00 - 16:00 GMT", // Placeholder time
          image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800", // Placeholder image
        },
      ],
      learningPaths: [
        {
          id: "lp-009",
          title: "DevOps with AWS",
          description: "Learn DevOps practices using AWS tools.",
          link: "/learning-paths/devops-aws", // Placeholder link
        },
      ],
      thinkTank: [
        {
          id: "tt-009",
          name: "Sarah Mitchell",
          role: "Cloud Architect, Microsoft",
          image:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&q=80", // Placeholder image
          expertise: ["Kubernetes", "Cloud Security"], // Placeholder expertise
        },
      ],
      mentors: [
        {
          id: "m-009",
          name: "Akash Santhosh",
          role: "Network and Systems Engineer | Debian Contributor µlearn Alumni",
          linkedin: "https://www.linkedin.com/in/akashsanthosh/",
          image: "/assets/IG/Devops/Mentors/Akash Santhosh.jpg",
          expertise: [], // Add if available
        },
        {
          id: "m-010",
          name: "Muhammed Iqbal P B",
          role: "Cloud Architect @Codeace Leading AWS UG, CNCG & Grafana Kochi, µlearn Alumni",
          linkedin: "https://www.linkedin.com/in/iqbalpb/",
          image: "/assets/IG/DevOps/Mentors/Muhammed Iqbal.jpg",
          expertise: [],
        },
      ],
    },
    communityPartners: [
      {
        id: "cp-009-1",
        title: "Devops",
        image: "/assets/IG/Devops/Community Partners/Devops.jpg",
        link: "#", // Placeholder link; replace with actual URL if available
      },
    ],
    partnerCompanies: [
      {
        id: "pc-009",
        title: "CloudSync",
        image: "https://www.svgrepo.com/show/452150/aws.svg", // Placeholder image (AWS-related)
        link: "https://cloudsync.com", // Placeholder link
      },
    ],
  },


  //product management
  {
    id: "a5fdd535-08d2-4619-9da7-944e21365de9", // Unique ID for Product Management
    title: "Product Management",
    description:
      "Product Management is deciding what to build next”. Are you interested in learning to build the right product and the product right? Join our “Product Management” Interest Group to learn and collaborate with peers.",
    bannerImage:
      "https://images.unsplash.com/photo-1551288049-b51d5a7480e7?q=80&w=3540&auto=format&fit=crop", // Placeholder image related to product management
    memberCount: 14500, // Placeholder value; adjust as needed
    memberSince: "March 2023", // Placeholder; adjust as needed
    isPublic: true,
    officeHours: "TBA",
    thinkTankMeeting: "TBA",
    interestGroupLeads: {
      description:
        "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities within their interests.",
      leads: [
        {
          name: "Adarsh Madhusoodanan",
          institution: "College of Engineering Trikaripur",
          linkedin: "https://www.linkedin.com/in/adarshmadhusoodananp/",
          imageUrl: "/assets/IG/Product Management/IG Lead/Adarsh Madhusoodanan.jpg",
        },
      ],
    },
    prerequisites: [
      "Develop empathy for users to understand their needs and pain points.",
      "Cultivate problem-solving abilities to identify challenges and think critically about solutions.",
      "Strengthen communication skills to effectively convey ideas and collaborate with others.",
      "Focus on teamwork, as product management often involves working with designers, developers, and stakeholders.",
    ],
    peopleToFollow: [
      { name: "Tim Herbig", link: "https://www.linkedin.com/in/timherbig/" },
      { name: "Daniel Elizalde", link: "https://www.linkedin.com/in/danielelizalde/" },
      { name: "John Carter", link: "https://www.linkedin.com/in/johncarter/" },
      { name: "Charles Du", link: "https://www.linkedin.com/in/charlesdu/" },
    ],
    blogsToFollow: [
      { name: "PM School", link: "https://pmschool.io/" },
      { name: "BlackBox of PM", link: "https://blackboxofpm.com/" },
      { name: "Department of Product", link: "https://www.departmentofproduct.com/" },
    ],
    topKeywords: [
      "Product Strategy",
      "Agile Methodology",
      "Market Research",
      "Customer Feedback",
      "Roadmapping",
      "Product Lifecycle",
      "UX/UI Design",
      "Cross-functional Teams",
    ],
    tabs: {
      about: {
        foundationDeck: "https://www.notion.so/Product-Management-11e59e69b1bf8081b32ccfc0255949e0?pvs=4",
        description:
          "The Product Management Interest Group connects enthusiasts eager to master the art of building the right product and building it right. Explore our resources at: <a href='https://mulearnfoundation.notion.site/11e59e69b1bf8081b32ccfc0255949e0?pvs=25' target='_blank' rel='noopener noreferrer'>Download Link</a>",
        opportunities: [
          {
            title: "Product Manager",
            description:
              "Oversee product lifecycle and align it with user needs and business goals.",
          },
          {
            title: "Associate Product Manager",
            description:
              "Support senior product managers in research, planning, and execution.",
          },
          {
            title: "Product Marketing Manager",
            description:
              "Develop strategies to market and position products effectively.",
          },
          {
            title: "Technical Product Manager",
            description:
              "Bridge technical teams and business goals to deliver successful products.",
          },
          {
            title: "UX Researcher",
            description:
              "Focus on understanding user behavior to inform product design and strategy.",
          },
        ],
      },
      forum: { placeholder: "Discuss product management strategies here." },
      members: [
        {
          id: 22,
          name: "Sophie Bennett",
          muid: "sophie123",
          profile_pic:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80", // Placeholder image
          karma: "1250", // Placeholder value
          interest_groups: [
            { id: "a5fdd535-08d2-4619-9da7-944e21365de9", name: "Product Management Interest Group" },
          ],
          organizations: [
            {
              id: "org-23",
              title: "Management Academy",
              code: "MA01",
              org_type: "College",
            }, // Placeholder organization
          ],
        },
      ],
      events: [
        {
          id: "evt-015",
          title: "Product Management Summit 2025",
          link: "https://pmcommunity.com/events/summit", // Placeholder link
          venue: "Online via Zoom",
          eventType: "Online",
          date: "October 20, 2025", // Placeholder date
          time: "11:00 - 14:00 GMT", // Placeholder time
          image:
            "https://images.unsplash.com/photo-1551288049-b51d5a7480e7?q=80&w=800", // Placeholder image
        },
      ],
      learningPaths: [
        {
          id: "lp-010",
          title: "Product Management Essentials",
          description: "Learn the foundations of product management.",
          link: "/learning-paths/product-management", // Placeholder link
        },
      ],
      thinkTank: [
        {
          id: "tt-010",
          name: "Emma Clarkson",
          role: "Senior Product Manager, Atlassian",
          image:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&q=80", // Placeholder image
          expertise: ["Product Strategy", "Agile"], // Placeholder expertise
        },
      ],
      mentors: [
        {
          id: "m-011",
          name: "Angel",
          role: "Role", // Placeholder role; update with actual role if available
          linkedin: "", // Empty as provided; update if available
          image: "/assets/IG/Product Management/Mentors/Angel.jpg",
          expertise: [], // Add if available
        },
      ],
    },
    communityPartners: [], // Set to empty array since provided data has null
    partnerCompanies: [
      {
        id: "pc-010",
        title: "ProductLabs",
        image: "https://www.svgrepo.com/show/452151/jira.svg", // Placeholder image (Jira-related, common in PM)
        link: "https://productlabs.com", // Placeholder link
      },
    ],
  },



];


export const uiuxInterestGroupData = interestGroups[0];
export const webDevInterestGroupData = interestGroups[1];
export const cyberSecInterestGroupData = interestGroups[2];
export const gameDevInterestGroupData = interestGroups[3];
export const iotInterestGroupData = interestGroups[4];
export const hrInterestGroupData = interestGroups[5];
export const digitalMarketingInterestGroupData = interestGroups[6];
export const dataScienceInterestGroupData = interestGroups[7];
export const cloudDevOpsInterestGroupData = interestGroups[8];
export const productManagementInterestGroupData = interestGroups[9];
import React from "react";
import { 
  MdVideoLibrary, 
  MdDesignServices, 
  MdOutlineColorLens, 
  MdCreate, 
  MdMovieFilter, 
  MdOutlineComputer, 
  MdEdit, 
  MdOutlineDesignServices 
} from "react-icons/md";

const levelsData = [
  {
    level: 1,
    title: "Level 1",
    subtitle: "Fundamentals and Basics",
    cards: [
      {
        id: "1-1",
        title: "Intro to Editing",
        desc: "A small description about editing",
        brief:"My video editing proof-of-work demonstrates a comprehensive process—from crafting detailed storyboards and meticulously organizing raw footage with metadata, to assembling a rough cut that establishes narrative flow and refining it through precise color grading, audio balancing, and seamless transitions. This project is documented with annotated screenshots and export logs, showcasing both technical proficiency and creative vision that culminate in a polished final product ready for professional distribution.",
        ig: "Creative - Video Editing",
        icon: <MdVideoLibrary />,
        skills: ["Storyboarding", "Cutting", "Transitions"],
        publishedBy: "John Doe",
        publishedWhen: "2023-05-01",
        prerequisites: ["Basic computer knowledge"],
        resources: [
          "https://example.com/editing-resource1",
          "https://example.com/editing-resource2"
        ]
      },
      {
        id: "1-2",
        title: "UI/UX Foundations",
        desc: "Learn the fundamentals of UI/UX",
        brief:"My video editing proof-of-work demonstrates a comprehensive process—from crafting detailed storyboards and meticulously organizing raw footage with metadata, to assembling a rough cut that establishes narrative flow and refining it through precise color grading, audio balancing, and seamless transitions. This project is documented with annotated screenshots and export logs, showcasing both technical proficiency and creative vision that culminate in a polished final product ready for professional distribution.",
        ig: "Creative - UI/UX",
        icon: <MdDesignServices />,
        skills: ["Wireframing", "User Flows", "Prototyping"],
        publishedBy: "Alice Smith",
        publishedWhen: "2023-05-10",
        prerequisites: ["Design sense"],
        resources: ["https://example.com/uiux1"]
      }
    ]
  },
  {
    level: 2,
    title: "Level 2",
    subtitle: "Intermediate Concepts",
    cards: [
      {
        id: "2-1",
        title: "Comic Creation",
        desc: "Basics of creating digital comics",
        brief:"My video editing proof-of-work demonstrates a comprehensive process—from crafting detailed storyboards and meticulously organizing raw footage with metadata, to assembling a rough cut that establishes narrative flow and refining it through precise color grading, audio balancing, and seamless transitions. This project is documented with annotated screenshots and export logs, showcasing both technical proficiency and creative vision that culminate in a polished final product ready for professional distribution.",
        ig: "Creative - Comics",
        icon: <MdOutlineColorLens />,
        skills: ["Sketching", "Storytelling"],
        publishedBy: "Comic Studio",
        publishedWhen: "2023-06-01",
        prerequisites: ["Drawing fundamentals"],
        resources: ["https://example.com/comics-resource"]
      },
      {
        id: "2-2",
        title: "Creative Writing",
        desc: "Explore short story writing",
        brief:"My video editing proof-of-work demonstrates a comprehensive process—from crafting detailed storyboards and meticulously organizing raw footage with metadata, to assembling a rough cut that establishes narrative flow and refining it through precise color grading, audio balancing, and seamless transitions. This project is documented with annotated screenshots and export logs, showcasing both technical proficiency and creative vision that culminate in a polished final product ready for professional distribution.",
        ig: "Creative - Writing",
        icon: <MdCreate />,
        skills: ["Plot structure", "Editing"],
        publishedBy: "Jane Doe",
        publishedWhen: "2023-06-15",
        prerequisites: ["Language proficiency"],
        resources: ["https://example.com/writing-resource"]
      }
    ]
  },
  {
    level: 3,
    title: "Level 3",
    subtitle: "Advanced Skills",
    cards: [
      {
        id: "3-1",
        title: "Motion Graphics",
        desc: "Advanced video editing & motion graphics",
        brief:"My video editing proof-of-work demonstrates a comprehensive process—from crafting detailed storyboards and meticulously organizing raw footage with metadata, to assembling a rough cut that establishes narrative flow and refining it through precise color grading, audio balancing, and seamless transitions. This project is documented with annotated screenshots and export logs, showcasing both technical proficiency and creative vision that culminate in a polished final product ready for professional distribution.",
        ig: "Creative - Video Editing",
        icon: <MdMovieFilter />,
        skills: ["Animation", "Timing"],
        publishedBy: "Pro Editor",
        publishedWhen: "2023-07-01",
        prerequisites: ["Basic video editing knowledge"],
        resources: ["https://example.com/motion-resource"]
      },
      {
        id: "3-2",
        title: "Interactive Prototyping",
        desc: "Build high-fidelity interactive prototypes",
        brief:"My video editing proof-of-work demonstrates a comprehensive process—from crafting detailed storyboards and meticulously organizing raw footage with metadata, to assembling a rough cut that establishes narrative flow and refining it through precise color grading, audio balancing, and seamless transitions. This project is documented with annotated screenshots and export logs, showcasing both technical proficiency and creative vision that culminate in a polished final product ready for professional distribution.",
        ig: "Creative - UI/UX",
        icon: <MdOutlineComputer />,
        skills: ["Figma Prototyping", "User Testing"],
        publishedBy: "UI Lab",
        publishedWhen: "2023-07-10",
        prerequisites: ["UI/UX Foundations"],
        resources: ["https://example.com/proto-resource"]
      }
    ]
  },
  {
    level: 4,
    title: "Level 4",
    subtitle: "Special Pathway Selection",
    interestGroups: [
      {
        id: "ig-1",
        name: "Editing",
        description: "Focus on advanced editing",
        icon: <MdEdit />
      },
      {
        id: "ig-2",
        name: "UI/UX",
        description: "Focus on advanced UI/UX",
        icon: <MdOutlineDesignServices />
      },
      {
        id: "ig-3",
        name: "Comics",
        description: "Focus on professional comic creation",
        icon: <MdOutlineColorLens />
      },
      {
        id: "ig-4",
        name: "Writing",
        description: "Focus on advanced creative writing",
        icon: <MdCreate />
      }
    ]
  }
];

export default levelsData;

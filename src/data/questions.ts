import { DepartmentId, Question } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'What activity excites you the most?',
    type: 'single',
    icon: 'compass',
    options: [
      {
        id: 'q1_o1',
        text: 'Build an application',
        desc: 'Turn ideas into real, working solutions.',
        icon: 'laptop',
        weights: { development: 10, design: 2, events: 1, social_media: 0 },
      },
      {
        id: 'q1_o2',
        text: 'Design a visual identity',
        desc: 'Create beautiful and meaningful designs.',
        icon: 'palette',
        weights: { development: 1, design: 10, events: 2, social_media: 5 },
      },
      {
        id: 'q1_o3',
        text: 'Organize a workshop or event',
        desc: 'Plan and bring people together.',
        icon: 'calendar',
        weights: { development: 1, design: 1, events: 10, social_media: 3 },
      },
      {
        id: 'q1_o4',
        text: 'Create a social media campaign',
        desc: 'Share ideas and create engaging content.',
        icon: 'megaphone',
        weights: { development: 0, design: 3, events: 2, social_media: 10 },
      },
    ],
  },
  {
    id: 2,
    title: 'What type of problem attracts you the most?',
    type: 'single',
    icon: 'help-circle',
    options: [
      {
        id: 'q2_o1',
        text: 'Technical systems & logic',
        desc: 'Debugging tricky errors, architecting clean code, and automating workflows.',
        icon: 'code',
        weights: { development: 10, design: 2, events: 2, social_media: 1 },
      },
      {
        id: 'q2_o2',
        text: 'Visual composition & user experience',
        desc: 'Crafting intuitive UI interfaces, color systems, and seamless navigation.',
        icon: 'layout',
        weights: { development: 2, design: 10, events: 2, social_media: 4 },
      },
      {
        id: 'q2_o3',
        text: 'People coordination & logistics',
        desc: 'Solving team bottlenecks, managing event schedules, and stage prep.',
        icon: 'users',
        weights: { development: 2, design: 1, events: 10, social_media: 3 },
      },
      {
        id: 'q2_o4',
        text: 'Audience engagement & message reach',
        desc: 'Finding creative angles that make tech topics viral and accessible to all.',
        icon: 'trending-up',
        weights: { development: 1, design: 3, events: 3, social_media: 10 },
      },
    ],
  },
  {
    id: 3,
    title: 'What motivates you the most in a project?',
    type: 'single',
    icon: 'sparkles',
    options: [
      {
        id: 'q3_o1',
        text: 'Practical, high-impact results',
        desc: 'Seeing code compile cleanly and solve everyday problems for people.',
        icon: 'cpu',
        weights: { development: 10, design: 2, events: 2, social_media: 1 },
      },
      {
        id: 'q3_o2',
        text: 'Aesthetic elegance and polish',
        desc: 'Delighting users with stunning typography, colors, and motion.',
        icon: 'feather',
        weights: { development: 2, design: 10, events: 3, social_media: 4 },
      },
      {
        id: 'q3_o3',
        text: 'Human connection and team impact',
        desc: 'Witnessing an auditorium filled with excited learners and mentors.',
        icon: 'heart',
        weights: { development: 1, design: 2, events: 10, social_media: 4 },
      },
      {
        id: 'q3_o4',
        text: 'Storytelling and digital community',
        desc: 'Reaching thousands of followers and sparking lively conversations.',
        icon: 'share-2',
        weights: { development: 0, design: 3, events: 3, social_media: 10 },
      },
    ],
  },
  {
    id: 4,
    title: 'How do you prefer to collaborate on team initiatives?',
    type: 'single',
    icon: 'user-check',
    options: [
      {
        id: 'q4_o1',
        text: 'Deep-focus technical builder',
        desc: 'Working closely on feature branches, pull requests, and system architecture.',
        icon: 'git-merge',
        weights: { development: 10, design: 3, events: 1, social_media: 1 },
      },
      {
        id: 'q4_o2',
        text: 'Visual creator & prototype specialist',
        desc: 'Collaborating in design studios, wireframing, and refining graphics.',
        icon: 'figma',
        weights: { development: 3, design: 10, events: 2, social_media: 4 },
      },
      {
        id: 'q4_o3',
        text: 'Project facilitator & organizer',
        desc: 'Setting agendas, keeping teams synchronized, and driving deadlines.',
        icon: 'check-square',
        weights: { development: 3, design: 2, events: 10, social_media: 4 },
      },
      {
        id: 'q4_o4',
        text: 'Public communicator & outreach champion',
        desc: 'Representing the club, speaking publicly, and sharing updates.',
        icon: 'mic',
        weights: { development: 1, design: 3, events: 5, social_media: 10 },
      },
    ],
  },
  {
    id: 5,
    title: 'How do you react when facing a complex blocker?',
    type: 'single',
    icon: 'shield-alert',
    options: [
      {
        id: 'q5_o1',
        text: 'Analyze the system and debug step-by-step',
        desc: 'Inspect stack traces, read docs, experiment with solutions logically.',
        icon: 'terminal',
        weights: { development: 10, design: 2, events: 2, social_media: 1 },
      },
      {
        id: 'q5_o2',
        text: 'Experiment visually and rethink the interaction',
        desc: 'Sketch different angles, adjust layouts, and discover aesthetic clarity.',
        icon: 'pen-tool',
        weights: { development: 2, design: 10, events: 2, social_media: 3 },
      },
      {
        id: 'q5_o3',
        text: 'Assemble the team and redistribute tasks',
        desc: 'Communicate urgently, reorganize resources, and unblock teammates.',
        icon: 'users',
        weights: { development: 2, design: 2, events: 10, social_media: 4 },
      },
      {
        id: 'q5_o4',
        text: 'Crowdsource feedback and engage the audience',
        desc: 'Ask the community, share the dilemma, and turn it into a learning moment.',
        icon: 'message-circle',
        weights: { development: 1, design: 3, events: 4, social_media: 10 },
      },
    ],
  },
  {
    id: 6,
    title: 'Which SDG flagship activity would you love to lead?',
    type: 'single',
    icon: 'award',
    options: [
      {
        id: 'q6_o1',
        text: 'Develop the official SDG Hackathon Platform',
        desc: 'Architect the registration engine, live scoreboard, and submission portal.',
        icon: 'server',
        weights: { development: 10, design: 2, events: 2, social_media: 0 },
      },
      {
        id: 'q6_o2',
        text: 'Design the Grand Stage Visual Package & 3D Brand',
        desc: 'Create futuristic motion visuals, badge passes, and venue branding.',
        icon: 'image',
        weights: { development: 2, design: 10, events: 3, social_media: 5 },
      },
      {
        id: 'q6_o3',
        text: 'Direct the Welcome Day Grand Opening & Keynotes',
        desc: 'Curate the speakers, manage auditorium logistics, and host 500+ guests.',
        icon: 'volume-2',
        weights: { development: 1, design: 2, events: 10, social_media: 3 },
      },
      {
        id: 'q6_o4',
        text: 'Produce the Viral Recap Video & Social Campaign',
        desc: 'Film backstage interviews, shoot cinematic reels, and trend online.',
        icon: 'video',
        weights: { development: 0, design: 4, events: 3, social_media: 10 },
      },
    ],
  },
  {
    id: 7,
    title: 'What role do you naturally step into in group efforts?',
    type: 'single',
    icon: 'compass',
    options: [
      {
        id: 'q7_o1',
        text: 'The Architect & Problem Solver',
        desc: 'I bring structured thinking, technical know-how, and build the engine.',
        icon: 'cpu',
        weights: { development: 10, design: 2, events: 1, social_media: 0 },
      },
      {
        id: 'q7_o2',
        text: 'The Creative Visionary & Stylist',
        desc: 'I care deeply about how things look, feel, and resonate emotionally.',
        icon: 'eye',
        weights: { development: 2, design: 10, events: 2, social_media: 4 },
      },
      {
        id: 'q7_o3',
        text: 'The Event Conductor & Leader',
        desc: 'I keep people energized, organized, and focused on the finish line.',
        icon: 'shield',
        weights: { development: 2, design: 2, events: 10, social_media: 3 },
      },
      {
        id: 'q7_o4',
        text: 'The Storyteller & Community Voice',
        desc: 'I connect with people, write compelling words, and spark excitement.',
        icon: 'send',
        weights: { development: 0, design: 3, events: 4, social_media: 10 },
      },
    ],
  },
  {
    id: 8,
    title: 'What would you like to master the most this academic year?',
    type: 'single',
    icon: 'book-open',
    options: [
      {
        id: 'q8_o1',
        text: 'Modern Web, Mobile & Backend Engineering',
        desc: 'Mastering React, TypeScript, APIs, Python, and scalable architecture.',
        icon: 'code',
        weights: { development: 10, design: 2, events: 1, social_media: 0 },
      },
      {
        id: 'q8_o2',
        text: 'UI/UX Design Systems, 3D Art & Figma',
        desc: 'Elevating visual taste, mastering auto-layout, and motion graphics.',
        icon: 'palette',
        weights: { development: 2, design: 10, events: 1, social_media: 4 },
      },
      {
        id: 'q8_o3',
        text: 'Project Management, Public Speaking & Event Logistics',
        desc: 'Leading large-scale tech conferences and learning executive operations.',
        icon: 'briefcase',
        weights: { development: 1, design: 1, events: 10, social_media: 3 },
      },
      {
        id: 'q8_o4',
        text: 'Digital Marketing, Video Storytelling & Content Strategy',
        desc: 'Creating viral content, growing social audiences, and digital branding.',
        icon: 'globe',
        weights: { development: 0, design: 4, events: 3, social_media: 10 },
      },
    ],
  },
];

export function calculateSortingResult(answers: Record<number, string>): {
  departmentId: DepartmentId;
  scores: Record<DepartmentId, number>;
  topScore: number;
} {
  const scores: Record<DepartmentId, number> = {
    development: 0,
    design: 0,
    events: 0,
    social_media: 0,
  };

  QUESTIONS.forEach((q) => {
    const selectedOptionId = answers[q.id];
    if (selectedOptionId) {
      const option = q.options.find((opt) => opt.id === selectedOptionId);
      if (option) {
        scores.development += option.weights.development;
        scores.design += option.weights.design;
        scores.events += option.weights.events;
        scores.social_media += option.weights.social_media;
      }
    }
  });

  const departmentOrder: DepartmentId[] = ['development', 'design', 'events', 'social_media'];
  let maxScore = -1;
  let winner: DepartmentId = 'development';

  for (const dept of departmentOrder) {
    if (scores[dept] > maxScore) {
      maxScore = scores[dept];
      winner = dept;
    }
  }

  return {
    departmentId: winner,
    scores,
    topScore: maxScore,
  };
}

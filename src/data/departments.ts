import { Department } from '../types';

export const DEPARTMENTS: Record<string, Department> = {
  development: {
    id: 'development',
    name: 'Development',
    tagline: 'Turning ideas into real solutions.',
    shortDesc: 'Build, develop and turn ideas into real solutions.',
    fullDesc:
      'The Development Department is the technical heart of SDG, where ideas become real projects. We work on web and mobile development, problem solving, automation and innovative tech solutions to serve our community and create real impact.',
    colorHex: '#3b82f6',
    accentClass: 'blue',
    bannerBg: 'from-blue-900/80 via-blue-950/90 to-slate-950',
    iconName: 'code',
    activities: [
      'Web & Mobile Development: Build modern web and mobile applications.',
      'Problem Solving: Find technical solutions to real challenges.',
      'Technical Workshops: Organize and participate in hands-on training.',
      'Innovative Projects: Work on creative and impactful tech projects.',
      'Open Source Contribution: Collaborate on meaningful open source projects.',
    ],
    keySkills: [
      'Programming',
      'Problem Solving',
      'Team Collaboration',
      'Logical Thinking',
      'Creativity',
      'Modern Technologies',
    ],
    tools: [
      { name: 'Flutter', icon: 'smartphone' },
      { name: 'React', icon: 'atom' },
      { name: 'Node.js', icon: 'server' },
      { name: 'Python', icon: 'terminal' },
      { name: 'Git', icon: 'git-branch' },
      { name: 'Docker', icon: 'container' },
      { name: 'Firebase', icon: 'database' },
      { name: 'PostgreSQL', icon: 'database' },
    ],
    projects: [
      {
        id: 'p1',
        name: 'SDG MoneyMate',
        desc: 'Budget management application for university students.',
      },
      {
        id: 'p2',
        name: 'Smart Timetable',
        desc: 'Automatic schedule generator and exam alert system.',
      },
      {
        id: 'p3',
        name: 'Community Platform',
        desc: 'Web platform for SDG events, registrations and resources.',
      },
    ],
    whoCanJoin: [
      'Passionate about technology and programming',
      'Interested in building real projects',
      'Willing to learn and share knowledge',
      'Team player and problem solver',
    ],
    mission:
      'To empower students through technology, by developing innovative solutions, sharing knowledge and contributing to a stronger tech community inside and outside the university.',
  },

  design: {
    id: 'design',
    name: 'Design',
    tagline: 'Create beautiful visuals and meaningful experiences.',
    shortDesc: 'Create beautiful visuals and meaningful experiences.',
    fullDesc:
      'The Design Department gives SDG its distinctive aesthetic soul. From intuitive user interfaces and user experience systems to striking brand identities, 3D graphics, and event visuals, we make ideas captivating, accessible, and delightful.',
    colorHex: '#dc2626',
    accentClass: 'rose',
    bannerBg: 'from-rose-950/80 via-red-950/90 to-slate-950',
    iconName: 'palette',
    activities: [
      'Graphic Design: Craft striking visual assets for physical and digital media.',
      'UI/UX Design: Architect seamless digital user flows and wireframes.',
      'Brand Identity: Maintain and elevate the visual guidelines of SDG.',
      'Creative Content: Produce illustrations, 3D badges, and motion design.',
      'Design Workshops: Teach modern tools like Figma and design thinking.',
    ],
    keySkills: [
      'Visual Aesthetics',
      'UI/UX Prototyping',
      'Typography & Color Theory',
      'User Empathy',
      'Creativity',
      'Attention to Detail',
    ],
    tools: [
      { name: 'Figma', icon: 'figma' },
      { name: 'Illustrator', icon: 'pen-tool' },
      { name: 'Photoshop', icon: 'image' },
      { name: 'Blender', icon: 'box' },
      { name: 'After Effects', icon: 'video' },
      { name: 'Canva Pro', icon: 'layout' },
    ],
    projects: [
      {
        id: 'p4',
        name: 'SDG Design System v3',
        desc: 'Unified design tokens, component library and dark fantasy accents.',
      },
      {
        id: 'p5',
        name: 'Welcome Day Visual Kit',
        desc: 'Stage graphics, badges, rollup banners and lanyard credentials.',
      },
      {
        id: 'p6',
        name: 'Hackathon Brand Package',
        desc: 'Distinctive visual identities for annual national student hackathons.',
      },
    ],
    whoCanJoin: [
      'Passionate about visual arts, digital illustration or UI/UX',
      'Enjoys turning complex concepts into clear visuals',
      'Eager to experiment with creative tools and motion',
      'Curious about design thinking and product aesthetics',
    ],
    mission:
      'To build engaging, inclusive, and visually stunning digital and physical experiences that elevate our community and inspire creators everywhere.',
  },

  events: {
    id: 'events',
    name: 'Events',
    tagline: 'Organize, plan and bring people together through impactful events.',
    shortDesc: 'Organize, plan and bring people together through impactful events.',
    fullDesc:
      'The Events Department is the organizing engine of SDG. We bring ideas to life on stage, orchestrating memorable hackathons, technical workshops, conference summits, and team-building gatherings that energize the university tech ecosystem.',
    colorHex: '#059669',
    accentClass: 'emerald',
    bannerBg: 'from-emerald-950/80 via-emerald-900/90 to-slate-950',
    iconName: 'calendar',
    activities: [
      'Workshops & Trainings: Hands-on student masterclasses and bootcamps.',
      'Hackathons: 48-hour high-energy coding marathons and demo days.',
      'Tech Talks: Inviting industry leaders and alumni for keynote seminars.',
      'Community Activities: Welcome Days, game nights, and social meetups.',
      'Stage & Logistics Management: Planning timelines, venues, and audio-visual setups.',
    ],
    keySkills: [
      'Organization & Logistics',
      'Team Leadership',
      'Public Speaking & MCing',
      'Problem Solving under pressure',
      'Negotiation & Partnerships',
      'Time Management',
    ],
    tools: [
      { name: 'Notion', icon: 'file-text' },
      { name: 'Trello', icon: 'trello' },
      { name: 'Google Workspace', icon: 'calendar' },
      { name: 'Slack/Discord', icon: 'message-square' },
      { name: 'Eventbrite', icon: 'ticket' },
      { name: 'OBS Studio', icon: 'monitor' },
    ],
    projects: [
      {
        id: 'p7',
        name: 'SDG Welcome Day 2026',
        desc: 'Flagship orientation festival welcoming 500+ engineering students.',
      },
      {
        id: 'p8',
        name: 'DevFest Sétif 2026',
        desc: 'Annual tech conference with international speakers and student workshops.',
      },
      {
        id: 'p9',
        name: 'SDG Hack Night #4',
        desc: 'Overnight collaborative sprint solving regional public health challenges.',
      },
    ],
    whoCanJoin: [
      'Energetic and motivated to build community bonds',
      'Enjoys coordinating teams and managing schedules',
      'Great interpersonal and communication skills',
      'Ready to turn ideas into memorable live experiences',
    ],
    mission:
      'To cultivate an inspiring, collaborative space through meticulously crafted gatherings that connect students, mentors, and the wider technological landscape.',
  },

  social_media: {
    id: 'social_media',
    name: 'Social Media',
    tagline: 'Share ideas, create content and grow our community online.',
    shortDesc: 'Share ideas, create content and grow our community online.',
    fullDesc:
      'The Social Media Department is the megaphone of SDG. We amplify our achievements, tell compelling stories of student innovation, craft viral reels and podcasts, and cultivate an engaged global tech following across all digital platforms.',
    colorHex: '#9333ea',
    accentClass: 'purple',
    bannerBg: 'from-purple-950/80 via-purple-900/90 to-slate-950',
    iconName: 'megaphone',
    activities: [
      'Content Creation: Scripting engaging tech carousels, tips, and tutorials.',
      'Community Management: Engaging with followers, comments, and DMs.',
      'Digital Campaigns: Running promotion drives for upcoming workshops.',
      'Video & Reels Production: Directing short-form videos, interviews, and recaps.',
      'Press & Media Outreach: Publishing newsletters and announcements.',
    ],
    keySkills: [
      'Copywriting & Storytelling',
      'Video Editing & Reels',
      'Community Engagement',
      'Trends Analysis',
      'Digital Strategy',
      'Creative Communication',
    ],
    tools: [
      { name: 'CapCut / Premiere', icon: 'video' },
      { name: 'Meta Business Suite', icon: 'share-2' },
      { name: 'LinkedIn Creator', icon: 'briefcase' },
      { name: 'TikTok Studio', icon: 'music' },
      { name: 'Twitter/X Analytics', icon: 'send' },
      { name: 'Mailchimp', icon: 'mail' },
    ],
    projects: [
      {
        id: 'p10',
        name: 'Behind the Code Series',
        desc: 'Video interview series highlighting student projects and startup founders.',
      },
      {
        id: 'p11',
        name: 'Welcome Day Viral Campaign',
        desc: 'Thematic Sorting Hat teaser campaign reaching 25,000+ local students.',
      },
      {
        id: 'p12',
        name: 'SDG Weekly Tech Digest',
        desc: 'Curated technical newsletter and weekly LinkedIn thought leadership.',
      },
    ],
    whoCanJoin: [
      'Passionate about social media trends and storytelling',
      'Creative writer, video editor, or content creator',
      'Wants to build a massive digital community',
      'Loves sharing knowledge and connecting with people',
    ],
    mission:
      'To give a vibrant voice to every SDG initiative, connecting thousands of learners and celebrating community talent across the digital world.',
  },
};

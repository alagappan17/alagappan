export interface Link {
  label: string
  href: string
  caption: string
  type: 'link' | 'email'
  email?: string
}

export interface TechStackItem {
  name: string
  logoUrl: string
}

export interface TimelineRole {
  title: string
  period: string
  description: string
}

export interface TimelineItem {
  year: string
  title: string
  organization: string
  description: string
  type: 'education' | 'work'
  location?: string
  employmentType?: 'Full Time' | 'Part Time'
  startDate: string // For calculating duration
  endDate: string // Can be "Present"
  logoUrl?: string // Logo image path
  hoverOrganization?: string // Alternate name for hover view
  hoverTitle?: string // Alternate title for hover view
  roles?: TimelineRole[] // For progression within same company
}

export interface Project {
  name: string
  description: string
  technologies: string[]
  highlights?: string[]
  url?: string
  displayUrl?: string // Overrides the label derived from `url`
  logoUrl?: string
}

export interface Artwork {
  name: string
  url: string // Path to image/gif/video or Instagram post URL
  type: 'image' | 'gif' | 'video' | 'instagram' | 'youtube'
  aspectRatio: '16:9' | '9:16' | '3:4'
  instagramUrl?: string // Instagram link to show on hover
}

export interface LifestyleItem {
  id: string
  url: string // Path to image
  caption?: string
  interest: string
  rotation?: number // Rotation angle in degrees (-15 to 15)
  position?: { x: number; y: number } // Position in percentage
}

export const personalInfo = {
  name: "I'm Alagappan",
  bio: 'A Software Engineer with a foundation rooted in early curiosity for computers and how things work. Over time, I found programming to be the right blend of my creative and logical personas.',
  introduction: [
    'I enjoy taking ideas from concept to execution and shaping experiences that genuinely help users. I prioritise maintainability because when the foundation is clean, the product becomes easier to improve and collaborate on. My goal is always to build systems that feel thoughtful and intentional.',
    'Beyond code, I’m skidrrow, a digital artist. I use Blender to create product animations, album covers, and experimental pieces. I see digital art as a medium to turn abstract thoughts into visual reality and express ideas with complete creative freedom.',
  ],
  techStack: [
    { name: 'React', logoUrl: '/stack/optimized/React.webp' },
    {
      name: 'TypeScript',
      logoUrl: '/stack/optimized/TypeScript.webp',
    },
    {
      name: 'Node.js',
      logoUrl: '/stack/optimized/Node.js.webp',
    },
    { name: 'Python', logoUrl: '/stack/optimized/Python.webp' },
    {
      name: 'PostgreSQL',
      logoUrl: '/stack/optimized/PostgreSQL.svg',
    },
    { name: 'AWS', logoUrl: '/stack/optimized/AWS.webp' },
    { name: 'Docker', logoUrl: '/stack/optimized/Docker.webp' },
    { name: 'Git', logoUrl: '/stack/optimized/Git.svg' },
    {
      name: 'JavaScript',
      logoUrl: '/stack/optimized/JavaScript.svg',
    },
    {
      name: 'Tailwind CSS',
      logoUrl: '/stack/optimized/TailwindCSS.svg',
    },
  ] as TechStackItem[],
  badge: {
    text: 'Works on my machine',
    status: 'active' as const,
  },
  location: {
    city: 'Hyderabad',
    country: 'India',
  },
  github: {
    username: 'alagappan',
  },
  project: {
    name: 'HierBridge',
    // description:
    //   "Right now, I'm building HierBridge, a platform to address disengagement and lost feedback within organisations. You can learn more about it on",
    description: '',
    url: 'https://www.hierbridge.com',
    displayUrl: 'www.hierbridge.com',
  },
  links: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/alagappan-n/',
      caption: "Let's connect!",
      type: 'link' as const,
    },
    {
      label: 'Email',
      href: 'mailto:alagappanforwork@gmail.com',
      caption: 'alagappanforwork@gmail.com',
      type: 'email' as const,
      email: 'alagappanforwork@gmail.com',
    },
  ] as Link[],
  socialLinks: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/alagappan-n/',
      icon: 'linkedin',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/alagappan17',
      icon: 'github',
    },
    {
      label: 'Twitter',
      href: 'https://twitter.com/alagappantwt',
      icon: 'twitter',
    },
    {
      label: 'Email',
      href: 'mailto:alagappanforwork@gmail.com',
      icon: 'email',
    },
    {
      label: 'Behance',
      href: 'https://www.behance.net/alagappann',
      icon: 'behance',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/skidrrow/',
      icon: 'instagram',
    },
    {
      label: 'ArtGrab',
      href: 'https://artgrab.co/art/skidrow',
      icon: 'artgrab',
    },
  ] as Array<{ label: string; href: string; icon: string }>,
  timeline: [
    {
      year: 'Aug 2023 - Present',
      title: 'SDE2',
      organization: 'Procedure',
      description:
        'Building an early literacy app based on the science of reading, helping kids learn to read.',
      type: 'work' as const,
      location: 'Remote',
      employmentType: 'Full Time' as const,
      startDate: 'Aug 2023',
      endDate: 'Present',
      logoUrl: '/experience/optimized/procedure.webp',
      roles: [
        {
          title: 'SDE2',
          period: 'Nov 2025 - Present',
          description:
            'Focusing on scaling the platform, building integrations and tools for better usability, and optimizing performance.',
        },
        {
          title: 'SDE1',
          period: 'Nov 2023 - Oct 2025',
          description:
            'Developed core features for Bloom from the ground up, built the MVP, and established the foundation.',
        },
        {
          title: 'Trainee',
          period: 'Aug 2023 - Oct 2023',
          description:
            '10-week intensive boot camp covering software engineering and SDLC fundamentals.',
        },
      ] as TimelineRole[],
    },
    {
      year: 'Feb 2023 - Feb 2023',
      title: 'VR Intern',
      organization: 'TANSAM (Siemens)',
      description:
        'Built interactive VR environments using Unity and Unreal Engine 5 for industrial problem visualization.',
      type: 'work' as const,
      location: 'Chennai',
      employmentType: 'Full Time' as const,
      startDate: 'Feb 2023',
      endDate: 'Feb 2023',
      logoUrl: '/experience/optimized/tansam.webp',
      roles: [
        {
          title: 'VR Intern',
          period: 'Feb 2023 - Feb 2023',
          description:
            'Built interactive VR environments using Unity and Unreal Engine 5 for industrial problem visualization.',
        },
      ] as TimelineRole[],
    },
    {
      year: 'Nov 2021 - Jun 2022',
      title: 'Student Ambassador',
      organization: 'OnePlus',
      description:
        'Part of 25-member cohort building student community. Reached 425k+ organic audience through campaigns and content.',
      type: 'work' as const,
      location: 'Remote',
      employmentType: 'Part Time' as const,
      startDate: 'Nov 2021',
      endDate: 'Jun 2022',
      logoUrl: '/experience/optimized/oneplus.webp',
      roles: [
        {
          title: 'Student Ambassador',
          period: 'Nov 2021 - Jun 2022',
          description:
            'Part of 25-member cohort building student community. Reached 425k+ organic audience through campaigns and content.',
        },
      ] as TimelineRole[],
    },
    {
      year: 'Aug 2019 - May 2023',
      title: 'B.Tech Information Technology',
      organization: 'Sri Venkateswara College of Engineering',
      description: 'Generic College Degree',
      type: 'education' as const,
      location: 'Chennai',
      employmentType: 'Full Time' as const,
      startDate: 'Aug 2019',
      endDate: 'May 2023',
      logoUrl: '/experience/optimized/svce.webp',
      hoverOrganization: 'SVCE',
      hoverTitle: 'B.Tech IT',
      roles: [
        {
          title: 'B.Tech Information Technology',
          period: 'Aug 2019 - May 2023',
          description: 'Generic College Degree',
        },
      ] as TimelineRole[],
    },
  ] as TimelineItem[],
  projects: [
    {
      name: 'Bloom',
      description:
        'An early-literacy platform that helps young students build the foundations of reading with interactive lessons, real-time assessment of how a child actually speaks, and the analytics teachers use to see where a class is heading.',
      highlights: [
        'Built the product across the stack, developing interactive learning activities, authentication, administration, and student analytics.',
        'Built authoring and content management flows that let administrators create and manage lessons, activities, and learning content without engineering involvement.',
        'Built student activity-tracing infrastructure to capture student interactions and surface learning insights for teachers.',
        'Built audio management and ASR evaluation through Cobalt for verbal activities, enabling real-time assessment of student speech and pronunciation.',
        'Worked on application performance, reliability, and beta readiness as the platform progressed toward wider adoption.',
      ],
      technologies: ['TypeScript', 'React.js', 'Node.js', 'MongoDB', 'Nx', 'AWS'],
      url: 'https://wearelit.org/bloom/',
      logoUrl: '/projects/optimized/bloom.webp',
    },
    {
      name: 'WorkHero',
      description:
        'An AI-powered back-office platform for HVAC businesses. I built an evaluation framework for agents that scored the action the agent took against a rubric and measured the accuracy.',
      highlights: [
        'Developed LLM evaluation workflows to test and compare AI behaviour across different prompts, workflows, and use cases.',
        'Built an AI testing agent that evaluates LLM outputs against a predefined rubric, measuring response accuracy, consistency, and adherence to expected behaviour.',
      ],
      technologies: ['TypeScript', 'React.js', 'Node.js', 'MongoDB', 'Nx'],
      url: 'https://www.workhero.pro/',
      logoUrl: '/projects/optimized/workhero.webp',
    },
    {
      name: 'Agentic ERP',
      description:
        'An ERP platform where AI agents run the work across Sales, Hiring and People Management. I built the hiring side of it, from ai-powered resume screening to a new type of agentic coding evaluation system all built into a custom ATS',
      highlights: [
        'Worked on the hiring module, building workflows for candidate screening, assessment, evaluation, and recruitment.',
        'Developed an AI-powered resume evaluation and candidate-job matchmaking system to identify suitable candidates for open roles.',
        "Built an AI-powered coding assessment evaluator that analyses Claude Code session logs to assess candidates' agentic coding abilities against customisable rubrics and job-specific evaluation signals.",
        'Built a functional ATS with job boards, job creation, application tracking, and related integrations.',
      ],
      technologies: [
        'TypeScript',
        'React.js',
        'NestJS',
        'Node.js',
        'Mastra',
        'PostgreSQL',
        'pgvector',
      ],
    },
    {
      name: '52wknds',
      description:
        'A travel membership that turns every weekend into a getaway, built on curated calendars, flights and stays. Built an agent agent that researches and assembles an entire year of destinations and travel calendars on its own.',
      highlights: [
        'Built an AI-powered travel calendar agent that autonomously researches events, creates and enriches destinations, assigns contextual windows, sources images, and generates complete yearly calendars through a multi-step tool-use workflow.',
        'Developed an LLM-powered hotel classification system that analyses reviews, property details, and facilities to categorise hotels into structured vibe types using confidence-scored evaluation rubrics.',
      ],
      technologies: [
        'TypeScript',
        'React Native (Expo)',
        'Fastify',
        'PostgreSQL',
        'PostGIS',
      ],
      url: 'https://storiilabs.com/',
      logoUrl: '/projects/optimized/52wknds.webp',
    },
    {
      name: 'Memory Soda',
      description:
        'A memory layer that gives AI agents context that survives the conversation. Working, episodic and semantic memory behind a single retrieval call, plus a dashboard for watching an agent’s memory change over time.',
      highlights: [
        'Designed and built a three-tier memory architecture combining working memory for active conversations, episodic memory for past interactions, and semantic memory for long-term facts and relationships.',
        'Built hybrid memory retrieval using pgvector similarity search and recency-based scoring, allowing agents to retrieve relevant context.',
        'Used LLMs for conversation summarisation, embeddings, knowledge extraction, and resolving conflicting information, with memory processing handled asynchronously in the background.',
        'Built a developer dashboard and interactive playground to inspect and debug how an agent’s memory changes over time.',
        'Developed a TypeScript SDK that lets agents retrieve relevant context through a single interface.',
      ],
      technologies: [
        'TypeScript',
        'Node.js',
        'React.js',
        'PostgreSQL',
        'pgvector',
        'Nx',
      ],
      url: 'https://github.com/alagappan17/memory-soda',
      displayUrl: 'github.com',
      logoUrl: '/projects/optimized/memory-soda.webp',
    },
    {
      name: 'HierBridge',
      description:
        'A Voice of Employee platform for feedback and workplace concerns, built from the ground up. This project was a part of Carnegie Mellon’s Project Olympus Program and Founder University Cohort 10.',
      highlights: [
        'Built the product from the ground up, working across product development, architecture, and implementation.',
        'Built core product capabilities like feedback and case management along with administrative workflows for managing employees and organisational content.',
        'Worked directly with prospective users to conduct market research, understand business requirements, validate product ideas, and iterate on the product based on feedback.',
        "Selected for Carnegie Mellon University's Project Olympus program and Founder University Cohort 10.",
      ],
      technologies: ['TypeScript', 'React.js', 'Node.js', 'MongoDB', 'AWS'],
      url: 'https://hierbridge.com/',
      logoUrl: '/projects/optimized/hierbridge.svg',
    },
  ] as Project[],
  artworks: [
    {
      name: 'Sentinel',
      url: '/artworks/optimized/sentinel-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CRgsf7fjqtB/',
    },
    {
      name: 'OnePlus Buds Pro Factory',
      url: '/artworks/optimized/oneplus-buds-pro-factory-480.mp4',
      type: 'video',
      aspectRatio: '9:16',
      instagramUrl: 'https://www.instagram.com/skidrrow/reel/CdLZZ8mJNpC/',
    },
    {
      name: 'Halloween',
      url: '/artworks/optimized/halloween-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CkYvQnDS2mG/',
    },
    {
      name: 'Corvette Animation',
      url: 'https://www.youtube.com/watch?v=C8w634aTQnU',
      type: 'youtube',
      aspectRatio: '16:9',
      instagramUrl: 'https://www.youtube.com/watch?v=C8w634aTQnU',
    },
    {
      name: 'Makeshift Realities V06',
      url: '/artworks/optimized/makeshift-realities-V06-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CR_rK6iKcxt/',
    },
    {
      name: 'Street Jutsu',
      url: '/artworks/optimized/street-jutsu-480.mp4',
      type: 'video',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/p/CsoR0DlhBp-/',
    },
    {
      name: 'Apocalypse',
      url: '/artworks/optimized/apocalypse-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQ_XRRuDPxh/',
    },
    {
      name: 'OnePlus SAP Reel',
      url: '/artworks/optimized/oneplus-sap-submission-480.mp4',
      type: 'video',
      aspectRatio: '9:16',
      instagramUrl: 'https://www.instagram.com/skidrrow/reel/CSs3BhIKYJv/',
    },
    {
      name: 'Voyage',
      url: '/artworks/optimized/voyage-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQs-rg5jbUG/',
    },
    {
      name: 'Makeshift Realities V12',
      url: '/artworks/optimized/makeshift-realities-V12-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CSRdaoUgoGx/',
    },
    {
      name: 'The Basketball Court',
      url: '/artworks/optimized/the-basketball-court-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQQpBwuD_UU/',
    },
    {
      name: 'Test Subjects',
      url: '/artworks/optimized/test-subjects-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CRv8RW5gDFx/',
    },
    {
      name: 'OnePlus Logo Factory',
      url: '/artworks/optimized/oneplus-logo-factory-480.mp4',
      type: 'video',
      aspectRatio: '9:16',
      instagramUrl: 'https://www.instagram.com/skidrrow/reel/CXyHvj9DuAJ/',
    },
    {
      name: 'Crash Site',
      url: '/artworks/optimized/crash-site-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CROenX7DOfR/',
    },
    {
      name: 'Makeshift Realities V13',
      url: '/artworks/optimized/makeshift-realities-V13-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CSUdVTcqY7k/',
    },
    {
      name: 'To the Roof',
      url: '/artworks/optimized/to-the-roof-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQTPM_IjCZn/',
    },
    {
      name: 'Makeshift Realities V03',
      url: '/artworks/optimized/makeshift-realities-v03-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CR4B8cFjGAn',
    },
    {
      name: 'The Lawn',
      url: '/artworks/optimized/the-lawn-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQLPFrwjvfH/',
    },
    {
      name: 'Xerxes Codex Lore',
      url: 'https://www.youtube.com/watch?v=Mfx5LFkKPYg',
      type: 'youtube',
      aspectRatio: '16:9',
      instagramUrl: 'https://www.youtube.com/watch?v=Mfx5LFkKPYg',
    },
    {
      name: 'Odyssey',
      url: '/artworks/optimized/odyssey-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQyObjJjAXb/',
    },
    {
      name: 'OnePlus Mixtape',
      url: '/artworks/optimized/oneplus-mixtape-480.mp4',
      type: 'video',
      aspectRatio: '9:16',
      instagramUrl: 'https://www.instagram.com/p/C22OjOsJydq/',
    },
    {
      name: 'Hike',
      url: '/artworks/optimized/hike-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQ0zBNvjvDP/',
    },
    {
      name: 'Cloudy Sharks',
      url: '/artworks/optimized/coloudy-sharks-02-480.mp4',
      type: 'video',
      aspectRatio: '9:16',
      instagramUrl:
        'https://www.instagram.com/cloudysharks.in/reel/C3-cQ2kyQDD/',
    },
    {
      name: 'Makeshift Realities V04',
      url: '/artworks/optimized/makeshift-realities-v04-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/p/CR6mFGpDZlp/',
    },
    {
      name: 'Xerxes Codex',
      url: '/artworks/optimized/xerxes-codex-480.mp4',
      type: 'video',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/reel/CZ4IaY5qV3A/',
    },
    {
      name: 'Isolated',
      url: '/artworks/optimized/isolated-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQ3b2lwj4W1/',
    },
    {
      name: 'Test Subjects',
      url: '/artworks/optimized/test-subjects-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CRv8RW5gDFx/',
    },
    {
      name: 'Makeshift Realities V05',
      url: '/artworks/optimized/makeshift-realities-V05-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CR9SQwrq_uc/',
    },
    {
      name: 'Witching Hour',
      url: '/artworks/optimized/witching-hour-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CRUG-fmjEmC/',
    },
    {
      name: 'Riverside',
      url: '/artworks/optimized/riverside-480.mp4',
      type: 'video',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/p/CQbciohDSg9/',
    },
    {
      name: 'Nightlife',
      url: '/artworks/optimized/nightlife-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQdmqOLD4_W/',
    },
    {
      name: 'Solitude',
      url: '/artworks/optimized/solitude-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CREVZE1jWwr/',
    },
    {
      name: 'Arcade',
      url: '/artworks/optimized/arcade-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQvk_e7DH2k/',
    },
    {
      name: 'Makeshift Realities V02',
      url: '/artworks/optimized/makeshift-realities-v02-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CR1Q5HJDJtb/',
    },
    {
      name: 'Heaven',
      url: '/artworks/optimized/heaven-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CPKguSYswOe/',
    },
    {
      name: 'Bury A Jumper',
      url: '/artworks/optimized/bury-a-jumper-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/p/CIXRFkwlsiR/',
    },
    {
      name: 'Prince Charming',
      url: '/artworks/optimized/prince-charming-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CP0cURTD_Zy/',
    },
    {
      name: 'Commute',
      url: '/artworks/optimized/commute-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/p/CReC8PTDBWs/',
    },
    {
      name: 'Doromichi',
      url: '/artworks/optimized/doromichi-min.webp',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQgMj6ZDam_/',
    },
    {
      name: 'Cloudy Sharks',
      url: '/artworks/optimized/cloudy-sharks-01-480.mp4',
      type: 'video',
      aspectRatio: '9:16',
      instagramUrl:
        'https://www.instagram.com/cloudysharks.in/reel/CwvBkpDycO6/',
    },
  ] as Artwork[],
  lifestyle: [
    {
      id: 'lifestyle-2',
      url: '/lifestyle/optimized/002.webp',
      caption: '',
      interest: 'Open Ears Forum',
      rotation: 8,
    },
    {
      id: 'lifestyle-3',
      url: '/lifestyle/optimized/009.webp',
      caption: '',
      interest: 'Frappuccino',
      rotation: -6,
    },
    {
      id: 'lifestyle-4',
      url: '/lifestyle/optimized/004.webp',
      caption: '',
      interest: '1+ Community Meetup',
      rotation: 6,
    },
    {
      id: 'lifestyle-5',
      url: '/lifestyle/optimized/005.webp',
      caption: '',
      interest: 'Darjeeling',
      rotation: -8,
    },
    {
      id: 'lifestyle-6',
      url: '/lifestyle/optimized/006.webp',
      caption: '',
      interest: 'Nathula Pass',
      rotation: 10,
    },
    {
      id: 'lifestyle-7',
      url: '/lifestyle/optimized/007.webp',
      caption: '',
      interest: 'Bangkok',
      rotation: -7,
    },
    {
      id: 'lifestyle-9',
      url: '/lifestyle/optimized/003.webp',
      caption: '',
      interest: 'Ramen',
      rotation: -12,
    },
    {
      id: 'lifestyle-11',
      url: '/lifestyle/optimized/011.webp',
      caption: '',
      interest: 'Sikkim',
      rotation: -9,
    },
    {
      id: 'lifestyle-12',
      url: '/lifestyle/optimized/019.webp',
      caption: '',
      interest: 'Dawki',
      rotation: -8,
    },
    {
      id: 'lifestyle-13',
      url: '/lifestyle/optimized/013.webp',
      caption: '',
      interest: 'Meghalaya',
      rotation: -4,
    },
    {
      id: 'lifestyle-14',
      url: '/lifestyle/optimized/014.webp',
      caption: '',
      interest: 'Kickboxing',
      rotation: 8,
    },
    {
      id: 'lifestyle-17',
      url: '/lifestyle/optimized/016.webp',
      caption: '',
      interest: 'Kudremukh',
      rotation: 7,
    },
    {
      id: 'lifestyle-18',
      url: '/lifestyle/optimized/015.webp',
      caption: '',
      interest: 'GDG Build with AI',
      rotation: -6,
    },
    {
      id: 'lifestyle-17-img',
      url: '/lifestyle/optimized/017.webp',
      caption: '',
      interest: 'Pondicherry',
      rotation: -5,
    },
    {
      id: 'lifestyle-19',
      url: '/lifestyle/optimized/012.webp',
      caption: '',
      interest: 'Gokarna',
      rotation: 5,
    },
  ] as LifestyleItem[],
}

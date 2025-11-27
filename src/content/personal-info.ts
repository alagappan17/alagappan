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
  url?: string
  image?: string
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
    { name: 'React', logoUrl: 'https://cdn.simpleicons.org/react/61DAFB' },
    {
      name: 'TypeScript',
      logoUrl: 'https://cdn.simpleicons.org/typescript/3178C6',
    },
    {
      name: 'Node.js',
      logoUrl: 'https://cdn.simpleicons.org/nodedotjs/339933',
    },
    { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB' },
    {
      name: 'PostgreSQL',
      logoUrl: 'https://cdn.simpleicons.org/postgresql/4169E1',
    },
    { name: 'AWS', logoUrl: '/stack/AWS.png' },
    { name: 'Docker', logoUrl: '/stack/Docker.png' },
    { name: 'Git', logoUrl: 'https://cdn.simpleicons.org/git/F05032' },
    {
      name: 'JavaScript',
      logoUrl: 'https://cdn.simpleicons.org/javascript/F7DF1E',
    },
    {
      name: 'Tailwind CSS',
      logoUrl: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
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
      logoUrl: '/experience/procedure.jpeg',
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
      logoUrl: '/experience/tansam.jpg',
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
      logoUrl: '/experience/oneplus.png',
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
      logoUrl: '/experience/svce.png',
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
      name: 'HierBridge',
      description:
        'Leading the development of an employee-experience platform that tackles lost feedback within organisations. I handle all of the product and engineering work along with technical assistance. Built the MVP from scratch.',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      url: 'https://www.hierbridge.com',
    },
    {
      name: 'Bloom',
      description:
        "Building an early-literacy ed-tech platform end-to-end to help young students become better readers. I've been involved from the very beginning, developing core features, making the product MVP-ready, and supporting multiple integrations within the app.",
      technologies: ['React', 'TypeScript', 'Node.js'],
      url: 'https://wearelit.org/bloom/',
    },
    {
      name: 'WorkHero',
      description:
        'Built an AI testing framework that evaluates model responses against preset test data. I designed a testing agent that scores outcomes based on a rubric, helping the team measure accuracy, consistency, and reliability across prompts and scenarios.',
      technologies: ['Python', 'TypeScript', 'AI/ML'],
      url: 'https://www.workhero.pro/',
    },
  ] as Project[],
  artworks: [
    {
      name: 'Sentinel',
      url: '/artworks/sentinel-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CRgsf7fjqtB/',
    },
    {
      name: 'OnePlus Buds Pro Factory',
      url: '/artworks/oneplus-buds-pro-factory.mp4',
      type: 'video',
      aspectRatio: '9:16',
      instagramUrl: 'https://www.instagram.com/skidrrow/reel/CdLZZ8mJNpC/',
    },
    {
      name: 'Halloween',
      url: '/artworks/halloween-min.jpeg',
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
      url: '/artworks/makeshift-realities-V06-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CR_rK6iKcxt/',
    },
    {
      name: 'Street Jutsu',
      url: '/artworks/street-jutsu.mp4',
      type: 'video',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/p/CsoR0DlhBp-/',
    },
    {
      name: 'Apocalypse',
      url: '/artworks/apocalypse-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQ_XRRuDPxh/',
    },
    {
      name: 'OnePlus SAP Reel',
      url: '/artworks/oneplus-sap-submission.mp4',
      type: 'video',
      aspectRatio: '9:16',
      instagramUrl: 'https://www.instagram.com/skidrrow/reel/CSs3BhIKYJv/',
    },
    {
      name: 'Voyage',
      url: '/artworks/voyage-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQs-rg5jbUG/',
    },
    {
      name: 'Makeshift Realities V12',
      url: '/artworks/makeshift-realities-V12-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CSRdaoUgoGx/',
    },
    {
      name: 'The Basketball Court',
      url: '/artworks/the-basketball-court-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQQpBwuD_UU/',
    },
    {
      name: 'Test Subjects',
      url: '/artworks/test-subjects-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CRv8RW5gDFx/',
    },
    {
      name: 'OnePlus Logo Factory',
      url: '/artworks/oneplus-logo-factory.mp4',
      type: 'video',
      aspectRatio: '9:16',
      instagramUrl: 'https://www.instagram.com/skidrrow/reel/CXyHvj9DuAJ/',
    },
    {
      name: 'Crash Site',
      url: '/artworks/crash-site-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CROenX7DOfR/',
    },
    {
      name: 'Makeshift Realities V13',
      url: '/artworks/makeshift-realities-V13-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CSUdVTcqY7k/',
    },
    {
      name: 'To the Roof',
      url: '/artworks/to-the-roof-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQTPM_IjCZn/',
    },
    {
      name: 'Makeshift Realities V03',
      url: '/artworks/makeshift-realities-v03-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CR4B8cFjGAn',
    },
    {
      name: 'The Lawn',
      url: '/artworks/the-lawn-min.jpeg',
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
      url: '/artworks/odyssey-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQyObjJjAXb/',
    },
    {
      name: 'OnePlus Mixtape',
      url: '/artworks/oneplus-mixtape.mp4',
      type: 'video',
      aspectRatio: '9:16',
      instagramUrl: 'https://www.instagram.com/p/C22OjOsJydq/',
    },
    {
      name: 'Hike',
      url: '/artworks/hike-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQ0zBNvjvDP/',
    },
    {
      name: 'Cloudy Sharks',
      url: '/artworks/coloudy-sharks-02.mp4',
      type: 'video',
      aspectRatio: '9:16',
      instagramUrl:
        'https://www.instagram.com/cloudysharks.in/reel/C3-cQ2kyQDD/',
    },
    {
      name: 'Makeshift Realities V04',
      url: '/artworks/makeshift-realities-v04-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/p/CR6mFGpDZlp/',
    },
    {
      name: 'Xerxes Codex',
      url: '/artworks/xerxes-codex.mp4',
      type: 'video',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/reel/CZ4IaY5qV3A/',
    },
    {
      name: 'Isolated',
      url: '/artworks/isolated-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQ3b2lwj4W1/',
    },
    {
      name: 'Test Subjects',
      url: '/artworks/test-subjects-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CRv8RW5gDFx/',
    },
    {
      name: 'Makeshift Realities V05',
      url: '/artworks/makeshift-realities-V05-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CR9SQwrq_uc/',
    },
    {
      name: 'Witching Hour',
      url: '/artworks/witching-hour-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CRUG-fmjEmC/',
    },
    {
      name: 'Riverside',
      url: '/artworks/riverside.mp4',
      type: 'video',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/p/CQbciohDSg9/',
    },
    {
      name: 'Nightlife',
      url: '/artworks/nightlife-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQdmqOLD4_W/',
    },
    {
      name: 'Solitude',
      url: '/artworks/solitude-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CREVZE1jWwr/',
    },
    {
      name: 'Arcade',
      url: '/artworks/arcade-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQvk_e7DH2k/',
    },
    {
      name: 'Makeshift Realities V02',
      url: '/artworks/makeshift-realities-v02-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CR1Q5HJDJtb/',
    },
    {
      name: 'Heaven',
      url: '/artworks/heaven-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CPKguSYswOe/',
    },
    {
      name: 'Bury A Jumper',
      url: '/artworks/bury-a-jumper-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/p/CIXRFkwlsiR/',
    },
    {
      name: 'Prince Charming',
      url: '/artworks/prince-charming-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CP0cURTD_Zy/',
    },
    {
      name: 'Commute',
      url: '/artworks/commute-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/p/CReC8PTDBWs/',
    },
    {
      name: 'Doromichi',
      url: '/artworks/doromichi-min.jpeg',
      type: 'image',
      aspectRatio: '3:4',
      instagramUrl: 'https://www.instagram.com/skidrrow/p/CQgMj6ZDam_/',
    },
    {
      name: 'Cloudy Sharks',
      url: '/artworks/cloudy-sharks-01.mp4',
      type: 'video',
      aspectRatio: '9:16',
      instagramUrl:
        'https://www.instagram.com/cloudysharks.in/reel/CwvBkpDycO6/',
    },
  ] as Artwork[],
  lifestyle: [
    {
      id: 'lifestyle-2',
      url: '/lifestyle/002.png',
      caption: '',
      interest: 'Open Ears Forum',
      rotation: 8,
    },
    {
      id: 'lifestyle-3',
      url: '/lifestyle/009.jpg',
      caption: '',
      interest: 'Frappuccino',
      rotation: -6,
    },
    {
      id: 'lifestyle-4',
      url: '/lifestyle/004.jpg',
      caption: '',
      interest: '1+ Community Meetup',
      rotation: 6,
    },
    {
      id: 'lifestyle-5',
      url: '/lifestyle/005.jpg',
      caption: '',
      interest: 'Darjeeling',
      rotation: -8,
    },
    {
      id: 'lifestyle-6',
      url: '/lifestyle/006.png',
      caption: '',
      interest: 'Nathula Pass',
      rotation: 10,
    },
    {
      id: 'lifestyle-7',
      url: '/lifestyle/007.jpg',
      caption: '',
      interest: 'Bangkok',
      rotation: -7,
    },
    {
      id: 'lifestyle-9',
      url: '/lifestyle/003.jpg',
      caption: '',
      interest: 'Ramen',
      rotation: -12,
    },
    {
      id: 'lifestyle-11',
      url: '/lifestyle/011.jpg',
      caption: '',
      interest: 'Sikkim',
      rotation: -9,
    },
    {
      id: 'lifestyle-12',
      url: '/lifestyle/019.jpg',
      caption: '',
      interest: 'Dawki',
      rotation: -8,
    },
    {
      id: 'lifestyle-13',
      url: '/lifestyle/013.png',
      caption: '',
      interest: 'Meghalaya',
      rotation: -4,
    },
    {
      id: 'lifestyle-14',
      url: '/lifestyle/014.jpg',
      caption: '',
      interest: 'Kickboxing',
      rotation: 8,
    },
    {
      id: 'lifestyle-17',
      url: '/lifestyle/016.png',
      caption: '',
      interest: 'Kudremukh',
      rotation: 7,
    },
    {
      id: 'lifestyle-18',
      url: '/lifestyle/015.png',
      caption: '',
      interest: 'GDG Build with AI',
      rotation: -6,
    },
    {
      id: 'lifestyle-17-img',
      url: '/lifestyle/017.jpg',
      caption: '',
      interest: 'Pondicherry',
      rotation: -5,
    },
    {
      id: 'lifestyle-19',
      url: '/lifestyle/012.jpg',
      caption: '',
      interest: 'Gokarna',
      rotation: 5,
    },
  ] as LifestyleItem[],
}

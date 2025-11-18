export interface Link {
  label: string
  href: string
  caption: string
  type: 'link' | 'email'
  email?: string
}

export const personalInfo = {
  name: 'Alagappan N',
  bio: "Hey, I'm a Software Engineer with a foundation rooted in early curiosity for computers and how things work. Over time, I found programming to be the right blend of my creative and logical personas.",
  badge: {
    text: 'Works on my machine',
    status: 'active' as const,
  },
  location: {
    city: 'Hyderabad',
    country: 'India',
  },
  project: {
    name: 'HierBridge',
    description:
      "Right now, I'm building HierBridge, a platform to address disengagement and lost feedback within organisations. You can learn more about it on",
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
}

import { Candidate } from './types';

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 1,
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    phone: '+91-98765-43210',
    score: 92,
    experience: '5 years',
    education: 'IIT Delhi',
    location: 'Bangalore',
    currentRole: 'Senior Developer @ Zomato',
    skills: ['React', 'Node.js', 'Redux', 'MongoDB', 'AWS'],
    strengths: 'Deep React expertise, proven team leadership, strong startup background with high-velocity delivery.',
    gaps: 'Limited TypeScript experience (mentioned as a requirement in JD, but shows quick learning capability).',
    recommendation: 'STRONG MATCH - Schedule Interview immediately.',
    status: 'recommended',
    culturalFit: 95,
    technicalScore: 95,
    experienceScore: 90
  },
  {
    id: 2,
    name: 'Priya Singh',
    email: 'priya.singh@example.com',
    phone: '+91-98765-43211',
    score: 78,
    experience: '3 years',
    education: 'NIT Trichy',
    location: 'Remote',
    currentRole: 'Full Stack Developer @ Paytm',
    skills: ['Python', 'Django', 'React', 'PostgreSQL'],
    strengths: 'Excellent full-stack versatility, strong algorithmic foundation, recent Hackathon winner.',
    gaps: 'Only 2 years in React specifically (JD asks for 3+). Less experience with large-scale distributed systems.',
    recommendation: 'POTENTIAL - Review work samples or GitHub before scheduling.',
    status: 'maybe',
    culturalFit: 88,
    technicalScore: 75,
    experienceScore: 70
  },
  {
    id: 3,
    name: 'Amit Kumar',
    email: 'amit.k@example.com',
    phone: '+91-98765-43212',
    score: 45,
    experience: '1 year',
    education: 'Tier-3 College',
    location: 'Jaipur',
    currentRole: 'Junior Developer @ Local Agency',
    skills: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    strengths: 'Eager to learn, good communication skills, strong eye for detail in CSS.',
    gaps: 'Significant gap in modern JS frameworks (React/Vue). Experience level too junior for this Senior role.',
    recommendation: 'REJECT - Does not meet minimum experience requirements.',
    status: 'rejected',
    culturalFit: 60,
    technicalScore: 40,
    experienceScore: 30
  },
  {
    id: 4,
    name: 'Sarah Chen',
    email: 'sarah.c@example.com',
    phone: '+1-555-0123',
    score: 89,
    experience: '6 years',
    education: 'UC Berkeley',
    location: 'San Francisco',
    currentRole: 'Frontend Lead @ TechCorp',
    skills: ['React', 'TypeScript', 'GraphQL', 'Next.js'],
    strengths: 'Perfect tech stack match. Experience scaling frontend architectures.',
    gaps: 'Salary expectations might be above budget range based on current role.',
    recommendation: 'STRONG MATCH - High priority candidate.',
    status: 'recommended',
    culturalFit: 90,
    technicalScore: 92,
    experienceScore: 95
  }
];

export const EMAIL_TEMPLATE = (name: string, role: string, company: string) => `Subject: Interview Opportunity - Frontend Developer Role

Hi ${name.split(' ')[0]},

Thank you for applying to the Frontend Developer role. We were impressed by your experience at ${company || 'your current company'}.

We'd love to schedule a 45-minute technical interview with our Engineering Manager to discuss how your background aligns with our team's goals.

Please select a convenient time slot here:
[Calendly Link Placeholder]

Looking forward to speaking with you!

Best regards,
Recruiting Team`;

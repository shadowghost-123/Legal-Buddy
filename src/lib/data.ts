import laws from '@/assets/laws.json';

export type Law = {
  id: number;
  section_no: string;
  act_name: string;
  category: string;
  punishment: string;
  simple_explanation: string;
  official_text: string;
  keywords: string[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: 'Client' | 'Advocate' | 'Guest';
  language?: string;
}

export const lawArticles: Law[] = laws;

export const categories = [
  'Cybercrime',
  'Harassment',
  'Domestic',
  'Consumer',
  'Property',
  'Theft',
  'Fraud',
  'Others',
];

export const helplines = [
  { name: 'National Emergency Number', number: '112' },
  { name: 'Women Helpline', number: '181' },
  { name: 'Child Helpline', number: '1098' },
  {
    name: 'National Cyber Crime Reporting Portal',
    number: '1930',
    url: 'https://cybercrime.gov.in/',
  },
];

export const ngos = [
  { name: 'Human Rights Law Network', url: 'https://hrln.org/' },
  { name: 'Majlis Legal Centre', url: 'https://majlislegalcentre.org/' },
  { name: 'Lawyers Collective', url: 'http://www.lawyerscollective.org/' },
];

export const templates = [
  {
    id: 'fir',
    name: 'FIR/Complaint',
    description: 'Template for filing a First Information Report or complaint.',
  },
  {
    id: 'rti',
    name: 'RTI Request',
    description: 'Template for filing a Right to Information request.',
  },
  {
    id: 'deposit-notice',
    name: 'Landlord Deposit Notice',
    description:
      'Template for a notice to a landlord regarding security deposit.',
  },
];
    
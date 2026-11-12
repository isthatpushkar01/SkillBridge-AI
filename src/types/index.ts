export type UserRole = 'student' | 'tpo' | 'recruiter' | 'admin' | 'public';

export type AccountStatus = 'pending_email' | 'pending_approval' | 'approved' | 'rejected' | 'suspended';

export interface UserBase {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: AccountStatus;
  avatar?: string;
  createdAt: string;
  rejectionReason?: string;
  internalRemarks?: string;
}

export interface StudentProfile extends UserBase {
  role: 'student';
  college: string;
  university: string;
  state: string;
  city: string;
  course: string;
  branch: string;
  academicYear: string;
  graduationYear: number;
  enrollmentNo: string;
  cgpa: number;
  linkedIn?: string;
  github?: string;
  resumeUrl?: string;
  resumeFileName?: string;
  employabilityScore: number; // 0 - 100
  scoreBreakdown: {
    technical: number; // /30
    communication: number; // /20
    problemSolving: number; // /20
    domainKnowledge: number; // /15
    projectEvidence: number; // /15
  };
  verifiedSkills: Array<{
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    score: number;
    verifiedDate: string;
    proofHash: string;
    category: 'Core' | 'Framework' | 'Cloud' | 'Soft Skill';
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    verified: boolean;
  }>;
  certificates: Array<{
    id: string;
    title: string;
    issuer: string;
    issueDate: string;
    credentialId: string;
    proofHash: string;
  }>;
}

export interface TPOProfile extends UserBase {
  role: 'tpo';
  institutionName: string;
  institutionRegistrationNo: string;
  designation: string;
  department: string;
  collegeWebsite: string;
  collegeAddress: string;
  district: string;
  authorizationDocsUrl?: string;
  institutionTier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  naacAccreditation: string;
  nirfRank?: number;
}

export interface RecruiterProfile extends UserBase {
  role: 'recruiter';
  companyName: string;
  companyWebsite: string;
  industry: string;
  designation: string;
  companyAddress: string;
  hiringDomain: string;
  verificationDocsUrl?: string;
  openDrivesCount: number;
  activeHiringPackages: string;
}

export interface AdminProfile extends UserBase {
  role: 'admin';
  designation: string;
  organization: string;
  adminLevel: 'SuperAdmin' | 'Director' | 'AuditOfficer';
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  recruiterId: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Campus Drive';
  salary: string; // e.g. "8.5 - 12 LPA" or "₹35,000/mo"
  minCgpa: number;
  eligibleBranches: string[];
  eligibleGradYears: number[];
  requiredSkills: string[];
  preferredSkills: string[];
  description: string;
  deadline: string;
  postedDate: string;
  applicantsCount: number;
  hiringDomain: string;
  workMode: 'On-site' | 'Hybrid' | 'Remote';
}

export type ApplicationStage = 
  | 'Received' 
  | 'Under Review' 
  | 'Shortlisted' 
  | 'Interview Scheduled' 
  | 'Selected' 
  | 'Rejected';

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  studentId: string;
  studentName: string;
  studentCollege: string;
  studentBranch: string;
  studentCgpa: number;
  studentEmployabilityScore: number;
  skillMatchPercentage: number;
  hiringProbabilityPercentage: number;
  appliedDate: string;
  stage: ApplicationStage;
  interviewDate?: string;
  interviewFeedback?: string;
  recruiterNotes?: string;
}

export interface ApprovalRequest {
  id: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  applicantRole: 'student' | 'recruiter' | 'tpo';
  organizationOrCollege: string;
  requestedAt: string;
  status: AccountStatus;
  details: Record<string, any>;
  documents: Array<{ name: string; type: string; url?: string }>;
  reviewedBy?: string;
  reviewedAt?: string;
  remarks?: string;
  rejectionReason?: string;
}

export interface MPCollege {
  id: string;
  name: string;
  shortName: string;
  district: string;
  lat: number;
  lng: number;
  tpoName: string;
  tpoEmail: string;
  studentCount: number;
  placementRate: number; // percentage
  topRecruiters: string[];
  status: 'Active' | 'Pending Verification';
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'mcq' | 'coding';
  options?: string[];
  correctAnswer?: number; // index
  explanation?: string;
  starterCode?: string;
  testCases?: Array<{ input: string; expected: string }>;
  points: number;
}

export interface SkillAssessment {
  id: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  totalMarks: number;
  questions: AssessmentQuestion[];
  skillsCovered: string[];
}

export interface MockInterviewSession {
  id: string;
  roleTitle: string;
  difficulty: 'Junior' | 'Mid' | 'Campus Fresher';
  questions: string[];
  userAnswers: string[];
  aiFeedback: Array<{
    score: number;
    clarity: string;
    technicalAccuracy: string;
    strengths: string;
    improvements: string;
  }>;
  overallScore: number;
  date: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  userRole: UserRole;
  targetUser?: string;
  details: string;
  ipAddress: string;
  status: 'SUCCESS' | 'FLAGGED' | 'WARNING';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'approval' | 'job' | 'assessment' | 'system' | 'interview';
  read: boolean;
  link?: string;
}

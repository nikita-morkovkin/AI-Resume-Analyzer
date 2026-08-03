export interface Job {
  title: string;
  description: string;
  location: string;
  requiredSkills: string[];
}

export type TipType = "good" | "improve";

export interface BasicTip {
  type: TipType;
  tip: string;
}

export interface DetailedTip extends BasicTip {
  explanation: string;
}

export interface FeedbackCategory<T> {
  score: number;
  tips: T[];
}

export interface Feedback {
  overallScore: number;
  ATS: FeedbackCategory<BasicTip>;
  toneAndStyle: FeedbackCategory<DetailedTip>;
  content: FeedbackCategory<DetailedTip>;
  structure: FeedbackCategory<DetailedTip>;
  skills: FeedbackCategory<DetailedTip>;
}

export interface Resume {
  id: string;
  companyName?: string;
  jobTitle?: string;
  imagePath: string;
  resumePath: string;
  feedback: Feedback;
}

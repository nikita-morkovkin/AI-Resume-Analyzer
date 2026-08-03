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

export interface CaseAnalysis {
  plaintiff: string[];
  defense: string[];
}

export interface AnalysisResponse {
  plaintiff?: string[];
  defense?: string[];
  error?: string;
} 
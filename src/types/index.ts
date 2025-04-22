export interface CaseAnalysis {
  plaintiff: string[];
  defense: string[];
}

export interface AnalysisResponse {
  error?: string;
  plaintiff?: string[];
  defense?: string[];
} 
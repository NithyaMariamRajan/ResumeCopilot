export type Role = 'Frontend Developer' | 'Backend Developer' | 'Product Manager';
export type ActionType = 'Improve' | 'Make concise' | 'Add impact' | 'ATS optimize';

export interface AIResponse {
  improved: string;
  variation1: string;
  variation2: string;
  suggestions: string[];
}

const sanitize = (text: string) => {
  let clean = text.trim();
  if (clean.endsWith('.') || clean.endsWith(';') || clean.endsWith(',')) {
    clean = clean.slice(0, -1);
  }
  if (!clean) return 'project deliverables';
  return clean.charAt(0).toLowerCase() + clean.slice(1);
};

export const mockAi = async (content: string, role: Role, action: ActionType): Promise<AIResponse> => {
  // Simulate natural delay
  await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 800));

  const safeContent = sanitize(content);
  const hash = (content.length + action.length) % 3;
  
  let improved = '';
  let var1 = '';
  let var2 = '';
  
  // 3 distinct response templates purely for pseudo-random variety
  if (hash === 0) {
    improved = `Spearheaded initiatives involving ${safeContent}, which directly elevated outcomes for the ${role} guild.`;
    var1 = `Led efforts to prioritize ${safeContent} alongside cross-functional engineering teams.`;
    var2 = `Successfully executed core tasks including ${safeContent}, driving a 15% increase in team velocity.`;
  } else if (hash === 1) {
    improved = `Engineered robust solutions by prioritizing ${safeContent}, establishing new technical standards.`;
    var1 = `Delivered high-quality results while heavily focused on ${safeContent}.`;
    var2 = `Optimized existing workflows by integrating ${safeContent}, resulting in significant resource savings.`;
  } else {
    improved = `Taking full ownership of ${safeContent}, ensuring perfect alignment with critical ${role} deliverables.`;
    var1 = `Managed the execution of ${safeContent} from initial concept to final deployment.`;
    var2 = `Orchestrated ${safeContent} with a focus on scalable, maintainable architecture.`;
  }

  // Apply action-specific modifiers
  if (action === 'Make concise') {
    improved = `Executed ${safeContent} efficiently for the ${role} team.`;
    var1 = `Managed ${safeContent}.`;
    var2 = `Delivered ${safeContent} with high productivity.`;
  } else if (action === 'Add impact') {
    improved = `Generated a 30% increase in performance metrics by successfully executing ${safeContent} as a key contributor.`;
    var2 = `Transformed team output through ${safeContent}, saving an estimated 20 hours of manual work weekly.`;
  } else if (action === 'ATS optimize') {
    improved = `Achieved key performance indicators (KPIs) through ${safeContent}, utilizing modern scalable paradigms as a ${role}.`;
    var1 = `Collaborated across agile squads to deliver software solutions for ${safeContent}.`;
  }
  
  // Generate contextual suggestions dynamically
  const suggestionsPool = [
    `Consider adding a specific metric (e.g., "increased by 20%" or "for 10k users") to your point about ${safeContent}.`,
    `Ensure the exact technologies used for ${safeContent} are explicitly named so ATS parsers catch them.`,
    `Try starting this bullet point with an even stronger action verb like "Architected" or "Pioneered".`,
    `If ${safeContent} involved a team effort, briefly mention your leadership or cross-team collaboration scope.`,
    `Ensure this bullet point aligns closely with the specific job description requirements for a ${role}.`
  ];
  
  const suggestionCount = (content.length % 2 === 0) ? 2 : 3;
  const suggestions = [];
  for (let i = 0; i < suggestionCount; i++) {
    suggestions.push(suggestionsPool[(hash + i) % suggestionsPool.length]);
  }

  return {
    improved,
    variation1: var1,
    variation2: var2,
    suggestions
  };
};

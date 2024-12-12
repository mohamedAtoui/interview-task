export type Priority = 'urgent' | 'high' | 'normal' | 'low';
export interface SampleData {
    results: {
        id: number;
        created: string;
        updated: string;
        due: string;
        status: string;
        type: string;
        priority: Priority;
        assignee_id: string;
        subject: string;
        satisfaction_rating: {
            score: string;
        };
        organization_id: string;
        via: {
            channel: string;
            source: {
                from: {
                    name: string;
                    email: string;
                }
            }
        };
        ticket_form_id: string;
    }[];
}

export interface TypeDistribution {
    type: string;
    percentage: string;
}

export interface TypeDistributionPriority {
    priority: string;
    percentage: string;
}

export interface ClosureTimeResponse {
    type: string;
    averageClosureTime: string;
    totalIssues: number;
}

export interface HighPriorityMetrics {
    type: string;
    averageClosureTime: string;
    totalIssues: number;
}

export interface LongestIssueMetrics {
    type: string;
    satisfactionScore: number | null;
    durationHours: string;
}

export interface ServiceDeskResponse {
    highPriorityMetrics: HighPriorityMetrics;
    longestIssueMetrics: LongestIssueMetrics;
}


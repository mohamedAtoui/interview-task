import axios from 'axios';
import { Request, Response } from 'express';
import { SampleData } from './types';

const DATA_URL = 'https://sampleapi.squaredup.com/integrations/v1/service-desk?datapoints=500';

export const GET = async (req: Request, res: Response) => {
    const { data } = await axios.get<SampleData>(DATA_URL);

    const highPriorityIssues = data.results.filter(item =>
        item.priority === 'high' && item.status === 'solved'
    );

    const closureTimes = highPriorityIssues.map(issue => {
        const created = new Date(issue.created);
        const updated = new Date(issue.updated);
        return updated.getTime() - created.getTime();
    });

    const averageTime = closureTimes.reduce((sum, time) => sum + time, 0) / closureTimes.length;
    const averageHours = (averageTime / (1000 * 60 * 60)).toFixed(2);

    const allIssuesWithDuration = data.results.map(issue => {
        const created = new Date(issue.created);
        const updated = new Date(issue.updated);
        return {
            duration: updated.getTime() - created.getTime(),
            satisfactionScore: issue.satisfaction_rating?.score || null
        };
    });

    const longestIssue = allIssuesWithDuration.reduce((longest, current) =>
        current.duration > longest.duration ? current : longest
    );

    res.send({
        highPriorityMetrics: {
            type: 'high_priority',
            averageClosureTime: `${averageHours} hours`,
            totalIssues: highPriorityIssues.length
        },
        longestIssueMetrics: {
            type: 'longest_issue',
            satisfactionScore: longestIssue.satisfactionScore,
            durationHours: (longestIssue.duration / (1000 * 60 * 60)).toFixed(2)
        }
    });
};

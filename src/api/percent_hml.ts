import axios from 'axios';
import { Request, Response } from 'express';
import { SampleData } from './types';

const DATA_URL = 'https://sampleapi.squaredup.com/integrations/v1/service-desk?datapoints=500';

export const GET = async (req: Request, res: Response) => {
    const { data } = await axios.get<SampleData>(DATA_URL);

    // calculate priority distributions
    const priorityDistribution = data.results.reduce((acc: Record<string, number>, item) => {
        acc[item.priority] = (acc[item.priority] || 0) + 1;
        return acc;
    }, {});

    // convert to percentages
    const total = data.results.length;
    const percentages = Object.entries(priorityDistribution).map(([priority, count]) => ({
        priority,
        percentage: ((count / total) * 100).toFixed(2) + '%'
    }));
    res.send(percentages);
};

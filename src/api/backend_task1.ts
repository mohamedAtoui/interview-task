import axios from 'axios';
import { Request, Response } from 'express';
import { SampleData } from './types';

const DATA_URL = 'https://sampleapi.squaredup.com/integrations/v1/service-desk?datapoints=500';

export const GET = async (req: Request, res: Response) => {
    const { data } = await axios.get<SampleData>(DATA_URL);

    const typeDistribution = data.results.reduce((acc: Record<string, number>, item) => {
        if (['problem', 'question', 'task'].includes(item.type)) {
            acc[item.type] = (acc[item.type] || 0) + 1;
        }
        return acc;
    }, {});

    const total = Object.values(typeDistribution).reduce((sum, count) => sum + count, 0);
    const percentages = Object.entries(typeDistribution).map(([type, count]) => ({
        type,
        percentage: ((count / total) * 100).toFixed(2) + '%'
    }));

    res.send(percentages);
};



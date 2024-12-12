import { SampleData, TypeDistribution, TypeDistributionPriority, ServiceDeskResponse, Priority } from "api/types";
import axios from 'axios';
import { useEffect, useState } from "react";

const Data = () => {
    const [data, setData] = useState<SampleData | undefined>(undefined);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            const { data: allData } = await axios.get<SampleData>('/api/data');

            if (mounted) {
                setData(allData)
            }
        }

        fetchData();
        return () => { mounted = false; }
    }, [])

    if (!data) {
        return 'loading data...';
    }

    return (
        <div className='border p-4'>
            <pre className='text-sm'>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

const ServiceDeskIssues = () => {
    const [issues, setIssues] = useState<SampleData['results']>([]);
    const priorityOrder: Record<Priority, number> = {
        urgent: 1,
        high: 2,
        normal: 3,
        low: 4
    };
    useEffect(() => {
        const fetchIssues = async () => {
            const { data } = await axios.get<SampleData>('/api/data');
            const sortedIssues = data.results
                .slice(0, 100)
                .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
            setIssues(sortedIssues);
        };

        fetchIssues();
    }, []);

    return (
        <div className="p-4">
            <h2 className="mb-4 text-2xl font-bold">Service Desk Issues</h2>
            <div className="grid gap-4">
                {issues.map(issue => (
                    <div key={issue.id} className="rounded border p-4 shadow">
                        <div className="flex items-center justify-between">
                            <span className="font-bold">Something</span>
                            <span className={`rounded px-2 py-1 ${
                                issue.priority === 'urgent' ? 'bg-red-500' :
                                issue.priority === 'high' ? 'bg-orange-500' :
                                issue.priority === 'normal' ? 'bg-blue-500' :
                                'bg-gray-500'
                            } text-white`}>
                                {issue.priority}
                            </span>
                        </div>
                        <div className="mt-2 text-gray-600">
                            <p>Type: {issue.type}</p>
                            <p>Status: {issue.status}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BackendTask1 = () => {
    const [data, setData] = useState<TypeDistribution[] | undefined>(undefined);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            const { data: allData } = await axios.get<TypeDistribution[]>('/api/backend_task1');

            if (mounted) {
                setData(allData)
            }
        }

        fetchData();
        return () => { mounted = false; }
    }, [])

    if (!data) {
        return 'loading backend_task1 data...';
    }

    return (
        <div className='mt-4 border p-4'>
            <h2 className='mb-2 text-xl'>Type Distribution</h2>
            {data.map((item) => (
                <div key={item.type} className="flex justify-between">
                    <span>{item.type}</span>
                    <span>{item.percentage}</span>
                </div>
            ))}
        </div>
    )
}

const BackendTask2 = () => {
    const [data, setData] = useState<TypeDistributionPriority[] | undefined>(undefined);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            const { data: allData } = await axios.get<TypeDistributionPriority[]>('/api/backend_task2');

            if (mounted) {
                setData(allData)
            }
        }

        fetchData();
        return () => { mounted = false; }
    }, [])

    if (!data) {
        return 'loading backend_task2 data...';
    }

    return (
        <div className='mt-4 border p-4'>
            <h2 className='mb-2 text-xl'>Type Distribution</h2>
            {data.map((item) => (
                <div key={item.priority} className="flex justify-between">
                    <span>{item.priority}</span>
                    <span>{item.percentage}</span>
                </div>
            ))}
        </div>
    )
}


const BackendTask3 = () => {
    const [data, setData] = useState<ServiceDeskResponse | undefined>(undefined);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            const { data: allData } = await axios.get<ServiceDeskResponse>('/api/backend_task4');

            if (mounted) {
                setData(allData)
            }
        }

        fetchData();
        return () => { mounted = false; }
    }, [])

    if (!data) {
        return 'loading backend_task3 data...';
    }

    return (
        <div className='mt-4 border p-4'>
            <h2 className='mb-2 text-xl'>High Priority Issues Analysis</h2>
            <div className="flex justify-between">
                <span>Average Closure Time</span>
                <span>{data.highPriorityMetrics.averageClosureTime}</span>
            </div>
            <div className="flex justify-between">
                <span>Total High Priority Issues</span>
                <span>{data.highPriorityMetrics.totalIssues}</span>
            </div>
            <h2 className='mb-2 mt-4 text-xl'>Longest Issue Analysis</h2>
            <div className="flex justify-between">
                <span>Satisfaction Score</span>
                <span>{data.longestIssueMetrics.satisfactionScore ?? 'No rating'}</span>
            </div>
            <div className="flex justify-between">
                <span>Duration</span>
                <span>{data.longestIssueMetrics.durationHours} hours</span>
            </div>
        </div>
    )
}

export { Data, BackendTask1, BackendTask2, BackendTask3, ServiceDeskIssues };

import { SampleData, TypeDistributionPriority, ServiceDeskResponse, Priority, TypeDistributionPQT } from "api/types";
import axios from 'axios';
import { useEffect, useState } from "react";




const PercentPQT = () => {
    const [data, setData] = useState<TypeDistributionPQT[] | undefined>(undefined);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            const { data: allData } = await axios.get<TypeDistributionPQT[]>('/api/percent_pqt');

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

const PercentHML = () => {
    const [data, setData] = useState<TypeDistributionPriority[] | undefined>(undefined);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            const { data: allData } = await axios.get<TypeDistributionPriority[]>('/api/percent_hml');

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


const AvgTime = () => {
    const [data, setData] = useState<ServiceDeskResponse | undefined>(undefined);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            const { data: allData } = await axios.get<ServiceDeskResponse>('/api/avg_time');

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

const PrioritizedIssueList = () => {
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
                .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
            setIssues(sortedIssues);
        };

        fetchIssues();
    }, []);

    return (
        <div className="flex h-screen flex-col p-4">
            <h2 className="mb-4 text-2xl font-bold">Service Desk Issues</h2>

            <div className="grid flex-1 gap-4 overflow-y-auto">
                {issues.map(issue => (
                    <div key={issue.id} className="rounded border p-4 shadow">
                        <div className="flex items-center justify-between">
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

const FilteredIssuesList= () => {
    const [issues, setIssues] = useState<SampleData['results']>([]);
    const [showHighPriorityOnly, setShowHighPriorityOnly] = useState(false);
    const [showOpenOnly, setShowOpenOnly] = useState(false);

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
                .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
            setIssues(sortedIssues);
        };
        fetchIssues();
    }, []);

    const filteredIssues = issues.filter(issue => {
        if (showHighPriorityOnly && issue.priority !== 'high') return false;
        if (showOpenOnly && issue.status !== 'open') return false;
        return true;
    });

    return (
        <div className="p-4">
            <h2 className="mb-4 text-2xl font-bold">Service Desk Issues</h2>

            <div className="mb-4 flex gap-4">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={showHighPriorityOnly}
                        onChange={(e) => setShowHighPriorityOnly(e.target.checked)}
                    />
                    High Priority Only
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={showOpenOnly}
                        onChange={(e) => setShowOpenOnly(e.target.checked)}
                    />
                    Open Issues Only
                </label>
            </div>

            <div className="grid gap-4">
                {filteredIssues.map(issue => (
                    <div key={issue.id} className="rounded border p-4 shadow">
                        <div className="flex items-center justify-between">
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


const SearchableIssuesList = () => {
    const [issues, setIssues] = useState<SampleData['results']>([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredIssues = issues.filter(issue =>
        issue.organization_id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            <h2 className="mb-4 text-2xl font-bold">Service Desk Issues</h2>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by organization ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded border p-2"
                />
            </div>

            <div className="grid gap-4">
                {filteredIssues.map(issue => (
                    <div key={issue.id} className="rounded border p-4 shadow">
                        <div className="flex items-center justify-between">
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
                            <p>Organization ID: {issue.organization_id}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export {  PercentPQT, PercentHML , AvgTime, PrioritizedIssueList, FilteredIssuesList,SearchableIssuesList };



/*
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
*/

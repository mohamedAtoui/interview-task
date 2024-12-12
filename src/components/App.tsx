import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
    PrioritizedIssueList,
    FilteredIssuesList,
    SearchableIssuesList,
    PercentHML,
    PercentPQT,
    AvgTime
} from "./Data";

const queryClient = new QueryClient();

function App() {
    const [view, setView] = useState("PrioritizedIssues");

    return (
        <QueryClientProvider client={queryClient}>
            <div className="p-4">
                <h1 className="mb-4 text-3xl">Data Display</h1>

                {/* Navigation Buttons */}
                <div className="mb-4 flex gap-4">
                    <button
                        className={`rounded px-4 py-2 ${
                            view === "PrioritizedIssues" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                        onClick={() => setView("PrioritizedIssues")}
                    >
                        Show Prioritized Issues
                    </button>
                    <button
                        className={`rounded px-4 py-2 ${
                            view === "FilteredIssues" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                        onClick={() => setView("FilteredIssues")}
                    >
                        Show Filtered Issues
                    </button>
                    <button
                        className={`rounded px-4 py-2 ${
                            view === "SearchableIssues" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                        onClick={() => setView("SearchableIssues")}
                    >
                        Show Searchable Issues
                    </button>
                    <button
                        className={`rounded px-4 py-2 ${
                            view === "Stats" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                        onClick={() => setView("Stats")}
                    >
                        Show Stats
                    </button>
                </div>

                {/* Conditional Rendering Based on View */}
                {view === "PrioritizedIssues" && <PrioritizedIssueList />}
                {view === "FilteredIssues" && <FilteredIssuesList />}
                {view === "SearchableIssues" && <SearchableIssuesList />}
                {view === "Stats" && (
                    <div>
                        <PercentHML />
                        <PercentPQT />
                        <AvgTime />
                    </div>
                )}
            </div>
        </QueryClientProvider>
    );
}

export default App;

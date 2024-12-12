import { QueryClient, QueryClientProvider } from "react-query"
import { BackendTask1, BackendTask2, BackendTask3, ServiceDeskIssues } from './Data';

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className='p-4'>
                <h1 className='mb-4 text-3xl'>Data Display</h1>
               <BackendTask1/>
               <BackendTask2/>
               <BackendTask3/>
               <ServiceDeskIssues/>
            </div>
        </QueryClientProvider>
    )
}

export default App

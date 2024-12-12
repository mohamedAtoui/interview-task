import { render, waitFor } from '@testing-library/react';
import App from 'components/App';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { mockData,mockDistributionData, mockPriorityData } from '../mockData';
import { wrapper } from '../utils';



const server = setupServer(
    http.get('/api/data', () => {
        return HttpResponse.json(mockData)
    }),
    http.get('/api/backend_task1', () => {
        return HttpResponse.json(mockDistributionData)
    }),
    http.get('/api/backend_task2', () => {
        return HttpResponse.json(mockPriorityData)
    }),
    http.get('/api/backend_task3', () => {
        return HttpResponse.json(mockPriorityData)
    })

)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('<App />', () => {
    it('should render both Data and Task1 components', async () => {
        const { container } = render(<App />, { wrapper })

        await waitFor(() => {
            expect(container).toHaveTextContent('Data Display')
            expect(container).toHaveTextContent('Type Distribution')
            expect(container).toHaveTextContent('problem')
            expect(container).toHaveTextContent('40.00%')
            expect(container).toHaveTextContent('high')
            expect(container).toHaveTextContent('35.20%')
        })
    })
})

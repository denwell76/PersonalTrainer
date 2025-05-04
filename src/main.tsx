import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Customerlist from './CustomerList'
import Traininglist from './TrainingList'
import CalendarPage from './CalendarPage'
import StatisticsPage from './StatisticsPage.tsx'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <Customerlist />,
        index: true,
      },
      {
        path: "training",
        element: <Traininglist />,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "statistics",
        element: <StatisticsPage />,
      }

    ]
  

  }

])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

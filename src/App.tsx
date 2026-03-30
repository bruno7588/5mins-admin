import { Routes, Route, Navigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import TopNav from './components/TopNav/TopNav'

import YourContent from './pages/your-courses/YourContent'
import YourCourses from './pages/your-courses/YourCourses'
import CreateCourse from './pages/your-courses/CreateCourse'

import People from './pages/people/People'
import UserFields from './pages/people/UserFields'
import Roles from './pages/roles/Roles'

import QBYourContent from './pages/questions-bank/YourContent'

import ScormYourContent from './pages/scorm-content/YourContent'
import ScormCreateCourse from './pages/scorm-content/CreateCourse'

function App() {
  return (
    <>
      <Routes>
        {/* Create Course pages — no TopNav */}
        <Route
          path="/create-course"
          element={
            <div className="app">
              <div className="app-body app-body--no-nav">
                <CreateCourse />
              </div>
            </div>
          }
        />
        <Route
          path="/scorm-content/create-course"
          element={
            <div className="app">
              <div className="app-body app-body--no-nav">
                <ScormCreateCourse />
              </div>
            </div>
          }
        />

        {/* All other pages — with TopNav */}
        <Route
          path="*"
          element={
            <div className="app">
              <TopNav />
              <div className="app-body">
                <Routes>
                  <Route path="/" element={<Navigate to="/content-library" replace />} />
                  <Route path="/content-library" element={<YourContent />} />
                  <Route path="/your-courses" element={<YourCourses />} />
                  <Route path="/people" element={<People />} />
                  <Route path="/user-fields" element={<UserFields />} />
                  <Route path="/roles" element={<Roles />} />
                  <Route path="/questions-bank" element={<QBYourContent />} />
                  <Route path="/scorm-content" element={<ScormYourContent />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
      <Analytics />
    </>
  )
}

export default App

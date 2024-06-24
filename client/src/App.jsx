import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { Footer, Navbar } from "./components";
import {
  About,
  AuthPage,
  Companies,
  CompanyProfile,
  FindJobs,
  JobDetail,
  UploadJob,
  UserProfile,
} from "./pages";
import JobApply from "./pages/job-apply.jsx";
import JobSuccess from "./pages/job-success.jsx";
import Applicants from "./pages/applicants.jsx";
import FindJobsCompany from "./pages/find-jobs-company.jsx";
import SavedJobs from "./pages/savedJobs.jsx";
// import 'bootstrap/dist/css/bootstrap.min.css';

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to='/user-auth' state={{ from: location }} replace />
  );
}

function App() {
  const { user } = useSelector((state) => state.user);

  return (
    <main className='bg-[#f7fdfd]'>
      <Navbar />

      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={<Navigate to={user?.accountType ==="lecturer" ? "/applications":'/find-jobs'} replace={true} />}
          />
          <Route path='/find-jobs' element={<FindJobs />} />
          <Route path='/find-jobs-company/:id' element={<FindJobsCompany />} />
          <Route path='/companies' element={<Companies />} />
          <Route path={"/user-profile/:id?"} element={<UserProfile />} />
          <Route path={"/saved-jobs/:id"} element={<SavedJobs />} />

          <Route path={"/company-profile"} element={<CompanyProfile />} />
          <Route path={"/company-profile/:id"} element={<CompanyProfile />} />
          <Route path={"/upload-job"} element={<UploadJob />} />
          <Route path={"/job-detail/:id"} element={<JobDetail />} />
          <Route path={"/job-detail/:id/apply"} element={<JobApply />} />
          <Route path={"/job-detail-successfully"} element={<JobSuccess />} />
          <Route path={"/applications"} element={<Applicants />} />
        </Route>

        <Route path='/about-us' element={<About />} />
        <Route path='/user-auth' element={<AuthPage />} />
      </Routes>
      {user && <Footer />}
    </main>
  );
}

export default App;

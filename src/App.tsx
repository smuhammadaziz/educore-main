import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';

// landing page

import Home from './pages/LandingPage/Home/home';
import Admin from './pages/Role/Admin/admin';
import Teacher from './pages/Role/Teacher/teacher';
import Student from './pages/Role/Student/student';
import AllCoursesPage from './pages/LandingPage/AllCourses/all';
import OneCoursePage from './pages/LandingPage/OneCourse/one';
import AboutUsPage from './pages/LandingPage/AboutUs/about';

import { jwtDecode } from 'jwt-decode';
import AllUsers from './pages/Dashboard/Admin/Users/users';
import AllTeachersPage from './pages/Dashboard/Admin/Teachers/teachers';
import AllStudentPage from './pages/Dashboard/Admin/Students/student';
import AllCoursesPageAdmin from './pages/Dashboard/Admin/Courses/courses';
import AddNewUserAdmin from './components/Dashboard/Admin/AllUsers/adduser';
import AddNewCourseAdmin from './components/Dashboard/Admin/courses/addcourse';
import AddnewstudentAdmin from './components/Dashboard/Admin/student/addstudent';
import AddnewteacherAdmin from './components/Dashboard/Admin/Teachers/addteacher';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const navigateTo = useNavigate();
  useEffect(() => {
    // Check if token exists in local storage
    const token: any = localStorage.getItem('TOKEN');

    if (!token) {
      navigateTo('/');
    }
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Educore Online Learning Platform" />
              <Home />
            </>
          }
        />
        <Route
          path="/about/us"
          element={
            <>
              <PageTitle title="Educore | About Us" />
              <AboutUsPage />
            </>
          }
        />
        <Route
          path="/all/courses"
          element={
            <>
              <PageTitle title="Educore | All Courses" />
              <AllCoursesPage />
            </>
          }
        />
        <Route
          path="/all/courses/1"
          element={
            <>
              <PageTitle title="Educore | IELTS Course" />
              <OneCoursePage />
            </>
          }
        />
        {/* =============================================================== */}
        {/* =============================================================== */}
        <Route
          path="/dashboard/admin"
          element={
            <>
              <PageTitle title="Educore Dashboard | Main page" />
              <Admin />
            </>
          }
        />
        <Route
          path="/dashboard/teacher"
          element={
            <>
              <PageTitle title="Educore Dashboard | Main page" />
              <Teacher />
            </>
          }
        />
        <Route
          path="/dashboard/student"
          element={
            <>
              <PageTitle title="Educore Dashboard | Main page" />
              <Student />
            </>
          }
        />
        {/* =============================================================== */}
        {/* =============================================================== */}
        {/* ===================ADMIN============================= */}
        <Route
          path="/dashboard/users"
          element={
            <>
              <PageTitle title="Educore Dashboard | Users" />
              <AllUsers />
            </>
          }
        />
        <Route
          path="/dashboard/teachers"
          element={
            <>
              <PageTitle title="Educore Dashboard | Teachers" />
              <AllTeachersPage />
            </>
          }
        />
        <Route
          path="/dashboard/students"
          element={
            <>
              <PageTitle title="Students | Educore Dashboard" />
              <AllStudentPage />
            </>
          }
        />
        <Route
          path="/dashboard/courses"
          element={
            <>
              <PageTitle title="Courses | Educore Dashboard" />
              <AllCoursesPageAdmin />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | Educore" />
              <Profile />
            </>
          }
        />

        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | Educore" />
              <Settings />
            </>
          }
        />
        {/* =============================================================== */}
        {/* =============================================================== */}

        <Route
          path="/dashboard/admin/add/new/user"
          element={
            <>
              <PageTitle title="Educore | Add new user" />
              <AddNewUserAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/admin/add/new/course"
          element={
            <>
              <PageTitle title="Educore | Add new course" />
              <AddNewCourseAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/admin/add/new/student"
          element={
            <>
              <PageTitle title="Educore | Add new student" />
              <AddnewstudentAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/admin/add/new/teacher"
          element={
            <>
              <PageTitle title="Educore | Add new teacher" />
              <AddnewteacherAdmin />
            </>
          }
        />

        {/* =============================================================== */}
        {/* =============================================================== */}

        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Educore" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Educore" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;

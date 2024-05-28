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
import AllGroupsListAdmin from './components/Dashboard/Admin/Groups/groups';
import AllGroupsPageAdmin from './pages/Dashboard/Admin/Groups/groups';
import AddNewGroupAdmin from './components/Dashboard/Admin/Groups/addgroup';
import AllContactPageAdmin from './pages/Dashboard/Admin/Contact/contact';
import AllPaymentPageAdmin from './pages/Dashboard/Admin/Payments/payment';
import AllBlogsPAgeAdmin from './pages/Dashboard/Admin/Blogs/blogs';
import AllCoursesListTeacher from './components/Dashboard/Teacher/Courses/courses';
import AllCoursePageTeacher from './pages/Dashboard/Teacher/Courses/courses';
import AddnewCourseTeacher from './components/Dashboard/Teacher/Courses/addCourse';
import AllGroupsPageTeacher from './pages/Dashboard/Teacher/Groups/groups';
import AddNewGroupTeacher from './components/Dashboard/Teacher/Groups/addGroup';
import AllPaymentPageTeacher from './pages/Dashboard/Teacher/Payment/payment';
import AllStudentPageTeacher from './pages/Dashboard/Teacher/Students/students';
import AllBlogsLanding from './pages/LandingPage/AllBlogs/allBlogs';
import OneBlogPage from './pages/LandingPage/OneBlog/oneblog';
import AddNewBlogAdmin from './components/Dashboard/Admin/Blogs/addBlogs';
import ViewAllCourseStudent from './pages/Dashboard/Student/viewCourses/view';
import ViewAllCoursesListSatStudent from './pages/Dashboard/Student/viewCourses/sat';
import ViewAllCoursesListCambStudent from './pages/Dashboard/Student/viewCourses/camb';
import ViewAllCoursesListieltspageStudent from './pages/Dashboard/Student/viewCourses/ielts';
import ONeContactInfoPageAdmin from './pages/Dashboard/Admin/Contact/oneContact';
import OneTeacherGetAdmin from './components/Dashboard/Admin/Teachers/oneTeacher';
import OneStudentGetAdmin from './components/Dashboard/Admin/student/onestudent';
import OneBlogGetAdmin from './components/Dashboard/Admin/Blogs/oneBlog';
import BuyOneCourseNowStudent from './components/Dashboard/Student/viewCourse/buyone';
import ViewAllPaymentsStudent from './pages/Dashboard/Student/payments/payments';
import AddnewpaymentStudent from './components/Dashboard/Student/payments/addpay';
import OneCourseGetTeacher from './components/Dashboard/Teacher/Courses/oneCourse';
import UseFreeTrialPageStudent from './components/Dashboard/Student/freeTrial/free';
import UseBuyCOurseStudent from './components/Dashboard/Student/freeTrial/buycourse';
import AllGroupViewCourseStudent from './components/Dashboard/Teacher/Groups/allgroups';
import GetMyAllGroupsTeacher from './components/Dashboard/Teacher/Groups/myallgroups';
import GetOneMyGroupsTeacher from './components/Dashboard/Teacher/Groups/myonegroup';
import ShowAllLessonsTeacher from './components/Dashboard/Teacher/Groups/showlessons';
import AddNewLessonForTeacher from './components/Dashboard/Teacher/Groups/addLesson';
import ShowAllHomeworksTeacher from './components/Dashboard/Teacher/Groups/showhomeworks';
import AddNewHomeworkTeacher from './components/Dashboard/Teacher/Groups/addHomework';
import GetAllHomeworksTeacher from './components/Dashboard/Teacher/Homeworks/homework';
import GEtAllLessonsTeacher from './components/Dashboard/Teacher/Lessons/lessons';
import GetAllGroupsFromCourseStudent from './components/Dashboard/Student/freeTrial/gettingAllGroup';
import BuyOneCourseGroupStudent from './components/Dashboard/Student/freeTrial/buycourse';
import GetOnePaymentAdmin from './components/Dashboard/Admin/Payments/onePayment';
import GetMyGroupStudent from './pages/Dashboard/Student/group/mygroup';
import GetMyAllHomeworksStudent from './pages/Dashboard/Student/homework/hw';
import GetAllLessonsStudent from './pages/Dashboard/Student/lesson/lesson';
import ViewAllCoursesIGCSEStudent from './components/Dashboard/Student/viewCourse/igcse';
import ViewAllCourseALEVELStudent from './components/Dashboard/Student/viewCourse/alevel';

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

  const restrictedRoutes = [
    '/dashboard/admin',
    '/dashboard/student',
    '/dashboard/teacher',
  ];

  useEffect(() => {
    const currentPath = window.location.pathname;
    const token: any = localStorage.getItem('TOKEN');

    if (!token && restrictedRoutes.includes(currentPath)) {
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
          path="/all/courses/:course_id"
          element={
            <>
              <PageTitle title="Educore | IELTS Course" />
              <OneCoursePage />
            </>
          }
        />
        <Route
          path="/all/blogs"
          element={
            <>
              <PageTitle title="Educore | Blogs" />
              <AllBlogsLanding />
            </>
          }
        />
        <Route
          path="/all/blogs/:blog_id"
          element={
            <>
              <PageTitle title="Educore | Blogs " />
              <OneBlogPage />
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
        {/* <Route
          path="/dashboard/users"
          element={
            <>
              <PageTitle title="Educore Dashboard | Users" />
              <AllUsers />
            </>
          }
        /> */}
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
          path="/dashboard/groups"
          element={
            <>
              <PageTitle title="Courses | Educore Dashboard" />
              <AllGroupsPageAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/contact"
          element={
            <>
              <PageTitle title="Contact | Educore Dashboard" />
              <AllContactPageAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/contact/:contact_id"
          element={
            <>
              <PageTitle title="Contact | Educore Dashboard" />
              <ONeContactInfoPageAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/payments"
          element={
            <>
              <PageTitle title="Payments | Educore Dashboard" />
              <AllPaymentPageAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/payments/:payment_id"
          element={
            <>
              <PageTitle title="Payments | Educore Dashboard" />
              <GetOnePaymentAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/blogs"
          element={
            <>
              <PageTitle title="Blogs | Educore Dashboard" />
              <AllBlogsPAgeAdmin />
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
        <Route
          path="/dashboard/admin/add/new/group"
          element={
            <>
              <PageTitle title="Educore | Add new group" />
              <AddNewGroupAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/admin/add/new/blog"
          element={
            <>
              <PageTitle title="Educore | Add new blog" />
              <AddNewBlogAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/admin/teacher/:user_id"
          element={
            <>
              <PageTitle title="Educore | One Teacher" />
              <OneTeacherGetAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/admin/student/:user_id"
          element={
            <>
              <PageTitle title="Educore | One Student" />
              <OneStudentGetAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/admin/edit/blog/:blog_id"
          element={
            <>
              <PageTitle title="Educore | One Blog" />
              <OneBlogGetAdmin />
            </>
          }
        />

        {/* =============================================================== */}
        {/* =============================================================== */}
        <Route
          path="/dashboard/teacher/my/courses"
          element={
            <>
              <PageTitle title="My courses | Teacher Dashboard" />
              <AllCoursePageTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/my/groups"
          element={
            <>
              <PageTitle title="My groups | Teacher Dashboard" />
              <AllGroupsPageTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/my/all/groups"
          element={
            <>
              <PageTitle title="My all groups | Teacher Dashboard" />
              <GetMyAllGroupsTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/my/all/groups/:group_id"
          element={
            <>
              <PageTitle title="Group | Teacher Dashboard" />
              <GetOneMyGroupsTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/my/all/groups/show/lessons/:group_id"
          element={
            <>
              <PageTitle title="All lessons | Teacher Dashboard" />
              <ShowAllLessonsTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/my/all/groups/show/homeworks/:group_id"
          element={
            <>
              <PageTitle title="All homeworks | Teacher Dashboard" />
              <ShowAllHomeworksTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/add/new/lesson/:group_id"
          element={
            <>
              <PageTitle title="Add lessons | Teacher Dashboard" />
              <AddNewLessonForTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/add/new/homework/:group_id"
          element={
            <>
              <PageTitle title="Add homeworks | Teacher Dashboard" />
              <AddNewHomeworkTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/my/all/homeworks"
          element={
            <>
              <PageTitle title="All homeworks | Teacher Dashboard" />
              <GetAllHomeworksTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/my/all/lessons"
          element={
            <>
              <PageTitle title="All lessons | Teacher Dashboard" />
              <GEtAllLessonsTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/my/payments"
          element={
            <>
              <PageTitle title="Payments | Teacher Dashboard" />
              <AllPaymentPageTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/my/students"
          element={
            <>
              <PageTitle title="My Students | Teacher Dashboard" />
              <AllStudentPageTeacher />
            </>
          }
        />
        {/* =============================================================== */}
        {/* =============================================================== */}
        <Route
          path="/dashboard/teacher/add/new/course"
          element={
            <>
              <PageTitle title="Educore | Add new course" />
              <AddnewCourseTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/add/new/groups/:course_id"
          element={
            <>
              <PageTitle title="Educore | Add new groups" />
              <AddNewGroupTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/course/:course_id"
          element={
            <>
              <PageTitle title="Educore | course" />
              <OneCourseGetTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/group/:course_id"
          element={
            <>
              <PageTitle title="Educore | course" />
              <AllGroupViewCourseStudent />
            </>
          }
        />
        {/* =============================================================== */}
        {/* =============================================================== */}
        <Route
          path="/dashboard/student/courses"
          element={
            <>
              <PageTitle title="Educore | All Courses list" />
              <ViewAllCourseStudent />
            </>
          }
        />
        <Route
          path="/dashboard/student/view/SAT"
          element={
            <>
              <PageTitle title="Educore | All Courses list" />
              <ViewAllCoursesListSatStudent />
            </>
          }
        />
        <Route
          path="/dashboard/student/view/IELTS"
          element={
            <>
              <PageTitle title="Educore | All Courses list" />
              <ViewAllCoursesListieltspageStudent />
            </>
          }
        />
        <Route
          path="/dashboard/student/view/AS/A-LEVELS"
          element={
            <>
              <PageTitle title="Educore | All Courses list" />
              <ViewAllCourseALEVELStudent />
            </>
          }
        />
        <Route
          path="/dashboard/student/view/IGCSE"
          element={
            <>
              <PageTitle title="Educore | All Courses list" />
              <ViewAllCoursesIGCSEStudent />
            </>
          }
        />
        <Route
          path="/dashboard/student/courses/:course_id"
          element={
            <>
              <PageTitle title="Educore | OneCourse" />
              <BuyOneCourseNowStudent />
            </>
          }
        />
        <Route
          path="/dashboard/student/payments/"
          element={
            <>
              <PageTitle title="Educore | payments" />
              <ViewAllPaymentsStudent />
            </>
          }
        />
        <Route
          path="/dashboard/student/courses/buy/:course_id"
          element={
            <>
              <PageTitle title="Educore | Buy Now" />
              <GetAllGroupsFromCourseStudent />
            </>
          }
        />
        <Route
          path="/dashboard/student/courses/buy/:course_id/:group_id"
          element={
            <>
              <PageTitle title="Educore | Buy Now" />
              <BuyOneCourseGroupStudent />
            </>
          }
        />
        <Route
          path="/dashboard/student/courses/use/free/:course_id"
          element={
            <>
              <PageTitle title="Educore | Use Free Trial" />
              <UseFreeTrialPageStudent />
            </>
          }
        />
        <Route
          path="/dashboard/student/groups"
          element={
            <>
              <PageTitle title="Educore | All groups list" />
              <GetMyGroupStudent />
            </>
          }
        />
        <Route
          path="/dashboard/student/homeworks"
          element={
            <>
              <PageTitle title="Educore | All homeworks list" />
              <GetMyAllHomeworksStudent />
            </>
          }
        />
        <Route
          path="/dashboard/student/lessons"
          element={
            <>
              <PageTitle title="Educore | All lessons list" />
              <GetAllLessonsStudent />
            </>
          }
        />
        {/* =============================================================== */}
        {/* =============================================================== */}
        <Route
          path="/dashboard/student/add/new/payment"
          element={
            <>
              <PageTitle title="Educore | payment" />
              <AddnewpaymentStudent />
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

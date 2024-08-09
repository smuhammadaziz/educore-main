import { useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';

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
import UseFreeTrialSessionForStudent from './components/Dashboard/Student/freeTrial/usefreetrial';
import AdminSettings from './pages/Role/Admin/settings';
import StudentSettings from './pages/Role/Student/settings';
import TeacherSettings from './pages/Role/Teacher/settings';
import ProfileStudent from './pages/Role/Student/profile';
import ProfileTeacher from './pages/Role/Teacher/profile';
import ProfileAdmin from './pages/Role/Admin/profile';
import AllStudentListTeacher from './components/Dashboard/Teacher/Students/students';
import AllStudentsListTeachers from './components/Dashboard/Teacher/Students/allStudents';
import AllInfoStudentTeacher from './components/Dashboard/Teacher/Students/allStudents';
import OneStudentGetTeacherPage from './components/Dashboard/Teacher/Students/oneStudent';
import CodeEntry from './pages/Authentication/Code';
import AllCompanyPageAdmin from './pages/Dashboard/Admin/Company/company';
import AddingCompanyAdmin from './components/Dashboard/Admin/Companies/addCompany';
import OneCompanyGetAdmin from './components/Dashboard/Admin/Companies/oneCompany';
import CompanySelectTeacherCreateAdmin from './components/Dashboard/Admin/Teachers/companyTeacher';
import AllCompanyCourseLanding from './components/LandingPage/Partner/allCompanyCourse';
import GetOneLessonTeacher from './components/Dashboard/Teacher/Lessons/oneLesson';
import GetOneHomeworkTeacher from './components/Dashboard/Teacher/Homeworks/oneHomework';
import EditCourseTeacher from './components/Dashboard/Teacher/Courses/editCourse';
import GetGroupsForLessonTeacher from './components/Dashboard/Teacher/Lessons/allGroupLesson';
import GetGroupsForHomeworkTeacher from './components/Dashboard/Teacher/Homeworks/allGroupsHw';
import MarathonAdmin from './components/Dashboard/Admin/Marafon/marathon';
import AddingMarathonAdmin from './components/Dashboard/Admin/Marafon/addMarathon';
import OneMarathonAdmin from './components/Dashboard/Admin/Marafon/oneMarathon';
import AllMarathonTeacher from './components/Dashboard/Teacher/Marathon/marathon';
import AllLessonMarathonTeacher from './components/Dashboard/Teacher/Marathon/lessons';
import AddLessonMarathonTeacher from './components/Dashboard/Teacher/Marathon/addLesson';
import OneMarathonLessonTeacher from './components/Dashboard/Teacher/Marathon/oneLesson';
import AllMarathonStudent from './components/Dashboard/Student/marathon/marathon';
import OneMarathonStudent from './components/Dashboard/Student/marathon/oneMarathon';
import OneMarathonLessonStudent from './components/Dashboard/Student/marathon/oneLesson';
import EditMarathonLessonTeacher from './components/Dashboard/Teacher/Marathon/editLesson';
import InboxForTeachers from './components/Dashboard/Teacher/Inbox/inbox';
import OneInboxForTeacher from './components/Dashboard/Teacher/Inbox/oneInbox';
import TeacherPasswordChange from './pages/Role/Teacher/password';
import StudentPasswordChange from './pages/Role/Student/password';
import QuizForStudents from './components/Dashboard/Student/quiz/quiz';
import QuizForStudentsBusiness from './components/Dashboard/Student/quiz/business';
import AllQuizAdmin from './components/Dashboard/Admin/Quiz/quiz';
import QuizForBiologyStudent from './components/Dashboard/Student/quiz/biology';
import QuizForChemistryStudent from './components/Dashboard/Student/quiz/chemistry';
import QuizForEconomicsStudent from './components/Dashboard/Student/quiz/ecomomics';
import QuizForPHYSICSStudent from './components/Dashboard/Student/quiz/physics';
import QuizForMathStudent from './components/Dashboard/Student/quiz/math';
import AllCourseTeacherLanding from './components/LandingPage/Partner/allCoursesTeacher';
import AllPartnersLandingPage from './components/LandingPage/Partner/allPartners';
import NotFoundPage from './pages/404page/404page';
import { Replace } from 'lucide-react';
import CRMforSodiqAcademyDashboardHome from './pages/Crm/crm';
import AllTeachersSodiqAcademy from './components/Crm/teacher/teachers';
import AllStudentsSodiq from './components/Crm/students/students';
import SelectCompanyPageSodiq from './components/Crm/teacher/company';
import AddNewTeacherForSodiq from './components/Crm/teacher/addTeacher';
import AllStudentsSodiqAcademy from './components/Crm/students/allStudent';
import AllCoursesSodiq from './components/Crm/courses/course';
import AllCoursesSodiqAcademy from './components/Crm/courses/allCourse';
import AllNotificationsSodiq from './components/Crm/notification/notif';
import UpdateTeacherSodiq from './components/Crm/teacher/updateTeacher';
import GetOneNOtificationsSodiq from './components/Crm/notification/oneNotif';
import OneTeacherInfoSodiqAcademy from './components/Crm/teacher/oneTeacher';
import OneTeachersCourseInfoSodiqAcademy from './components/Crm/teacher/oneTeacherCourse';
import OneCourseInfoPageSodiqAcademy from './components/Crm/courses/oneCourse';
import SodiqAcademySettings from './pages/Crm/settings';
import SodiqAcademyPasswordChange from './pages/Crm/password';
import ComeBackSoonPage from './pages/Soon/soon';

interface DecodedToken {
  role: string;
}

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 555);
  }, []);

  const navigateTo = useNavigate();

  const restrictedPaths: { [key: string]: string[] } = {
    teacher: ['/dashboard/admin', '/dashboard/student'],
    student: ['/dashboard/teacher', '/dashboard/admin'],
    admin: ['/dashboard/teacher', '/dashboard/student'],
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    const token = localStorage.getItem('TOKEN');

    if (!token) {
      <Navigate to="/" replace />;
    }

    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);
      const role = decodedToken.role;

      if (restrictedPaths[role]?.includes(currentPath)) {
        navigateTo('/notfound');
      }
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
              <ComeBackSoonPage />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <PageTitle title="Educore | Not Found" />
              <NotFoundPage />
            </>
          }
        />
        <Route
          path="/notfound"
          element={
            <>
              <PageTitle title="Educore | Not Found" />
              <NotFoundPage />
            </>
          }
        />
        {/* <Route
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
              <PageTitle title="Educore | Course" />
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
        <Route
          path="/partners/:idname"
          element={
            <>
              <PageTitle title="Educore | Partners " />
              <AllCompanyCourseLanding />
            </>
          }
        />
        <Route
          path="/all/courses/teacher/:user_id"
          element={
            <>
              <PageTitle title="Educore | Courses " />
              <AllCourseTeacherLanding />
            </>
          }
        />
        <Route
          path="/partners"
          element={
            <>
              <PageTitle title="Educore | Partners " />
              <AllPartnersLandingPage />
            </>
          }
        /> */}
        {/* =============================================================== */}
        {/* =============================================================== */}
        {/* <Route
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
        /> */}
        {/* =============================================================== */}
        {/* =============================================================== */}
        {/* ===================ADMIN============================= */}
        {/* <Route
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
          path="/dashboard/companies"
          element={
            <>
              <PageTitle title="Companies | Educore Dashboard" />
              <AllCompanyPageAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/admin/companies/add"
          element={
            <>
              <PageTitle title="Companies | Educore Dashboard" />
              <AddingCompanyAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/admin/edit/company/:company_id"
          element={
            <>
              <PageTitle title="Companies | Educore Dashboard" />
              <OneCompanyGetAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/marathon"
          element={
            <>
              <PageTitle title="Marathon | Educore Dashboard" />
              <MarathonAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/admin/add/new/marathon"
          element={
            <>
              <PageTitle title="Marathon | Educore Dashboard" />
              <AddingMarathonAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/admin/edit/marathon/:maraphone_id"
          element={
            <>
              <PageTitle title="Marathon | Educore Dashboard" />
              <OneMarathonAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/quiz"
          element={
            <>
              <PageTitle title="Quiz | Educore Dashboard" />
              <AllQuizAdmin />
            </>
          }
        /> */}
        {/* =============================================================== */}
        {/* =============================================================== */}

        {/* <Route
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
              <CompanySelectTeacherCreateAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/admin/add/new/teacher/:company_id"
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
        /> */}

        {/* =============================================================== */}
        {/* =============================================================== */}
        {/* <Route
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
              <GetGroupsForHomeworkTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/my/all/homeworks/:group_id"
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
              <GetGroupsForLessonTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/my/all/lessons/:group_id"
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
        <Route
          path="/dashboard/teacher/marathon"
          element={
            <>
              <PageTitle title="Marathon | Teacher Dashboard" />
              <AllMarathonTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/add/lesson/:maraphone_id"
          element={
            <>
              <PageTitle title="Marathon | Teacher Dashboard" />
              <AllLessonMarathonTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/add/new/marathon/lesson/:maraphone_id"
          element={
            <>
              <PageTitle title="Marathon | Teacher Dashboard" />
              <AddLessonMarathonTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/marathon/lesson/:maraphone_id/:maraphonel_id"
          element={
            <>
              <PageTitle title="Marathon | Teacher Dashboard" />
              <OneMarathonLessonTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/marathon/edit/:maraphonel_id"
          element={
            <>
              <PageTitle title="Marathon | Teacher Dashboard" />
              <EditMarathonLessonTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/inbox"
          element={
            <>
              <PageTitle title="Inbox | Teacher Dashboard" />
              <InboxForTeachers />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/inbox/:notef_id"
          element={
            <>
              <PageTitle title="Inbox | Teacher Dashboard" />
              <OneInboxForTeacher />
            </>
          }
        /> */}
        {/* =============================================================== */}
        {/* =============================================================== */}
        {/* <Route
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
        <Route
          path="/dashboard/teacher/group/students/:group_id"
          element={
            <>
              <PageTitle title="Educore | Students " />
              <AllInfoStudentTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/group/student/id/:group_id"
          element={
            <>
              <PageTitle title="Educore | Group " />
              <OneStudentGetTeacherPage />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/lesson/:lesson_id"
          element={
            <>
              <PageTitle title="Educore | Lesson " />
              <GetOneLessonTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/homework/:homework_id"
          element={
            <>
              <PageTitle title="Educore | Homework " />
              <GetOneHomeworkTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/edit/course/:course_id"
          element={
            <>
              <PageTitle title="Educore | Course " />
              <EditCourseTeacher />
            </>
          }
        /> */}
        {/* =============================================================== */}
        {/* =============================================================== */}
        {/* <Route
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
          path="/dashboard/student/courses/use/free-trial/:course_id/:group_id"
          element={
            <>
              <PageTitle title="Educore | Use Free Trial" />
              <UseFreeTrialSessionForStudent />
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
        <Route
          path="/dashboard/student/marathon"
          element={
            <>
              <PageTitle title="Educore | Marathon" />
              <AllMarathonStudent />
            </>
          }
        />
        <Route
          path="/dashboard/student/view/marathon/:maraphone_id"
          element={
            <>
              <PageTitle title="Educore | Marathon" />
              <OneMarathonStudent />
            </>
          }
        />
        <Route
          path="/dashboard/student/marathon/lesson/:maraphonel_id"
          element={
            <>
              <PageTitle title="Educore | Marathon" />
              <OneMarathonLessonStudent />
            </>
          }
        /> */}
        {/* =============================================================== */}
        {/* =============================================================== */}
        {/* <Route
          path="/dashboard/student/quiz"
          element={
            <>
              <PageTitle title="Educore | Quiz" />
              <QuizForStudents />
            </>
          }
        />
        <Route
          path="/dashboard/student/quiz/business"
          element={
            <>
              <PageTitle title="Educore | Quiz" />
              <QuizForStudentsBusiness />
            </>
          }
        />
        <Route
          path="/dashboard/student/quiz/biology"
          element={
            <>
              <PageTitle title="Educore | Quiz" />
              <QuizForBiologyStudent />
            </>
          }
        />
        <Route
          path="/dashboard/student/quiz/chemistry"
          element={
            <>
              <PageTitle title="Educore | Quiz" />
              <QuizForChemistryStudent />
            </>
          }
        />
        <Route
          path="/dashboard/student/quiz/economics"
          element={
            <>
              <PageTitle title="Educore | Quiz" />
              <QuizForEconomicsStudent />
            </>
          }
        />
        <Route
          path="/dashboard/student/quiz/physics"
          element={
            <>
              <PageTitle title="Educore | Quiz" />
              <QuizForPHYSICSStudent />
            </>
          }
        />
        <Route
          path="/dashboard/student/quiz/math"
          element={
            <>
              <PageTitle title="Educore | Quiz" />
              <QuizForMathStudent />
            </>
          }
        /> */}
        {/* =============================================================== */}
        {/* =============================================================== */}
        {/* <Route
          path="/dashboard/student/add/new/payment"
          element={
            <>
              <PageTitle title="Educore | payment" />
              <AddnewpaymentStudent />
            </>
          }
        /> */}
        {/* =============================================================== */}
        {/* =============================================================== */}

        {/* <Route
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
        <Route
          path="/auth/code/entry"
          element={
            <>
              <PageTitle title="Signup | Educore" />
              <CodeEntry />
            </>
          }
        /> */}
        {/* =============================================================== */}
        {/* =============================================================== */}
        {/* <Route
          path="/dashboard/admin/settings/:profile_id"
          element={
            <>
              <PageTitle title="Settings | Educore" />
              <AdminSettings />
            </>
          }
        />
        <Route
          path="/dashboard/student/settings/:profile_id"
          element={
            <>
              <PageTitle title="Settings | Educore" />
              <StudentSettings />
            </>
          }
        />
        <Route
          path="/dashboard/teacher/settings/:profile_id"
          element={
            <>
              <PageTitle title="Settings | Educore" />
              <TeacherSettings />
            </>
          }
        /> */}
        {/* =============================================================== */}
        {/* =============================================================== */}
        {/* <Route
          path="/dashboard/teacher/profile/:profile_id"
          element={
            <>
              <PageTitle title="Profile | Educore" />
              <ProfileTeacher />
            </>
          }
        />
        <Route
          path="/dashboard/admin/profile/:profile_id"
          element={
            <>
              <PageTitle title="Profile | Educore" />
              <ProfileAdmin />
            </>
          }
        />
        <Route
          path="/dashboard/student/profile/:profile_id"
          element={
            <>
              <PageTitle title="Profile | Educore" />
              <ProfileStudent />
            </>
          }
        /> */}
        {/* =============================================================== */}
        {/* =============================================================== */}
        {/* <Route
          path="/dashboard/teacher/change/password/:profile_id"
          element={
            <>
              <PageTitle title="Profile | Educore" />
              <TeacherPasswordChange />
            </>
          }
        />
        <Route
          path="/dashboard/student/change/password/:profile_id"
          element={
            <>
              <PageTitle title="Profile | Educore" />
              <StudentPasswordChange />
            </>
          }
        /> */}
        {/* =============================================================== */}
        {/* =============================================================== */}
        {/* =============================================================== */}
        {/* <Route
          path="/dashboard/home/sodiq-academy"
          element={
            <>
              <PageTitle title="Home | Sodiq Academy" />
              <CRMforSodiqAcademyDashboardHome />
            </>
          }
        />
        <Route
          path="/dashboard/sodiq-academy/teachers"
          element={
            <>
              <PageTitle title="Teachers | Sodiq Academy" />
              <AllTeachersSodiqAcademy />
            </>
          }
        />
        <Route
          path="/dashboard/sodiq-academy/teacher/add/:company_id"
          element={
            <>
              <PageTitle title="Teachers | Sodiq Academy" />
              <AddNewTeacherForSodiq />
            </>
          }
        />
        <Route
          path="/dashboard/sodiq-academy/teacher/update/:user_id"
          element={
            <>
              <PageTitle title="Teachers | Sodiq Academy" />
              <UpdateTeacherSodiq />
            </>
          }
        />
        <Route
          path="/dashboard/sodiq-academy/teacher/:user_id"
          element={
            <>
              <PageTitle title="Teachers | Sodiq Academy" />
              <OneTeacherInfoSodiqAcademy />
            </>
          }
        />
        <Route
          path="/dashboard/sodiq-academy/teacher/courses/:user_id"
          element={
            <>
              <PageTitle title="Teachers | Sodiq Academy" />
              <OneTeachersCourseInfoSodiqAcademy />
            </>
          }
        />
        <Route
          path="/dashboard/sodiq-academy/students"
          element={
            <>
              <PageTitle title="Students | Sodiq Academy" />
              <AllStudentsSodiqAcademy />
            </>
          }
        />
        <Route
          path="/dashboard/sodiq-academy/courses"
          element={
            <>
              <PageTitle title="Courses | Sodiq Academy" />
              <AllCoursesSodiqAcademy />
            </>
          }
        />
        <Route
          path="/dashboard/sodiq-academy/course/get/:course_id"
          element={
            <>
              <PageTitle title="Courses | Sodiq Academy" />
              <OneCourseInfoPageSodiqAcademy />
            </>
          }
        />
        <Route
          path="/dashboard/sodiq-academy/notifications"
          element={
            <>
              <PageTitle title="Notifications | Sodiq Academy" />
              <AllNotificationsSodiq />
            </>
          }
        />
        <Route
          path="/dashboard/sodiq-academy/notifications/:notef_id"
          element={
            <>
              <PageTitle title="Notifications | Sodiq Academy" />
              <GetOneNOtificationsSodiq />
            </>
          }
        />
        <Route
          path="/dashboard/sodiq-academy/settings/:user_id"
          element={
            <>
              <PageTitle title="Settings | Sodiq Academy" />
              <SodiqAcademySettings />
            </>
          }
        />
        <Route
          path="/dashboard/sodiq-academy/change/password/:user_id"
          element={
            <>
              <PageTitle title="Settings | Sodiq Academy" />
              <SodiqAcademyPasswordChange />
            </>
          }
        /> */}
      </Routes>
    </>
  );
}

export default App;

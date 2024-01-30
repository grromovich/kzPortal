import { Home } from "./app/pages/Home/Home";
import { Main } from "./app/pages/Main/Main"
import { AdminInfo } from "./app/pages/Admin/AdminInfo"
import { Between } from "./app/pages/Between/Between"
const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: "/between",
    element: <Between />
  },
  {
      path: "/main",
      element: <Main />
  },
{
  path: "/admininfo",
  element: <AdminInfo />
},
];

export default AppRoutes;

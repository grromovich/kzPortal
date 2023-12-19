import { Home } from "./app/pages/Home/Home";
import { Main } from "./app/pages/Main/Main"
import { AdminHome } from "./app/pages/AdminHome/AdminHome"
import { Admin } from "./app/pages/Admin/Admin"
const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
      path: "/main",
      element: <Main />
  },
  {
    path: "/admin",
    element: <AdminHome />
},
{
  path: "/admininfo",
  element: <Admin />
},
];

export default AppRoutes;

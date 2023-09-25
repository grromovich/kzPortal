import { Home } from "./app/pages/Home/Home";
import { Main } from "./app/pages/Main/Main"
const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
      path: "/main",
      element: <Main />
  }
];

export default AppRoutes;

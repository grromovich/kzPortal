import { Home } from "./components/Home";
import { Phone } from "./components/Phone"
import { Portal } from "./components/Portal"
const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
        path: "/phone",
        element: <Phone />
  },
  {
      path: "/portal",
      element: <Portal />
  }
];

export default AppRoutes;

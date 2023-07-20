import { Fila } from "./components/Fila";
import { Tabela } from "./components/Tabela";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/fila',
    element: <Fila />
  },
  {
    path: '/tabela',
    element: <Tabela />
  }
];

export default AppRoutes;

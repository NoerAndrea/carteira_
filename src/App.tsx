import { Provider } from "react-redux";
import { store } from "./store";
import { AppRoutes } from "./routes/AppRoutes";

export function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import MainRoutes from "./routes/_TempMainRoutes";
import "./App.css";

const App = () => {
  return (
    <UserProvider>
      <ThemeProvider>
        <MainRoutes />
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;

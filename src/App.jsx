import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import MainRoutes from "./Routes/MainRoutes";
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

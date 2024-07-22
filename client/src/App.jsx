import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { SnackbarProvider } from "notistack";
import { Route, Routes } from "react-router-dom";
import Admin from "./routes/Admin";
import Interface from "./routes/Interface";
import User from "./routes/User";
import Employer from "./routes/Employer";
import Footer from "./pages/Footer";

function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <Routes>
          <Route path="/*" element={<Admin />} />
          <Route path="/user/*" element={<User />} />
          <Route path="/employer/*" element={<Employer />} />
          <Route path="/" element={<Interface />} />
        </Routes>
      </SnackbarProvider>
    </div>
  );
}

export default App;

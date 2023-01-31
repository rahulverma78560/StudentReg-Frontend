import "./App.css";
import Header from "./components/header";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

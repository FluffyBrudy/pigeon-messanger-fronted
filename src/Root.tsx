import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";

const Root = () => {
  return (
    <div className="h-screen flex flex-col box-border">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;

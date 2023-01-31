import { useRoutes } from "react-router-dom";
import React from "react";
import ListStudents from "../screens/listStudent";
import StudentReg from "../screens/studentReg";

const AppRoutes = () => {
  const studentList = {
    path: "/",
    element: <ListStudents />,
  };
  const regStudent = {
    path: "regStudent",
    element: <StudentReg />,
  };
  const router = useRoutes([studentList, regStudent]);

  return router;
};

export default AppRoutes;

import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudentAction, fetchStudentAction } from "../actions/regActions";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { MoonLoader } from "react-spinners";
import "./listStudent.css";

const ListStudents = () => {
  const [page, setPage] = useState(0),
    [rowsPerPage, setRowsPerPage] = useState(10),
    [rows, setRow] = useState([]),
    [loading, setLoading] = useState(true),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    listStud = useSelector((state) => state.fetchStudent.items),
    columns = [
      { id: "studentName", label: "Student Name", minWidth: 150 },
      { id: "email", label: "Email", minWidth: 100 },
      {
        id: "PhNum",
        label: "Phone Number",
        minWidth: 130,
        align: "right",
      },
      {
        id: "RegDate",
        label: "Registration Date",
        minWidth: 130,
        align: "right",
      },
      {
        id: "gender",
        label: "Gender",
        minWidth: 130,
        align: "right",
      },
      {
        id: "regNumber",
        label: "Register Number",
        minWidth: 130,
        align: "right",
      },
      {
        id: "nationality",
        label: "Nationality",
        minWidth: 130,
        align: "right",
      },
      {
        id: "delete",
        label: "Delete",
        minWidth: 70,
        align: "right",
      },
    ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchStudentAction());
  }, [dispatch]);

  const createData = (
    _id,
    studentName,
    email,
    PhNum,
    RegDate,
    gender,
    regNumber,
    nationality
  ) => {
    return {
      _id,
      studentName,
      email,
      PhNum,
      RegDate,
      gender,
      regNumber,
      nationality,
    };
  };

  useEffect(() => {
    setLoading(listStud.loading);
    if (listStud && listStud.length) {
      let students = [];
      setLoading(false);
      listStud.forEach((data) => {
        students.push(
          createData(
            data._id,
            data.name,
            data.email,
            data.phNo,
            data.regDate,
            data.gender,
            data.regNumber,
            data.nationality
          )
        );
      });
      setRow(students);
    }
  }, [listStud]);

  const deleteStudent = (studentDt) => {
    Swal.fire({
      title: `Do you want to delete ${studentDt.studentName}'s record ?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const studentData = rows.filter((stud) => studentDt._id !== stud._id);
        setRow(studentData);
        dispatch(deleteStudentAction(studentDt._id));
        Swal.fire("SUCCESS", "Deleted Successfully", "success");
      }
    });
  };

  return (
    <>
      <Button
        startIcon={<AddBoxIcon />}
        style={{ margin: "20px", float: "right", backgroundColor: "#370041" }}
        variant='contained'
        onClick={() => navigate("/regStudent")}
      >
        Register Student
      </Button>
      <Grid container direction='column' alignItems='center' justify='center'>
        <Paper
          sx={{
            width: "97.5%",
            overflow: "hidden",
          }}
        >
          <TableContainer sx={{ maxHeight: 700 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: "#6A1B76",
                        color: "#fff",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role='checkbox'
                        tabIndex={-1}
                        key={row._id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "delete" ? (
                                <Grid item xs={8}>
                                  <DeleteIcon
                                    style={{ color: "red", cursor: "pointer" }}
                                    onClick={() => deleteStudent(row)}
                                  />
                                </Grid>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {!rows.length && (
            <MoonLoader
              color='#6A1B76'
              loading={loading}
              size={100}
              id='loader'
            />
          )}

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </>
  );
};

export default ListStudents;

import React, { useEffect, useState } from "react";
import FormContainer from "../components/formContainer";
import {
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./studentReg.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudent, regStudentAction } from "../actions/regActions";
import { useNavigate } from "react-router-dom";
import { REG_STUDENT_RESET } from "../actions/types";

const StudentReg = () => {
  const dispatch = useDispatch(),
    regStud = useSelector((state) => state.regStudent),
    [firstName, setFirstName] = useState(""),
    [validFirstName, setValidFirstName] = useState(false),
    [middleName, setMiddleName] = useState(""),
    [lastName, setLastName] = useState(""),
    [validLastName, setValidLastName] = useState(false),
    [phoneNumber, setPhoneNumber] = useState(""),
    [validPhoneNumber, setValidPhoneNumber] = useState(false),
    [email, setEmail] = useState(""),
    [validEmail, setValidEmail] = useState(false),
    [regNumber, setRegNumber] = useState(""),
    [regDate, setRegDate] = useState(""),
    [validRegDate, setValidRegDate] = useState(false),
    [gender, setGender] = useState(""),
    [validGender, setValidGender] = useState(false),
    [nationality, setNationality] = useState(""),
    [dob, setDob] = useState(""),
    navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(fetchStudent());
  // }, [dispatch]);

  useEffect(() => {
    if (regStud.items.code === 201) {
      console.log(regStud.items.code);
      navigate("/");
      dispatch({ type: REG_STUDENT_RESET });
    }
    console.log(regStud);
  }, [regStud]);

  const regStudent = () => {
    if (!firstName) {
      setValidFirstName(true);
    }
    if (!lastName) {
      setValidLastName(true);
    }
    if (!phoneNumber) {
      setValidPhoneNumber(true);
    }
    if (!email) {
      setValidEmail(true);
    }
    if (!regDate) {
      setValidRegDate(true);
    }
    if (!gender) {
      setValidGender(true);
    }
    if (
      firstName &&
      lastName &&
      email &&
      phoneNumber &&
      email &&
      regDate &&
      gender
    ) {
      dispatch(
        regStudentAction({
          name: `${firstName} ${middleName} ${lastName}`,
          email: email,
          phNo: phoneNumber,
          regNumber: regNumber,
          dob: dob,
        })
      );
    }
  };

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justify='center'
      style={{ minHeight: "100vh" }}
    >
      <Card
        sx={{
          minWidth: "70%",
          maxWidth: "70%",
          margin: "30px",
          padding: "20px",
        }}
      >
        <h1 className='header'>Student Registration</h1>
        <FormContainer>
          <form>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                required
                error={validFirstName}
                helperText={validFirstName ? "Please enter first name" : ""}
                sx={{ m: 2, width: "60vh" }}
                label='First Name'
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (e.target.value.trim()) {
                    setValidFirstName(false);
                  } else {
                    setValidFirstName(true);
                  }
                }}
              />
              <TextField
                sx={{ m: 2, width: "60vh" }}
                label='Middle Name'
                onChange={(e) => {
                  setMiddleName(e.target.value);
                }}
              />
              <TextField
                required
                sx={{ m: 2, width: "60vh" }}
                error={validLastName}
                helperText={validLastName ? "Please enter last name" : ""}
                label='Last Name'
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (e.target.value.trim()) {
                    setValidLastName(false);
                  } else {
                    setValidLastName(true);
                  }
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                required
                sx={{ m: 2, width: "80vh" }}
                label='Phone Number'
                error={validPhoneNumber}
                helperText={
                  validPhoneNumber ? "Please enter a valid phone number" : ""
                }
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (e.target.value.trim()) {
                    e.target.value.trim().length < 10
                      ? setValidPhoneNumber(true)
                      : setValidPhoneNumber(false);
                    if (isNaN(Number(e.target.value.trim()))) {
                      setValidPhoneNumber(true);
                    }
                  } else {
                    setValidPhoneNumber(true);
                  }
                }}
              />
              <TextField
                required
                error={validEmail}
                helperText={validEmail ? "Please enter a valid Email" : ""}
                type='email'
                sx={{ m: 2, width: "80vh" }}
                label='Email'
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value.trim()) {
                    new RegExp(
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                    ).test(e.target.value.trim())
                      ? setValidEmail(false)
                      : setValidEmail(true);
                  } else {
                    setValidEmail(true);
                  }
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                sx={{ m: 2, width: "80vh" }}
                label='Registration Number'
                onChange={(e) => {
                  setRegNumber(e.target.value);
                }}
              />
              <TextField
                required
                id='date'
                error={validRegDate}
                label='Registration Date'
                helperText={validRegDate ? "Please provide valid Date" : ""}
                type='date'
                sx={{ m: 2, width: "80vh" }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setRegDate(e.target.value);
                  if (e.target.value.trim()) {
                    setValidRegDate(false);
                  } else {
                    setValidRegDate(true);
                  }
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <FormControl
                required
                sx={{ m: 2, width: "60vh" }}
                error={validGender}
              >
                <InputLabel id='demo-simple-select-helper-label'>
                  Gender
                </InputLabel>
                <Select
                  labelId='demo-simple-select-helper-label'
                  value={gender}
                  label='Gender'
                  onChange={(e) => {
                    setGender(e.target.value);
                    if (e.target.value) {
                      setValidGender(false);
                    } else {
                      setValidGender(true);
                    }
                  }}
                >
                  <MenuItem value={10}>Male</MenuItem>
                  <MenuItem value={20}>Female</MenuItem>
                  <MenuItem value={30}>Transgender</MenuItem>
                </Select>
                <FormHelperText>
                  {validGender ? "Please select gender" : ""}
                </FormHelperText>
              </FormControl>
              <FormControl sx={{ m: 2, width: "60vh" }}>
                <InputLabel id='demo-simple-select-helper-label'>
                  Nationality
                </InputLabel>
                <Select
                  labelId='demo-simple-select-helper-label'
                  value={nationality}
                  label='Nationality'
                  onChange={(e) => {
                    setNationality(e.target.value);
                  }}
                >
                  <MenuItem value={10}>Indian</MenuItem>
                  <MenuItem value={20}>American</MenuItem>
                  <MenuItem value={30}>German</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id='date'
                label='Date of Birth'
                type='date'
                sx={{ m: 2, width: "80vh" }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setDob(e.target.value);
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                // type='submit'
                variant='contained'
                color='success'
                onClick={regStudent}
              >
                Submit
              </Button>
            </div>
          </form>
        </FormContainer>
      </Card>
    </Grid>
  );
};

export default StudentReg;

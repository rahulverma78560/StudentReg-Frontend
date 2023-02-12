import React, { useEffect, useState } from "react";
import FormContainer from "../components/formContainer";
import {
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
import { regStudentAction } from "../actions/regActions";
import { useNavigate } from "react-router-dom";
import { REG_STUDENT_RESET } from "../actions/types";
import Swal from "sweetalert2";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";

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
    navigate = useNavigate(),
    [btnValue, setBtnValue] = useState("Submit"),
    [loading, setLoading] = useState(false);

  useEffect(() => {
    if (regStud.items.code === 201) {
      setBtnValue("Submit");
      setLoading(false);
      Swal.fire("SUCCESS", regStud.items.message, "success").then((res) => {
        if (res.isConfirmed) {
          navigate("/");
        }
      });
      dispatch({ type: REG_STUDENT_RESET });
    }
  }, [dispatch, navigate, regStud]);

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
      Swal.fire({
        title: "Do you want to submit the details?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          setBtnValue("Processing");
          setLoading(true);
          dispatch(
            regStudentAction({
              _id: Math.floor(Math.random() * 0xffffff * 1000000).toString(16),
              name: `${firstName} ${middleName} ${lastName}`,
              email: email,
              phNo: phoneNumber,
              regNumber: regNumber ? regNumber : "-NA-",
              dob: dob ? dob : "-NA-",
              gender: gender,
              regDate: regDate,
              nationality: nationality ? nationality : "-NA-",
            })
          );
        } else if (result.isDenied) {
          setLoading(false);
          setBtnValue("Submit");
          Swal.fire("Changes are not saved", "", "info");
        }
      });
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
        <h1 className='header' style={{ color: "#6A1B76" }}>
          Student Registration
        </h1>
        <FormContainer>
          <form>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 3, sm: 3, md: 3 }}
              sx={{ m: 2 }}
            >
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  fullWidth
                  required
                  error={validFirstName}
                  helperText={validFirstName ? "Please enter first name" : ""}
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
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  fullWidth
                  label='Middle Name'
                  onChange={(e) => {
                    setMiddleName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  fullWidth
                  required
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
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 3, sm: 6, md: 6 }}
              sx={{ m: 2 }}
            >
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  required
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
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  required
                  error={validEmail}
                  helperText={validEmail ? "Please enter a valid Email" : ""}
                  type='email'
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
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 3, sm: 6, md: 6 }}
              sx={{ m: 2 }}
            >
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  label='Registration Number'
                  onChange={(e) => {
                    setRegNumber(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  required
                  id='date'
                  error={validRegDate}
                  label='Registration Date'
                  helperText={validRegDate ? "Please provide valid Date" : ""}
                  type='date'
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
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 3, sm: 3, md: 3 }}
              sx={{ m: 2 }}
            >
              <Grid item xs={12} sm={4} md={4}>
                <FormControl required fullWidth error={validGender}>
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
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Transgender"}>Transgender</MenuItem>
                  </Select>
                  <FormHelperText>
                    {validGender ? "Please select gender" : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth>
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
                    <MenuItem value={"Indian"}>Indian</MenuItem>
                    <MenuItem value={"American"}>American</MenuItem>
                    <MenuItem value={"German"}>German</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  id='date'
                  label='Date of Birth'
                  type='date'
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <LoadingButton
                style={!loading ? { backgroundColor: "#370041 " } : {}}
                onClick={regStudent}
                loading={loading}
                loadingPosition='start'
                startIcon={<SaveIcon />}
                variant='contained'
              >
                {btnValue}
              </LoadingButton>
            </div>
          </form>
        </FormContainer>
      </Card>
    </Grid>
  );
};

export default StudentReg;

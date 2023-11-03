import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";

export default function Student() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [students, setStudents] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    const student = { name, surname, email, address, mobile };
    console.log(student);
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("Student added");
    });
  };
  useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);
  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1>Add Student</h1>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Surname"
            variant="outlined"
            fullWidth
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Mobile"
            variant="outlined"
            fullWidth
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <Button variant="contained" onClick={handleClick}>
            Submit
          </Button>
        </Box>
      </Paper>
      <Paper elevation={3} style={paperStyle}>
        {students.map((student) => (
          <Paper
            elevation={3}
            style={{ margin: "10px", padding: "15px", textAlign: "left" }}
            key={student.id}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body1">Id:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">{student.id}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">Name:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">{student.name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">surname:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">{student.surname}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">Address:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">{student.address}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">Mobile:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">{student.mobile}</Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchAllUser } from "../feature/user/userSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  avatar: "",
};
const UserTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user.userData);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(initialState);

  function handleChange(e) {
    const value = e.target.value;
    setUserData({
      ...userData,
      [e.target.name]: value,
    });
  }

  const handleClose = () => {
    setError(false);
    setUserData(initialState);
    setModalOpen(false);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const onSave = () => {
    if (
      userData.email.length &&
      userData.first_name.length &&
      userData.last_name.length
    ) {
      if (!validateEmail(userData.email)) {
        setError("Enter validate email");
        return;
      } else {
        setError("");
        dispatch(addUser(userData));
      }
    } else {
      setError("Please fill all the fields");
    }
  };

  useEffect(() => {
    dispatch(fetchAllUser());
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "15px 10px",
        }}
      >
        <Button
          onClick={() => setModalOpen(true)}
          color="primary"
          variant="contained"
        >
          Add User
        </Button>
      </Box>
      <TableContainer
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        component={Paper}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" role={"img"}>
                  <img
                    src={row.avatar}
                    alt={row.id}
                    width={60}
                    style={{ width: "50px", height: "50px" }}
                  />
                </TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">
                  {row.first_name + row.last_name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            sx={{ textAlign: "center" }}
            variant="h6"
            component="h2"
          >
            Add User
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            <TextField
              type={"text"}
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              label="First Name"
              sx={{ marginBottom: "15px" }}
              required
            />

            <TextField
              type={"text"}
              name="last_name"
              value={userData.last_name}
              onChange={handleChange}
              label="Last Name"
              placeholder="Last Name"
              sx={{ marginBottom: "15px" }}
              required
            />
            <TextField
              type={"email"}
              name="email"
              value={userData.email}
              label="Email"
              placeholder="Email"
              onChange={handleChange}
              sx={{ marginBottom: "15px" }}
              required
            />
            {error ? (
              <Box sx={{ fontSize: "12px", color: "red" }}>{error}</Box>
            ) : (
              ""
            )}
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ display: "flex", margin: "auto" }}
            onClick={() => onSave()}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default UserTable;

// import React, { useEffect, useState } from "react";
// import { Paper } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import PageHeader from "../components/PageHeader";
// import adminApi from "../services/adminApi";

// export default function UsersPage() {
//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     const res = await adminApi.get("/users");
//     setRows(res.data);
//   };

//   const columns = [
//     { field: "id", headerName: "User ID", width: 100 },
//     { field: "name", headerName: "Name", flex: 1 },
//     { field: "email", headerName: "Email", flex: 1.2 },
//     { field: "phone", headerName: "Phone", flex: 1 },
//     { field: "role", headerName: "Role", flex: 0.8 },
//   ];

//   return (
//     <>
//       <PageHeader title="Users" subtitle="View all users" />
//       <Paper sx={{ height: 500, width: "100%" }}>
//         <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10, 20]} />
//       </Paper>
//     </>
//   );
// }
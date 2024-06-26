import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useDispatch } from 'react-redux'
import { Listfetch } from '../Store/ListSlice'
import { useQuery } from '@tanstack/react-query'
import Layout from '../Common/Layout'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete } from '../Store/Deleteslice';


export default function List() {

  const dispatch = useDispatch()

  const getList = async () => {
    try {
      const response = await dispatch(Listfetch())
      return response?.payload
    } catch (error) {
      return error
    }
  }


  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ['list'],
    queryFn: getList,
  })

  console.log("DATAAA....", data)


  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const handleDelete = async(idd)=>{
    alert(idd)
    await dispatch(Delete(idd))
    refetch()
  }


  return (
    <Layout>

      <TableContainer component={Paper}>
      <Button variant='contained' color='secondary'> <Link to="/add" style={{textDecoration : "none", color: "white"}}>  Add User </Link> </Button>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Sl. No</TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">TITLE</TableCell>
              <TableCell align="center">DESCRIPTION</TableCell>
              <TableCell align="center">ENDDATE</TableCell>
              <TableCell align="center">ISCOMPLETED</TableCell>
              <TableCell align="center">ACTION</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{item.id}</TableCell>
                <TableCell align="center">{item.title}</TableCell>
                <TableCell align="center">{item.description}</TableCell>
                <TableCell align="center">{new Date(item?.endDate).toLocaleDateString('en-GB')}</TableCell>
                <TableCell align="center">{item.iscompleted}</TableCell>
                <TableCell align="center">
                  <Button> <Link to={`/details/${item.id}`}> <RemoveRedEyeOutlinedIcon color='info' /> </Link> </Button>
                  <Button> <Link to={`/edit/${item.id}`}> <EditNoteOutlinedIcon color='secondary' /> </Link> </Button>
                  <Button onClick={() => handleDelete(item.id)}> <DeleteSweepOutlinedIcon color='warning' />  </Button>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Layout>
  )
}

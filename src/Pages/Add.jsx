import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../Common/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { AddPost } from '../Store/AddSlice';
import { FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();




export default function Add() {

    const [com, setCom] = React.useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const {data: stateData} = useSelector((state)=>{
    //     console.log("ADD_STATE...", state?.add)
    //     return state?.add
    // })

    const { register, watch, reset, setvalue, formState: { errors }, handleSubmit } = useForm()

    console.log(watch(["title", "description", "endDate", "iscompleted"]))

    const { mutate, ispending } = useMutation({
        mutationFn: (data) => dispatch(AddPost(data)),

        onSuccess: (response) => {
            console.log("Added Successfully....", response)
            if (response?.payload) {
                navigate("/");
                reset()
                setCom('')
            }
        }
    })

    const onsubmit = (data) => {
        console.log("DATA....", data)
        const reg = {
            title: data.title,
            description: data.description,
            endDate: data.endDate,
            iscompleted: com
        };
        mutate(reg)
        // dispatch(AddPost(reg))

    };



    return (
        <Layout>

            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Add
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onsubmit)} noValidate sx={{ mt: 1 }}>

                            <TextField margin="normal" required fullWidth id="title" label="Title" {...register("title", { required: true })} />
                            <br />
                            {errors.title?.type === "required" && (<span style={{ color: "red" }}> This Field is required</span>)}

                            <TextField margin="normal" required fullWidth id="description" label="description" {...register("description", { required: true })} />
                            <br />
                            {errors.description?.type === "required" && (<span style={{ color: "red" }}> This Field is required</span>)}

                            <TextField margin="normal" required fullWidth id="endDate" label="endDate" type='date' {...register("endDate", { required: true })} />
                            <br />
                            {errors.endDate?.type === "required" && (<span style={{ color: "red" }}> This Field is required</span>)}

                            {/* <TextField margin="normal" required fullWidth id="iscompleted" label="iscompleted" type='' {...register("iscompleted", { required: true })} />
                            <br />
                            {errors.iscompleted?.type === "required" && (<span style={{ color: "red" }}> This Field is required</span>)} */}

                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <FormControl sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                marginLeft: 3,
                                marginTop: 3
                            }}>
                                <FormLabel id="demo-radio-buttons-group-label">Is Complete</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    value={com} // Use state variable for value
                                    onChange={(e) => setCom(e.target.value)} // Update state on change
                                >
                                    <FormControlLabel value="False" control={<Radio />} label="False" />
                                    <FormControlLabel value="True" control={<Radio />} label="True" />
                                </RadioGroup>
                            </FormControl>

                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}  >
                                Add
                            </Button>

                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>

        </Layout>

    );
}
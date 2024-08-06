"use client"

// ** React Imports
import React, { useState } from "react"

// ** Next Imports
import { useRouter } from "next/navigation"

// ** MUI Components
import { Card, Stack, TextField, Typography } from "@mui/material"

// ** Form Import
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { LoadingButton } from "@mui/lab"

// ** Schema import
import { loginSchema } from "./schema"

// ** API
import api from "../services/api"

const Home = ({ handleOutsideSubmit = undefined } : any) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    // ** Hook
    const router = useRouter()

    // ** Form
    const { control, handleSubmit } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    // ** Form submit
    async function onSubmit(data: any) {
        try {
            // Added for test cases
            if (handleOutsideSubmit) {
                handleOutsideSubmit(data)
                return;
            }
            setIsLoading(true)
            const response = await api.login(data)

            if (response?.status) {
                setIsLoading(false)
                const storedUser = JSON.stringify(response.data)
                localStorage.setItem("currentUser", storedUser)
                router.push("/products")
            }
        } catch (error: any) {
            console.error(error)
            setIsLoading(false)
            setError(error?.response?.data?.message)
        }
    }

    return (
        <Card
            sx={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "Center",
            }}
        >
            <form role="form" onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    <Controller
                        control={control}
                        name="username"
                        render={({ field }) => (
                            <TextField
                                label="Username"
                                placeholder="e.g. emilys"
                                {...field}
                                inputProps={{ "data-testid": "username" }}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Password"
                                type="password"
                                {...field}
                                inputProps={{ "data-testid": "password" }}
                            />
                        )}
                    />
                    {error && (
                        <Typography color="error">
                            {"Invalid credentials"}
                        </Typography>
                    )}
                    <LoadingButton
                        loading={isLoading}
                        fullWidth
                        size="large"
                        variant="contained"
                        type="submit"
                        sx={{ marginBottom: 7 }}
                        data-testid="login-btn"
                    >
                        Login
                    </LoadingButton>
                </Stack>
            </form>
        </Card>
    )
}
export default Home

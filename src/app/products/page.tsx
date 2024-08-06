"use client"

// ** API
import api from "../../services/api"

// ** React Imports
import React, { useEffect, useState } from "react"

// ** Next Imports
import { useRouter } from "next/navigation"

// ** MUI Components
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    CircularProgressProps,
    Paper,
    Rating,
    Stack,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material"
import { styled } from "@mui/material/styles"

// ** Tenstack Components
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

// ** Schema import
import { Product } from "../schema"
import ReviewModal from "./reviews"
import numeral from "numeral"

// ** Styling Table row & cell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        border: '1px solid rgba(224, 224, 224, 1)'
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}))

const Products = ({testColumns = [], testData = []}: any) => {
    // ** Defining columns
    const columns: ColumnDef<Product>[] = testColumns?.length > 0 ? testColumns : [
        {
            header: "Id",
            accessorKey: "id",
        },
        {
            header: "Title",
            accessorKey: "title",
        },
        {
            header: "Description",
            accessorKey: "description",
        },
        {
            header: "Category",
            accessorKey: "category",
        },
        {
            header: "Price",
            accessorKey: "price",
            cell: (row: any) => fNumber(row.getValue()),
        },
        {
            header: "Percentage",
            accessorKey: "discountPercentage",
            cell: (row: any) => {
                return <CircularProgressWithLabel value={row.getValue()} />
            },
        },
        {
            header: "Rating",
            accessorKey: "rating",
            cell: (row: any) => {
                return (
                    <Rating
                        value={row.getValue()}
                        size="small"
                        readOnly
                        precision={0.1}
                    />
                )
            },
        },
        {
            header: "Stock",
            accessorKey: "stock",
        },
        {
            header: "Tags",
            accessorKey: "tags",
            cell: (row: any) => {
                return <Stack spacing={1}>
                    {row.getValue().map((tag: any) => <Chip key={tag} label={tag} />)}
                </Stack>
            }
        },
        {
            header: "Brand",
            accessorKey: "brand",
        },
        {
            header: "Action",
            accessorKey: "id",
            cell: (row: any) => {
                return (
                    <Button onClick={() => setId(row.getValue())}>
                        View Reviews
                    </Button>
                )
            },
        },
    ]

    // ** Hook
    const router = useRouter()
    const [data, setData] = useState(testData)
    const [id, setId] = useState(undefined)

    // ** Initializing Tenstack
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    // ** API call on page load
    useEffect(() => {
        const currentUser = JSON.parse(
            localStorage.getItem("currentUser") || "{}"
        )
        if (!currentUser?.token) router.push("/")
        api.getProducts()
            .then((response) => {
                setData(response.data.products)
            })
            .catch((error) => console.error(error))
    }, [])

    const fNumber = (number: string | number) => {
        return numeral(number).format('$0,0.00')
    }

    return (
        <Box sx={{ width: "100%" }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Product table">
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <StyledTableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <StyledTableCell key={header.id}>
                                            <div>
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                            </div>
                                        </StyledTableCell>
                                    )
                                })}
                            </StyledTableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getCoreRowModel().rows.map((row) => {
                            return (
                                <StyledTableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <StyledTableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </StyledTableCell>
                                        )
                                    })}
                                </StyledTableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {id && (
                <ReviewModal
                    open={id != undefined}
                    onClose={() => setId(undefined)}
                    id={id}
                />
            )}
        </Box>
    )
}

export default Products

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number }
) {
    return (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
                variant="determinate"
                {...props}
                color={
                    props.value < 50
                        ? "error"
                        : props.value < 90
                        ? "warning"
                        : "success"
                }
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    )
}

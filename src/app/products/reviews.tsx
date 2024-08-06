// ** API
import api from "../../services/api"

// ** React Imports
import React, { Fragment, useEffect, useState } from "react"

// ** MUI imports
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Rating,
    Stack,
    Typography,
} from "@mui/material"
import { format } from "date-fns"

const ReviewModal = ({ open, onClose, id }: any) => {
    const [reviews, setReviews] = useState([])
    // ** Hook
    useEffect(() => {
        getProductDetails()
    }, [])

    // ** Get product by id
    const getProductDetails = async () => {
        try {
            const response = await api.getProductsById(id)
            setReviews(response.data.reviews)
        } catch (error) {
            console.error(error)
        }
    }

    const fDateTime = (date: string, newFormat?: string) => {
        const fm = newFormat || "dd MMM yyyy p"

        return date ? format(new Date(date), fm) : ""
    }

    return (
        <Dialog open={open} fullWidth>
            <DialogTitle>
                <Stack
                    spacing={1}
                    direction="row"
                    justifyContent="space-between"
                >
                    <Typography>Reviews</Typography>
                    <Button sx={{ width: "1%" }} onClick={onClose}>
                        X
                    </Button>
                </Stack>
            </DialogTitle>
            <DialogContent>
                {reviews.map(({ id, reviewerName, rating, comment, date }) => (
                    <Fragment key={id}>
                        <Stack
                            spacing={2}
                            sx={{
                                position: "relative",
                                p: (theme) => theme.spacing(3, 3, 2, 3),
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                            >
                                <div>
                                    <Typography variant="subtitle2">
                                        {reviewerName}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: "text.secondary",
                                            mt: 0.5,
                                            display: "block",
                                        }}
                                    >
                                        Posted {fDateTime(date)}
                                    </Typography>
                                </div>
                            </Stack>

                            <Rating
                                value={rating}
                                size="small"
                                readOnly
                                precision={0.5}
                            />

                            <Typography variant="body2">{comment}</Typography>
                        </Stack>
                        <Divider />
                    </Fragment>
                ))}
            </DialogContent>
        </Dialog>
    )
}

export default ReviewModal

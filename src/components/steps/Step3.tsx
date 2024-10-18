import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useStepForm } from "../../hooks/FormContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const step3Schema = z.object({
    address: z.string().max(20, "Address cannot be empty"),
    phone: z
        .string()
        .min(10, "Phone must be of 10 character")
        .max(10, "Phone must be of 10 character"),
});

type Step1SchemaType = z.infer<typeof step3Schema>;

export default function Step3() {
    const { changeStep, formValues, addToForm } = useStepForm();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Step1SchemaType>({
        resolver: zodResolver(step3Schema),
        defaultValues: {
            ...formValues["step3"],
        },
    });

    const onSubmit = (value: Step1SchemaType) => {
        addToForm({ step3: value });
        changeStep(1);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ marginBlock: "40px" }}>
                <Box
                    sx={{
                        display: "flex",
                        gap: "5px",
                        justifyContent: "center",
                    }}
                >
                    <Stack spacing={1}>
                        <TextField
                            {...register("address")}
                            id="outlined-basic"
                            label="address"
                            variant="outlined"
                        />
                        {errors.address && (
                            <Alert severity="error">
                                {errors.address.message}
                            </Alert>
                        )}
                    </Stack>
                    <Stack spacing={1}>
                        <TextField
                            {...register("phone")}
                            id="outlined-basic"
                            label="Phone"
                            variant="outlined"
                        />
                        {errors.phone && (
                            <Alert severity="error">
                                {errors.phone.message}
                            </Alert>
                        )}
                    </Stack>
                </Box>
                <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{
                        width: "fit-content",
                        marginInline: "auto",
                        marginTop: "15px",
                    }}
                >
                    <Button
                        variant="outlined"
                        type="button"
                        onClick={() => changeStep(-1)}
                    >
                        Back
                    </Button>
                    <Button variant="outlined" type="submit">
                        Next
                    </Button>
                </Stack>
            </Box>
        </form>
    );
}

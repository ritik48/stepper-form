import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useStepForm } from "../../hooks/FormContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const step1Schema = z.object({
    firstName: z.string().min(4, "First name must be min 4 character"),
    lastName: z.string().min(3, "Last name must be min 3 character"),
});

type Step1SchemaType = z.infer<typeof step1Schema>;

export default function Step1() {
    const { changeStep, formValues, addToForm } = useStepForm();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Step1SchemaType>({
        resolver: zodResolver(step1Schema),
        defaultValues: {
            ...formValues["step1"],
        },
    });

    const onSubmit = (value: Step1SchemaType) => {
        console.log(value);

        addToForm({ step1: value });

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
                            {...register("firstName")}
                            id="outlined-basic"
                            label="First name"
                            variant="outlined"
                        />
                        {errors.firstName && (
                            <Alert severity="error">
                                {errors.firstName.message}
                            </Alert>
                        )}
                    </Stack>
                    <Stack spacing={1}>
                        <TextField
                            {...register("lastName")}
                            id="outlined-basic"
                            label="Last name"
                            variant="outlined"
                        />
                        {errors.lastName && (
                            <Alert severity="error">
                                {errors.lastName.message}
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

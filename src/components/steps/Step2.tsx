import { useForm } from "react-hook-form";
import { z } from "zod";
import { useStepForm } from "../../hooks/FormContext";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { v4 as uuidv4 } from "uuid";

const step2Schema = z.object({
    members: z.array(
        z.object({
            relation: z.string().min(5, "Must be min 5 character"),
            name: z
                .string()
                .max(30, "Must be less than 30 character")
                .min(4, "Must be min 4 character"),
        })
    ),
});

type Step2SchemaType = z.infer<typeof step2Schema>;

export default function Step2() {
    const { changeStep, addToForm, formValues } = useStepForm();

    const [totalInputs, setTotalInputs] = useState(
        formValues["step2"].members.length || 1
    );

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(step2Schema),
        defaultValues: {
            ...formValues["step2"],
        },
    });

    const onSubmit = (value: Step2SchemaType) => {
        console.log(value);

        addToForm({ step2: value });

        changeStep(1);
    };

    const removeMember = (index: number) => {
        const currentValue = getValues();

        const newMembers = currentValue.members.filter((_, i) => index !== i);
        setValue("members", newMembers);

        setTotalInputs((prev) => prev - 1);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{
                    marginBlock: "40px",
                    marginInline: "auto",
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        spacing={3}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        {Array.from({ length: totalInputs }, (_, index) => (
                            <Stack spacing={2} key={uuidv4()} direction={"row"}>
                                <Stack spacing={1}>
                                    <TextField
                                        {...register(
                                            `members.${index}.relation`
                                        )}
                                        id="outlined-basic"
                                        label="Relation"
                                        variant="outlined"
                                    />
                                    {errors.members?.[index] && (
                                        <Alert severity="error">
                                            {
                                                errors.members?.[index].relation
                                                    ?.message
                                            }
                                        </Alert>
                                    )}
                                </Stack>
                                <Stack spacing={1}>
                                    <TextField
                                        {...register(`members.${index}.name`)}
                                        id="outlined-basic"
                                        label="Name"
                                        variant="outlined"
                                    />
                                    {errors.members?.[index] && (
                                        <Alert severity="error">
                                            {
                                                errors.members?.[index].name
                                                    ?.message
                                            }
                                        </Alert>
                                    )}
                                </Stack>
                                <Button
                                    variant="outlined"
                                    sx={{ height: "fit-content" }}
                                    onClick={() => removeMember(index)}
                                >
                                    Delete
                                </Button>
                            </Stack>
                        ))}
                        <Button
                            onClick={() => setTotalInputs((prev) => prev + 1)}
                            sx={{ width: "fit-content" }}
                        >
                            Add Member
                        </Button>
                    </Stack>
                </Stack>
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

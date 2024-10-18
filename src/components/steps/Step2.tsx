import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useStepForm } from "../../hooks/FormContext";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the schema for validation using Zod
const step2Schema = z.object({
    members: z.array(
        z.object({
            relation: z.string().min(5, "Must be at least 5 characters"),
            name: z
                .string()
                .max(30, "Must be less than 30 characters")
                .min(4, "Must be at least 4 characters"),
        })
    ),
});

// Infer types from the schema
type Step2SchemaType = z.infer<typeof step2Schema>;

export default function Step2() {
    const { changeStep, addToForm, formValues } = useStepForm();

    console.log({ formValues });

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm<Step2SchemaType>({
        resolver: zodResolver(step2Schema),
        defaultValues: {
            members:
                formValues["step2"]?.members.length > 0
                    ? formValues["step2"]?.members
                    : [{ relation: "", name: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "members",
    });

    const onSubmit = (value: Step2SchemaType) => {
        console.log(value);
        addToForm({ step2: value });
        changeStep(1);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ marginBlock: "40px", marginInline: "auto" }}>
                <Stack spacing={2}>
                    <Stack
                        spacing={3}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        {fields.map((item, index) => (
                            <Stack spacing={2} key={item.id} direction={"row"}>
                                <Stack spacing={1}>
                                    <TextField
                                        {...register(
                                            `members.${index}.relation`
                                        )}
                                        label="Relation"
                                        variant="outlined"
                                    />
                                    {errors.members?.[index]?.relation && (
                                        <Alert severity="error">
                                            {
                                                errors.members[index].relation
                                                    .message
                                            }
                                        </Alert>
                                    )}
                                </Stack>
                                <Stack spacing={1}>
                                    <TextField
                                        {...register(`members.${index}.name`)}
                                        label="Name"
                                        variant="outlined"
                                    />
                                    {errors.members?.[index]?.name && (
                                        <Alert severity="error">
                                            {errors.members[index].name.message}
                                        </Alert>
                                    )}
                                </Stack>
                                <Button
                                    variant="outlined"
                                    sx={{ height: "fit-content" }}
                                    onClick={() => remove(index)}
                                >
                                    Delete
                                </Button>
                            </Stack>
                        ))}
                        <Button
                            onClick={() => append({ relation: "", name: "" })}
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

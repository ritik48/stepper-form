
import "./App.css";

import StepperForm from "./components/StepperForm";
import { StepFormProvider } from "./hooks/FormContext";
import { Typography } from "@mui/material";

function App() {
    // const onSubmit = (values: any) => {
    //     console.log(values);
    // };

    // const deleteMember = (index: number) => {
    //     const val = getValues();

    //     setValue(
    //         "members",
    //         val.members.filter((_, i) => index !== i)
    //     );
    //     setTotalInputs((prev) => prev - 1);
    // };

    return (
        <div className="cont">
            <Typography variant="h3" sx={{ marginBlock: "20px" }}>
                Form
            </Typography>
            <StepFormProvider>
                <StepperForm />
            </StepFormProvider>

            {/* <form onSubmit={handleSubmit(onSubmit)}>
                {Array.from({ length: totalInputs }, (_, index) => (
                    <>
                        <div className="row" key={index}>
                            <input
                                {...register(`members.${index}`, {
                                    required: "it is req",
                                    minLength: {
                                        value: 5,
                                        message: "min length 5",
                                    },
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => deleteMember(index)}
                            >
                                Delete
                            </button>
                        </div>
                        {errors.members?.[index]?.message && (
                            <p className="error" key={`p${index}`}>
                                {errors.members?.[index]?.message}
                            </p>
                        )}
                    </>
                ))}

                <button
                    type="button"
                    onClick={() => setTotalInputs((prev) => prev + 1)}
                >
                    Add member
                </button>
                <button type="submit">Submit</button>
            </form> */}
        </div>
    );
}

export default App;

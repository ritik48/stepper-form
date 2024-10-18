import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useStepForm } from "../hooks/FormContext";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import { Alert, Button } from "@mui/material";

const steps = {
    "Step 1": <Step1 />,
    "Step 2": <Step2 />,
    "Step 3": <Step3 />,
};

export default function StepperForm() {
    const { activeStep, changeStep, resetForm, formValues } = useStepForm();

    return (
        <Box sx={{ width: "80%", marginInline: "auto" }}>
            {activeStep === 3 ? (
                <>
                    <Alert
                        severity="success"
                        sx={{ width: "fit-content", marginInline: "auto" }}
                    >
                        Form is successfully submitted.
                    </Alert>
                    <Button
                        onClick={() => {
                            console.log("Submitted = ", formValues);
                            resetForm();
                            changeStep(-3);
                        }}
                    >
                        Start Again
                    </Button>
                </>
            ) : (
                <>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {Object.keys(steps).map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === 0 && steps["Step 1"]}
                    {activeStep === 1 && steps["Step 2"]}
                    {activeStep === 2 && steps["Step 3"]}
                    {/* If you had Step 2, you would add it here */}
                </>
            )}
        </Box>
    );
}

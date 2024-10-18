import { createContext, useContext, useState } from "react";

type FormContextType = {
    activeStep: number;
    changeStep: (value: number) => void;
    addToForm: (
        value:
            | Pick<FormValueType, "step1">
            | Pick<FormValueType, "step2">
            | Pick<FormValueType, "step3">
    ) => void;
    formValues: FormValueType;
};

const initialContextValue = {
    activeStep: 0,
    changeStep: () => {},
    addToForm: () => {},
    formValues: {
        step1: {
            firstName: "",
            lastName: "",
        },
        step2: {
            members: [],
        },
        step3: {
            address: "",
            phone: "",
        },
    },
};

type FormValueType = {
    step1: {
        firstName: string;
        lastName: string;
    };
    step2: {
        members: { relation: string; name: string }[];
    };
    step3: {
        address: string;
        phone: string;
    };
};

const FormContext = createContext<FormContextType>(initialContextValue);

export const StepFormProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formValues, setFormValues] = useState<FormValueType>({
        step1: {
            firstName: "",
            lastName: "",
        },
        step2: {
            members: [],
        },
        step3: {
            address: "",
            phone: "",
        },
    });

    const changeStep = (value: number) => {
        if (activeStep + value < 0) return;

        setActiveStep((prev) => prev + value);
    };

    const addToForm = (
        value:
            | Pick<FormValueType, "step1">
            | Pick<FormValueType, "step2">
            | Pick<FormValueType, "step3">
    ) => {
        setFormValues((prev) => ({ ...prev, ...value }));
    };

    return (
        <FormContext.Provider
            value={{ addToForm, changeStep, activeStep, formValues }}
        >
            {children}
        </FormContext.Provider>
    );
};

export const useStepForm = () => {
    const context = useContext(FormContext);
    if (context === undefined)
        throw new Error(
            "form context needs to be used inside the form provider"
        );
    return context;
};

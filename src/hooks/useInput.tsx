import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { InputErrorType, InputsSchema, InputValue } from "../types";


export default function useInput(initialValues: InputsSchema) {
    const [inputValue, setInputValue] = useState<InputValue>({})
    const [error, setError] = useState<InputErrorType>({})
    //get the initial values object and add to inputValues 
    useEffect(() => {
        for (const [key, value] of Object.entries(initialValues)) {
            setInputValue((prev => { return { ...prev, [key]: value?.initialValue } }))
        }
    }, [])

    //handle the input change values here
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue: InputValue = {
            ...inputValue,
            [e.target.name]: e.target.value
        };

        setInputValue(newValue);
        const errors = checkErrors(newValue);
        setError((prev: InputErrorType) => ({
            ...prev,
            [e.target.name]: errors[e.target.name],
        }));
    }

    const validateAllInputs = useCallback(() => {
        const errors = checkErrors(inputValue);
        setError(errors);
        return errors;
    }, [inputValue]);

    //check the inputs rules here and add the message to object 
    const checkErrors = useCallback((inputs: InputValue) => {
        const errors: InputErrorType = {}
        for (const [key, value] of Object.entries(initialValues)) {
            const inputValue = inputs[key] ?? "";

            if (value.required && typeof inputValue === 'string' && inputValue.length === 0) {
                errors[key] = value.required
            }

            else if (value.min && typeof inputValue === "string" && inputValue.length <= value.min.value) {
                errors[key] = value.min.message
            }
            else if (value.min && typeof +inputValue === "number" && +inputValue <= value.min.value) {
                errors[key] = value.min?.message
            }
            else if (value.max && inputValue.toString().length > value.max.value) {
                errors[key] = value.max.message
            } else {
                delete errors[key];
            }
        }
        return errors
    }, [initialValues])


    return { inputValue, handleInputChange, validateAllInputs, error }
}

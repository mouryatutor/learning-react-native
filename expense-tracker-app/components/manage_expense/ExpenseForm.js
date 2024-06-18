import { StyleSheet, TextInput, View, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../ui/Button";
import { GlobalStyles } from "../../constants/styles";



function ExpenseForm({submitButtonLabel, onCancel,onSubmit,defaultValue}) {
    const [inputs, setinputs] = useState({
        amount: { value: defaultValue ? defaultValue.amount.toString() : '', isValid: true },
        date: { value: defaultValue ? defaultValue.date.toISOString().slice(0,10) : '', isValid: true},
        description: { value: defaultValue ? defaultValue.description : '', isValid: true}
    });
    function inputChangedHandler(inputIdentifier, enteredAmount) {
        setinputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: {value : enteredAmount, isValid: true }
            }
        });
    }

    function submitHandler(){
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid) {
            
            setinputs((curInputs) => {
                return {
                    amount: { value : curInputs.amount.value, isValid: amountIsValid},
                    date: { value : curInputs.date.value, isValid: dateIsValid},
                    description: { value : curInputs.description.value, isValid: descriptionIsValid},
                }
            });
            return;
        }

        onSubmit(expenseData);
    }

    const formIsInValid = !inputs.amount.isValid ||
                          !inputs.date.isValid ||
                          !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label="Amount"
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputs.amount.value
                    }}
                />
                <Input
                    style={styles.rowInput}
                    label="Date"
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputs.date.value
                    }}
                />
            </View>
            <Input
                label="Description"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    autoCorrect: true,
                    autoCapitalize: true,
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputs.description.value
                }}
            />
            {formIsInValid && (
                <Text style={styles.errorText}>Invalid input values - pleaes check your entered data!</Text>
            )}
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rowInput: {
        flex: 1
    },
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: "center",

    },
    buttons: {
        flexDirection: "row",
        justifyContent:"center",
        alignContent: "center"
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }
})
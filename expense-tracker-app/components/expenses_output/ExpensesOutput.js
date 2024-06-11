import { FlatList, StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES = [
    {
        id:'e1',
        description:'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id:'e2',
        description:'A pair of trousers',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id:'e3',
        description:'Some bannas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id:'e4',
        description:'A book',
        amount: 14.99,
        date: new Date('2022-02-19')
    },
    {
        id:'e5',
        description:'Another book',
        amount: 18.59,
        date: new Date('2022-02-10')
    }
]

function ExpensesOutput({expenses,expensePeriod}) {
    return <View style={styles.container}>
        <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensePeriod} />
        <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1
    }
})
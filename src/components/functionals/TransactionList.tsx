import { useSelector } from "react-redux";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { selectCarteira } from "../../store/modules/carteiraSlice";

export default function TransactionList() {
  // Use o seletor para obter o estado da carteira
  const { balance, transactions } = useSelector(selectCarteira);

  return (
    <Box>
      <Typography variant="h4">Saldo</Typography>
      <Typography variant="h6" gutterBottom>
        R${balance.toFixed(2)}
      </Typography>
      <Typography variant="h4">Transações</Typography>
      <List>
        {transactions.map((transaction) => (
          <ListItem key={transaction.id}>
            <ListItemText
              primary={`${
                transaction.type === "INCOME" ? "ENTRADA | " : "SAÍDA | "
              } R$${transaction.value.toFixed(2)}`}
              secondary={transaction.description}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

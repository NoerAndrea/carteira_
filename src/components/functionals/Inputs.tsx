import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useAppDispatch } from "../../store/hooks";
import { useState } from "react";
import { register } from "../../store/modules/carteiraSlice";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function BasicTextFields() {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<"INCOME" | "OUTCOME">("INCOME");

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const newTransition = {
      value: Number(ev.currentTarget["value-input"].value),
      type: selected,
      description: String(ev.currentTarget["description-input"].value),
    };
    dispatch(register(newTransition));
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        id="value-input"
        label="Valor"
        variant="outlined"
        type="number"
      />
      <FormControl required>
        <InputLabel id="type-label">Tipo</InputLabel>
        <Select
          labelId="type-label"
          id="type-input"
          value={selected}
          onChange={(ev) =>
            setSelected(ev.target.value as "INCOME" | "OUTCOME")
          }
        >
          <MenuItem value="INCOME">Entrada</MenuItem>
          <MenuItem value="OUTCOME">Saída</MenuItem>
        </Select>
      </FormControl>
      <TextField
        required
        id="description-input"
        label="Descrição"
        variant="outlined"
        multiline
        rows={4}
      />
      <Button type="submit" variant="contained">
        Cadastrar
      </Button>
    </Box>
  );
}

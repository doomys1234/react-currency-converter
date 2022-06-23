import s from "./Converter.module.scss";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';


import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Converter({ getValues, convertResult, secondResult }) {
  const [firstSelectValue, setFirstSelectValue] = useState("EUR");
  const [secondeSelectValue, setSecondeSelectValue] = useState("EUR");
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [result, setResult] = useState("");
  const [newRes, setNewRes] = useState("");

  useEffect(() => {
    if (convertResult === "") {
      return;
    }

    setResult(convertResult);
  }, [convertResult]);

  useEffect(() => {
    if (secondResult === "") {
      return;
    }

    setNewRes(secondResult);
  }, [secondResult]);

  const inputHandler = (event) => {
    const inputName = event.target.name;

    switch (inputName) {
      case "from":
        setSecondValue("");
        setNewRes(event.target.value);
        setFirstValue(event.target.value);

        break;
      case "to":
        setFirstValue("");
        setResult(event.target.value);
        setSecondValue(event.target.value);

        break;

      default:
        break;
    }
  };

  const onSelectChange = (event) => {
      const selectorName = event.target.name;
      
    switch (selectorName) {
      case "firstSelector":
        setFirstSelectValue(event.target.value);
        setFirstValue(newRes);
        setSecondValue("");
        setResult("");

        break;

      case "secondSelector":
        setSecondeSelectValue(event.target.value);
        setSecondValue(result);
        setFirstValue("");
        setNewRes("");

        break;

      default:
        setFirstSelectValue("EUR");
        setSecondeSelectValue("EUR");

        break;
    }
  };

  const onSubmitChange = (e) => {
    e.preventDefault();
    if (firstValue === "" && secondValue === "") {
      toast.error("Please put a sum to convert");
    }

    getValues({
      firstValue,
      secondValue,
      firstSelectValue,
      secondeSelectValue,
    });

    setSecondValue(convertResult);
  };

    return (
      
        
        <form className={s.form_container} onSubmit={onSubmitChange}>
            
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '15ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField  onChange={inputHandler} type="text"
        name="from" label="From" variant="outlined"  value={newRes} size='small'/>
      
    </Box>
      <Box sx={{ minWidth: 120 }}>
      <FormControl size="small">
        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          name="firstSelector"
          value={firstSelectValue}
          label="Currency"
          onChange={onSelectChange}
        >
        <MenuItem value="EUR">EUR</MenuItem>
        <MenuItem value="USD">USD</MenuItem>
        <MenuItem value="UAH">UAH</MenuItem>
        </Select>
      </FormControl>
    </Box>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '15ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField  onChange={inputHandler} className={s.converter_input} type="text"
        name="to" label="To" variant="outlined"  value={result} size='small'/>
      
    </Box>
          
          <Box sx={{ minWidth: 120 }}>
      <FormControl size="small" >
        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          name="secondSelector"
          value={secondeSelectValue}
          label="Currency"
          onChange={onSelectChange}
        >
           <MenuItem value="EUR">EUR</MenuItem>
        <MenuItem value="USD">USD</MenuItem>
        <MenuItem value="UAH">UAH</MenuItem>
        </Select>
      </FormControl>
    </Box>
      
       
          <Button sx={{width: 150}} size="medium" variant='outlined' type="submit">Check</Button>
          
          
      </form>
      
  );
}

import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function ComboBox({ products, onSelect, selectedProducts }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event, value) => {
    onSelect(value);
  };
;

  useEffect(() => {
    const validSelectedProducts = selectedProducts.filter((product) => product.quantity > 0);
    onSelect(validSelectedProducts);
  }, [selectedProducts]);

  return (
    <Autocomplete
      style={{ width: '100%' }}
      multiple
      limitTags={2}
      id="product-select-demo"
      options={products}
      autoHighlight
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderOption={(props, option) => {
        const { key, ...restProps } = props;
        return (
          <Box
            key={option.id}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...restProps}
          >
            <img
              loading="lazy"
              width="20"
              src={option.picture}
              alt=""
            />
            {option.name} - Rp. {option.price} (Stock: {option.stock})
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a product"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgb(125 211 252)',
              },
              '&:hover fieldset': {
                borderColor: 'rgb(59 130 246)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgb(59 130 246)',
              },
            },
            transition: 'background-color 200ms ease-in-out, border-color 200ms ease-in-out',
          }}
        />
      )}
    />
  );
}

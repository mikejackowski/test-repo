import React, { ReactNode, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Autocomplete, { AutocompleteChangeReason } from '@mui/material/Autocomplete';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import Icon from 'src/components/Icon';

interface OptionType {
  icon: ReactNode;
  label: string;
}

export const categories: Array<OptionType> = [
  {
    icon: <Icon icon="emojione:cat" />,
    label: 'cat',
  },
  {
    icon: <Icon icon="emojione:dog" />,
    label: 'dog',
  },
  {
    icon: <Icon icon="emojione:elephant" />,
    label: 'elephant',
  },
  {
    icon: <Icon icon="emojione:lion-face" />,
    label: 'lion',
  },
  {
    icon: <Icon icon="emojione:monkey" />,
    label: 'monkey',
  },
];

const CategoryPicker = () => {
  const [selectedCategory, setSelectedCategory] = useState<OptionType | null>(null);

  const navigate = useNavigate();

  const handleCategoryChange = (event: React.SyntheticEvent<Element, Event>, newValue: OptionType | null, reason: AutocompleteChangeReason) => {
    if (reason === 'selectOption' && newValue) {
      setSelectedCategory(newValue);
      navigate(`/${newValue?.label}`);
    }
    if (reason === 'clear') {
      setSelectedCategory(null);
    }
  };

  return (
    <Autocomplete
      options={categories}
      PaperComponent={({ children }) => (
        <Paper
          sx={{
            bgcolor: '#ffdd00',
          }}
        >
          {children}
        </Paper>
      )}
      value={selectedCategory}
      onChange={handleCategoryChange}
      fullWidth={true}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.label, inputValue, { insideWords: true });
        const parts = parse(option.label, matches);

        return (
          <ListItem {...props}>
            <ListItemAvatar>{option.icon}</ListItemAvatar>
            <ListItemText
              sx={{
                textTransform: 'capitalize',
              }}
            >
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </ListItemText>
          </ListItem>
        );
      }}
      renderInput={(params) => <TextField {...params} label="Select an animal" variant="outlined" />}
    />
  );
};

export default CategoryPicker;

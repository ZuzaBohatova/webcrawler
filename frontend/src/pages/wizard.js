import * as React from 'react';
import { Stack, TextField, Button, Switch, Box, IconButton, Tooltip, InputAdornment } from '@mui/material';
import { FormControl, FormControlLabel, FormLabel} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      regexp: "",
      periodicity: 0,
      label: "",
      active: true,
      tags: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePeriodicityChange = this.handlePeriodicityChange.bind(this);
    this.handleCheckedInputChange = this.handleCheckedInputChange.bind(this);
    this.handleTagsInput = this.handleTagsInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleCheckedInputChange(event) {
    this.setState({
      [event.target.name]: event.target.checked
    });
  }

  handleTagsInput(event) {
    const tags = event.target.value.split(',');
    this.setState({
      [event.target.name]: tags
    });
  }

  handlePeriodicityChange(event) {
    const value = event.target.value;
    const parsedValue = parseInt(value, 10);
  
    if (parsedValue >= 0) {
      this.setState({
        periodicity: parsedValue
      });
    } else {
      this.setState({
        periodicity: 0
      });
    }
  }

  handleSubmit() {
    // Vytvoření JSON záznamu
    const data = JSON.stringify(this.state);
  
    fetch('http://127.0.0.1:3001/add-website-record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 500) {
          throw new Error('Internal server error');
        } else {
          throw new Error('Error saving record');
        }
      })
      .then(json => {
        const { recordId, message } = json;
        alert(`Record saved successfully!\nRecord ID: ${recordId}\nMessage: ${message}`);
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while saving the record.');
      });
  }

  render() {
    return (
      <Box sx={{ width: "50%", margin: "auto auto", padding: "1%", border: "2px solid black" }}>
        <Stack component="form" onSubmit={this.handleSubmit} spacing={3} justifyContent="center" alignItems="center">
          {/* URL */}
          <FormControl fullWidth>
            <FormLabel id="url-label">URL</FormLabel>
            <TextField
              name="url"
              label="URL"
              aria-labelledby="url-label"
              size="small"
              onChange={this.handleInputChange}
              required
              InputProps={{
                endAdornment: <HelpTooltip title="Specify where the crawler should start" adorned />
              }}
            />
          </FormControl>
          {/* Boundary RegExp */}
          <FormControl>
            <FormLabel id="boundary-regexp-label">Boundary RegExp</FormLabel>
            <TextField
              name="regexp"
              label="Boundary RegExp"
              aria-labelledby="boundary-regexp-label"
              size="small"
              onChange={this.handleInputChange}
              required
              InputProps={{
                endAdornment:
                  <HelpTooltip
                    title="When the crawler found a link, the link must match this expression in order to be followed"
                    adorned
                  />
              }}
            />
          </FormControl>
          {/* Periodicity Input */}
          <FormControl>
            <FormLabel id="periodicity-label">Periodicity (minutes)</FormLabel>
            <TextField
              name="periodicity"
              label="Periodicity"
              aria-labelledby="periodicity-label"
              size="small"
              onChange={this.handlePeriodicityChange}
              type="number"
              InputProps={{
                endAdornment: <HelpTooltip title="How often should the site be crawled (in minutes)" adorned />
              }}
            />
          </FormControl>
          {/* Label Input */}
          <FormControl>
            <FormLabel id="label-inp">Label</FormLabel>
            <TextField
              name="label"
              label="Label"
              aria-labelledby="label-inp"
              size="small"
              onChange={this.handleInputChange}
              InputProps={{
                endAdornment: <HelpTooltip title="User given label" adorned />
              }}
            />
          </FormControl>
          {/* Active/Inactive Switch */}
          <FormControl sx={{ justifyContent: "center", alignItems: "center" }}>
            <FormLabel id="active-label">
              Active / Inactive
            </FormLabel>
            <FormControlLabel
              aria-labelledby="active-label"
              name="active"
              size="small"
              label={<HelpTooltip title="If inactive, the site is not crawled based on the Periodicity" />}
              control={<Switch checked={this.state.active} onChange={this.handleCheckedInputChange} />}
            />
          </FormControl>
          {/* Tags Input */}
          <FormControl>
            <FormLabel id="tags-label">Tags (comma separated)</FormLabel>
            <TextField
              name="tags"
              label="Tags"
              aria-labelledby="tags-label"
              size="small"
              onChange={this.handleTagsInput}
              InputProps={{
                endAdornment: <HelpTooltip title="User given tags, comma-separated without additional spaces" adorned />
              }}
            />
          </FormControl>
          <Button variant="outlined" type="submit">Submit</Button>
        </Stack>
      </Box>
    );
  }
}

function HelpTooltip(props) {
  const IconTooltip = () => {
    return (
      <Tooltip title={props.title}>
        <IconButton>
          <HelpOutlineIcon />
        </IconButton>
      </Tooltip>
    );
  };

  if (props.adorned) {
    return (
      <InputAdornment position="end">
        {IconTooltip()}
      </InputAdornment>
    );
  }
  else {
    return IconTooltip();
  }
}

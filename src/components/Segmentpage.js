import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SegmentPage() {
  const [open, setOpen] = React.useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [schemas, setSchemas] = useState([]);
  const [schemavalues, setSchemavalues] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState('');

  const availableSchemas = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" }
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDropdownChange = (event) => {
    setSelectedSchema(event.target.value);
  };

//   const handleValues=(e, index)=>{

//     const [name, value] = e.target
//     const updatedValues = [...schemavalues];
//     updatedValues[index][name] = value;
//     setSchemavalues(updatedValues);
//   }

const handleAddSchema = () => {
    if (selectedSchema && !schemas.some(schema => schema.value === selectedSchema)) {
      const schemaToAdd = availableSchemas.find(schema => schema.value === selectedSchema);
      setSchemas([...schemas, schemaToAdd]);
      setSelectedSchema('');
    }
  };

const handleSubmit = () => {
  const data = {
    segment_name: segmentName,
    schema: schemas.map(schema => ({ [schema.label]: schema.value  }))
  };
  console.log(data);
//   axios.post('https://webhook.site/3946b325-ba61-460b-8e84-04fd2bed03d9', data)
//       .then(response => console.log('Segment saved successfully:', response))
//       .catch(error => console.error('Error saving segment:', error));
};
  return (
    <React.Fragment>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              View Audience
            </Typography>
          </Toolbar>
        </AppBar>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ margin: '10px'}}>
        Save Segment
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Saving Segment
            </Typography>
          </Toolbar>
        </AppBar>
        <>
             <Typography sx={{ margin: '10px',marginLeft:'40px' }} variant="h6" component="div">
            Enter the Name of the Segmentd
            </Typography>
          <TextField id="outlined-basic" placeholder="Name of the Segmentd" variant="outlined"  
           style={{margin:'20px',right:'20px', width:'400px',left: '20px'}}
           value={segmentName} 
           onChange={(e) => setSegmentName(e.target.value)} /><br/>

            <Typography sx={{ margin: '10px',marginLeft:'40px' }} variant="h6" component="div">
            To Save your segment, you need to add the schemas to bulid the query
            </Typography>
           
           {schemas.map((schema, index) => (
        <div key={index}>
            <TextField id="outlined-basic" type="text" placeholder={schema.label} variant="outlined"
            style={{margin:'20px',right:'20px', width:'400px',left: '20px'}} 
            // onChange={(e) => handleValues(e, index)
             />
        </div>
           ))}
        <div>
            <select value={selectedSchema} onChange={handleDropdownChange} 
            style={{margin:'40px', width:'400px',height:'40px', borderRadius:'5px'}}>
            <option value="">Add schema to segment</option>
            {availableSchemas.filter(schema => !schemas.some(s => s.value === schema.value)).map(schema => (
              <option key={schema.value} value={schema.value}>{schema.label}</option>
            ))}
            </select><br/>
            <Button onClick={handleAddSchema}sx={{left: '20px'}}>+ Add New Schema</Button>
        </div>

        <div style={{position:'absolute',bottom:'20px',right:'20px'}}>
        <Button sx={{margin:'10px'}} variant="contained" color="success" onClick={handleSubmit}>Save the Segment</Button>
        <Button sx={{margin:'10px'}} color="error" onClick={handleClose}>Cancel</Button>
        </div>

        </>
      </Dialog>
    </React.Fragment>
  );
}

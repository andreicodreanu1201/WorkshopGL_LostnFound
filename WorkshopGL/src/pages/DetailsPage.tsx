import React from "react";
import { useParams } from "react-router"; 
import { item_data } from "../mock/items.mock";
import { 
  Typography, 
  Paper, 
  Stack, 
  Grid, 
  Box, 
  Chip,
  Button
} from "@mui/material";
import { useUpdateItem } from "../hooks/useUpdateItem";
import Modal from '@mui/material/Modal';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 }, // Responsive width
  maxHeight: '90vh',             // Prevents it from going off-screen
  overflowY: 'auto',             // Adds a scrollbar if the screen is tiny
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};


export const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const{mutate, isPending} = useUpdateItem();

  const item = item_data.find((item) => item.id === id);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
    // 2. State to hold the form data, initialized with the current item's data
    // (We use a fallback {} in case 'item' is undefined when the modal renders)
    const [formData, setFormData] = useState({
      title: item?.title || '',
      status: item?.status || 'LOST',
      location: item?.location || '',
      description: item?.description || '',
      // HTML datetime-local inputs require the format YYYY-MM-DDThh:mm
      publishdate: item?.publishdate ? item.publishdate.slice(0, 16) : '',
    });
  
    // 3. Universal change handler for all inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    // 4. Submit handler
    const handleSave = () => {
      console.log("Saving new data to API:", formData);
        mutate({ id: item!.id, data: formData });
      
      handleClose(); // Close the modal after saving
    };




  
  if (!item) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">Item not found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1200px', mx: 'auto' }}>
      
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Item Details
      </Typography>

      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 2, borderRadius: 2 }}>
        
        {/* The Grid creates the side-by-side layout */}
        <Grid container spacing={4}>
          
          {/* LEFT COLUMN: The Image */}
          {/* xs={12} makes it full width on mobile, md={5} gives it ~40% width on desktop */}
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              // If your mock data has an image URL, use it here (e.g., item.imageUrl). 
              // Otherwise, use a placeholder:
              src="https://via.placeholder.com/600x600?text=Item+Photo"
              alt={item.title}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                objectFit: 'cover',
                boxShadow: 1
              }}
            />
          </Grid>

          {/* RIGHT COLUMN: The Details */}
          {/* xs={12} full width on mobile, md={7} gives it ~60% width on desktop */}
          <Grid item xs={12} md={7}>
            <Stack spacing={2.5}>
              
              {/* Title & Status Badge side-by-side */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
                <Typography variant="h4" fontWeight="bold">
                  {item.title}
                </Typography>
                <Chip 
                  label={item.status === "LOST" ? "Lost Item" : "Found Item"}
                  color={item.status === "LOST" ? "error" : "success"}
                  sx={{ fontWeight: 'bold' }}
                />

                <Button variant = "contained" color = "warning" onClick={handleOpen}>Edit</Button>
                <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-item-modal-title"
    >
      <Box sx={modalStyle}>
        
        {/* Header with Close Button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography id="edit-item-modal-title" variant="h5" component="h2" fontWeight="bold">
            Edit Item
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* The Form Fields */}
        <Stack spacing={3}>
          
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="LOST">Lost Item</MenuItem>
            <MenuItem value="FOUND">Found Item</MenuItem>
          </TextField>

          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
          />

          {/* Multiline for the description */}
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />

          {/* Native HTML5 Date-Time Picker */}
          <TextField
            label="Publish Date"
            name="publishdate"
            type="datetime-local"
            value={formData.publishdate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true, // Keeps the label up so it doesn't overlap the date text
            }}
          />

          {/* Action Buttons at the bottom */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Box>

        </Stack>
      </Box>
    </Modal>
                <Button variant = "contained" color = "error">Delete</Button>
                

              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" textTransform="uppercase">
                  Published On
                </Typography>
                <Typography variant="body1">
                  {new Date(item.publishdate).toLocaleDateString()}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" textTransform="uppercase">
                  Location
                </Typography>
                <Typography variant="body1">
                  {item.location}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" textTransform="uppercase" gutterBottom>
                  Description
                </Typography>
                {/* Using a light grey box to make the description stand out */}
                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {item.description}
                  </Typography>
                </Paper>
              </Box>

            </Stack>
          </Grid>

        </Grid>
      </Paper>
    </Box>
  );
};
import React from "react";
import { item_data } from "../mock/items.mock";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useCreateItem } from "../hooks/useCreateItem";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500 }, // Responsive width
  maxHeight: "90vh", // Prevents it from going off-screen
  overflowY: "auto", // Adds a scrollbar if the screen is tiny
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (itemId: string) => {
    navigate(`/home/${itemId}`);
  };

  const item = item_data;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { mutate } = useCreateItem();

  const [formData, setFormData] = useState({
    title: "",
    status: "",
    location: "",
    description: "",
    // HTML datetime-local inputs require the format YYYY-MM-DDThh:mm
    publishdate: "",
  });

  // 3. Universal change handler for all inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 4. Submit handler
  const handleSave = () => {
    console.log("Saving new data to API:", formData);
    mutate({ data: formData });

    handleClose(); // Close the modal after saving
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4" color="primary">
        Lost & Found
      </Typography>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            fontWeight="bold"
            color="text.primary"
          >
            Recent Listings
          </Typography>

          <Button variant="contained" color="success" onClick={handleOpen}>
            Add Item
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-item-modal-title"
          >
            <Box sx={modalStyle}>
              {/* Header with Close Button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  id="edit-item-modal-title"
                  variant="h5"
                  component="h2"
                  fontWeight="bold"
                >
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Button onClick={handleClose} color="inherit">
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Modal>
        </Stack>
        {/* MUI's Grid handles the responsive columns */}
        <Grid container spacing={3}>
          {item.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              {/* The Card Component */}
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 3,
                }}
              >
                {/* CardActionArea wraps the content to make the whole card a clickable button with a ripple effect */}
                <CardActionArea
                  onClick={() => handleCardClick(item.id)}
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                  }}
                >
                  {/* Hardcoded Image */}
                  <CardMedia
                    component="img"
                    height="192"
                    src={item.img}
                    alt="Item placeholder"
                  />

                  {/* Card Text & Badges */}
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Status Badge using MUI Chip */}
                    <Box sx={{ mb: 1.5 }}>
                      <Chip
                        label={item.status}
                        color={item.status === "LOST" ? "error" : "success"}
                        size="small"
                        sx={{ fontWeight: "bold", letterSpacing: 0.5 }}
                      />
                    </Box>

                    {/* Item Title */}
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        lineHeight: 1.3,
                        // These properties truncate text with an ellipsis if it goes over 2 lines
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.title}
                    </Typography>

                    {/* Spacer to push the call-to-action to the bottom if the title is short */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* Call to action */}
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ mt: 2, fontWeight: "medium" }}
                    >
                      View Details &rarr;
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Stack>
  );
};

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

export const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const item = item_data.find((item) => item.id === id);

  
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

                <Button variant = "contained" color = "warning">Edit</Button>
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
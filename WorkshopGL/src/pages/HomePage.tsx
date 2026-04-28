import React from "react";
import { item_data } from "../mock/items.mock";
import { Container, Typography, Grid, Card, CardActionArea, CardMedia, CardContent, Box, Chip } from "@mui/material";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

export const HomePage: React.FC = () => {

    const item = item_data
    const navigate = useNavigate();

    const handleCardClick = (itemId: string) => {
        navigate(`/home/${itemId}`);
        
    };

  return (
    <div>
      <Typography variant = "h4" color = "primary">Lost & Found</Typography>

        <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" color="text.primary">
        Recent Listings
      </Typography>
      
      {/* MUI's Grid handles the responsive columns */}
      <Grid container spacing={3}>
        {item.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            
            {/* The Card Component */}
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
              
              {/* CardActionArea wraps the content to make the whole card a clickable button with a ripple effect */}
              <CardActionArea 
                onClick={() => handleCardClick(item.id)}
                sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
              >
                
                {/* Hardcoded Image */}
                <CardMedia
                  component="img"
                  height="192"
                  image="https://via.placeholder.com/400x300?text=Item+Image"
                  alt="Item placeholder"
                />
                
                {/* Card Text & Badges */}
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  
                  {/* Status Badge using MUI Chip */}
                  <Box sx={{ mb: 1.5 }}>
                    <Chip 
                      label={item.status} 
                      color={item.status === 'LOST' ? 'error' : 'success'} 
                      size="small" 
                      sx={{ fontWeight: 'bold', letterSpacing: 0.5 }} 
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
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* Spacer to push the call-to-action to the bottom if the title is short */}
                  <Box sx={{ flexGrow: 1 }} />

                  {/* Call to action */}
                  <Typography variant="body2" color="primary" sx={{ mt: 2, fontWeight: 'medium' }}>
                    View Details &rarr;
                  </Typography>

                </CardContent>
              </CardActionArea>
            </Card>
            
          </Grid>
        ))}
      </Grid>
    </Container>
    </div>
  );
};
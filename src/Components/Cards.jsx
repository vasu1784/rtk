import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import CardsData from "./CardsData";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  Grid,
  Box,
  Rating,
  CardActions,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Cards = () => {
  const [data, setData] = useState(CardsData);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, qnty: 1 }));
    toast.success(`${item.rname} added to cart!`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h2"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "primary.main",
          mb: 4,
        }}
      >
        Our Products
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {data.map((elem, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} sx={{ display: "flex" }}>
            <Card
              sx={{
                minHeight: 370,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                flex: 1,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 20px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                image={elem.imgdata}
                alt={elem.rname}
                sx={{
                  height: 160,
                  width: "100%",
                  objectFit: "cover",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: "bold", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {elem.rname}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {elem.address}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Rating value={4.5} precision={0.5} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    (4.5)
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  ₹{elem.price}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2, mt: 'auto' }}>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => handleAddToCart(elem)}
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    px: 3,
                  }}
                >
                  Add to Cart
                </Button>
                <IconButton color="primary" aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ToastContainer />
    </Container>
  );
};

export default Cards;

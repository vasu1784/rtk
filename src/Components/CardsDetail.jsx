import { useSelector, useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux/reducer/cartSlice"; // update path if needed

const CardsDetail = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Item card detail
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No items in the cart
        </Typography>
      ) : (
        cartItems.map((item) => (
          <Paper elevation={4} sx={{ p: 3, mb: 4, borderRadius: 3 }} key={item.id}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                  component="img"
                  src={item.imgdata}
                  alt={item.rname}
                  sx={{
                    width: 180,
                    height: 140,
                    objectFit: "cover",
                    borderRadius: 2,
                    boxShadow: 2,
                    display: 'block',
                  }}
                />
              </Grid>
              <Grid item xs={12} md={7} sx={{ minWidth: 0 }}>
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={7}>
                      <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Restaurant: <Box component="span" fontWeight="normal">{item.rname}</Box>
                      </Typography>
                      <Typography variant="body1">
                        Price: <b>₹{item.price}</b>
                      </Typography>
                      <Typography variant="body1" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: { xs: '100%', sm: 250, md: 300 } }}>
                        Dishes: <b>{item.address}</b>
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        Total: <b>₹{item.price * item.qnty}</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mr: 1 }}>
                          Rating:
                        </Typography>
                        <Rating value={Number(item.rating) || 4} precision={0.1} readOnly size="small" sx={{ mr: 1 }} />
                        <Typography variant="body2" sx={{ background: "#43a047", color: "#fff", px: 1.5, borderRadius: 1 }}>
                          {item.rating || "4"}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <b>Order Review:</b> {item.qnty || 1} order placed
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body2" fontWeight="bold" color="error" sx={{ mr: 1 }}>
                          Remove:
                        </Typography>
                        <IconButton color="error" onClick={() => dispatch(removeFromCart(item.id))}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  <Stack spacing={2} direction="row" alignItems="center">
                    <Button
                      variant="outlined"
                      onClick={() => dispatch(decrementQuantity(item.id))}
                      disabled={item.qnty === 1}
                      sx={{ minWidth: 40 }}
                    >
                      -
                    </Button>
                    <Typography variant="h6">{item.qnty}</Typography>
                    <Button
                      variant="outlined"
                      onClick={() => dispatch(incrementQuantity(item.id))}
                      sx={{ minWidth: 40 }}
                    >
                      +
                    </Button>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default CardsDetail;

import * as React from "react";
import Container from "react-bootstrap/Container";
import Badge from "@mui/material/Badge";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping,faSkullCrossbones} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {

    const cartItems = useSelector((state) => state.cart.cartItems || []);
 const totalQuantity = cartItems.reduce((acc, item) => acc + item.qnty, 0);
 const totalAmount = cartItems.reduce(
   (acc, item) => acc + item.price * item.qnty,
   0
 );


console.log(totalQuantity, "totalQuantity");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Nav.Link to="/cart" as={NavLink}>
          Add to Cart
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/link">
              Link
            </Nav.Link>
            <Nav.Link
              href="#cart"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Badge badgeContent={totalQuantity} color="primary">
                <FontAwesomeIcon icon={faCartShopping} />
              </Badge>
            </Nav.Link>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
                paper: {
                  sx: {
                    width: "800px",
                    padding: "10px",
                    position: "relative",
                  },
                },
              }}
            >
              <Box sx={{ position: "relative", p: 2 }}>
                <IconButton
                  onClick={handleClose}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                {cartItems.length > 0 ? (
                  <>
                    <Stack direction="row" spacing={2} alignItems="flex-start" divider={<Divider orientation="vertical" flexItem />}>
                      {cartItems.map((item) => (
                        <Box key={item.id} sx={{ minWidth: 200, maxWidth: 220, p: 1 }}>
                          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Box
                              component="img"
                              src={item.imgdata}
                              alt={item.rname}
                              sx={{ width: 80, height: 80, borderRadius: 2, mb: 1, objectFit: "cover", boxShadow: 1 }}
                            />
                            <Typography variant="subtitle1" fontWeight="bold" align="center">
                              {item.rname}
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ mt: 1 }}>Qty: {item.qnty}</Typography>
                          <Typography variant="body2">single unit Amount <b>₹{item.price}</b></Typography>
                          <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>
                            Total : ₹{item.price * item.qnty}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ textAlign: "right", pr: 2 }}>
                      <Typography variant="h6" fontWeight="bold">
                        Grand Total: ₹{totalAmount}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Your cart is Empty
                    </Typography>
                    <Box
                      component="img"
                      src="cart-empty.png"
                      alt="empty"
                      sx={{ width: 70, opacity: 0.7 }}
                    />
                  </Box>
                )}
              </Box>
            </Menu>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

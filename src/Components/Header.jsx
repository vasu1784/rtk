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
                  },
                },
              }}
            >
              <div className="cartmenu">
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((item) => (
                      <div key={item.id} className="cart-dropdown-item">
                        <img
                          src={item.imgdata}
                          alt={item.rname}
                          width="80"
                          height="80"
                        />
                        <div>
                          <p>
                            <strong>{item.rname}</strong>
                          </p>
                          <p>Qty: {item.qnty}</p>
                          <p>single unit Amount ₹{item.price}</p>
                          <p>
                            <strong>Total</strong> : ₹{item.price * item.qnty}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div
                      style={{
                        textAlign: "right",
                        marginTop: "10px",
                        padding: "0 10px",
                      }}
                    >
                      <strong>Grand Total: ₹{totalAmount}</strong>
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <p>Your cart is Empty</p>
                    <img
                      src="cart-empty.png"
                      alt="empty"
                      style={{ width: "70px" }}
                    />
                  </div>
                )}

                <FontAwesomeIcon
                  onClick={handleClose}
                  icon={faSkullCrossbones}
                  style={{
                    position: "absolute",
                    top: "3px",
                    right: "8px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </Menu>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

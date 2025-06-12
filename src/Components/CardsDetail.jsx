import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux/reducer/cartSlice"; // update path if needed

const CardsDetail = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems, "cartItems");
  const dispatch = useDispatch();

  return (
    <Container className="my-4">
      <h3>Item card detail</h3>

      {cartItems.length === 0 ? (
        <h5 className="text-center mt-4">No items in the cart</h5>
      ) : (
        cartItems.map((item) => (
          <div className="item-detail d-flex mt-4" key={item.id}>
            <div className="imgesec">
              <img
                src={item.imgdata}
                alt={item.rname}
                style={{ width: "400px", height: "100%" }}
              />
            </div>

            <div className="detailsection p-3">
              <Table>
                <tbody>
                  <tr>
                    <td>
                      <p>
                        <strong>Restaurant</strong> : {item.rname}
                      </p>
                      <p>
                        <strong>Price</strong> : ₹{item.price}
                      </p>
                      <p>
                        <strong>Dishes</strong> : {item.address}
                      </p>
                      <p>
                        <strong>Total</strong> : ₹{item.price * item.qnty}
                      </p>
                    </td>
                    <td>
                      <p style={{ background: "green" }}>
                        <strong>Rating :</strong> : {item.rating || "4"}
                      </p>
                      <p>
                        <strong>Order Review</strong> : {item.qnty || 1} order
                        placed
                      </p>
                      <p>
                        <strong>Remove :</strong>
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => dispatch(removeFromCart(item.id))}
                        />
                      </p>
                    </td>
                  </tr>
                </tbody>
              </Table>

              <Stack spacing={2} direction="row">
                <Button
                  variant="outlined"
                  onClick={() => dispatch(decrementQuantity(item.id))}
                  disabled={item.qnty === 1}
                >
                  -
                </Button>
                <span>{item.qnty}</span>
                <Button
                  variant="outlined"
                  onClick={() => dispatch(incrementQuantity(item.id))}
                >
                  +
                </Button>
              </Stack>
            </div>
          </div>
        ))
      )}
    </Container>
  );
};

export default CardsDetail;

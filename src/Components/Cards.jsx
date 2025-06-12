import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container';
import CardsData from "./CardsData";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
 import { addToCart } from "../redux/reducer/cartSlice";
const Cards = () => {
    const [data, setData] = useState(CardsData);
    const dispatch = useDispatch();
    const handleAddToCart = (item) => {
        dispatch(addToCart({ ...item, qnty: 1 }));
      console.log(item,"item detail")
      toast.success(`${item.rname} added to cart!`);
    };

  return (
    <Container>
      <h2 className="text-center mt-3">Product cart Data</h2>
      <Row>
        {data.map((elem, index) => (
          <Col key={index} md={4} className="mt-3">
            <Card style={{ width: "18rem" }}>
              <>
                <Card.Img
                  variant="top"
                  src={elem.imgdata}
                  style={{ height: "150px" }}
                />
                <Card.Body>
                  <Card.Title>{elem.rname}</Card.Title>
                  <p>{elem.address}</p>
                  <Card.Text>
                    RS:
                    {elem.price}
                  </Card.Text>

                  <div>
                    <Button
                      variant="primary"
                      onClick={() => handleAddToCart(elem)}
                    >
                      Add to Cart
                    </Button>
                    <ToastContainer />
                  </div>
                </Card.Body>
              </>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Cards;

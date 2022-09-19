import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

import {
  Img,
  Col,
  Wrap,
  Row,
  FadeIn,
  IconButton,
  Button,
} from "../../../core/ui";
import {
  Add,
  Close,
  Delete,
  Remove,
  ShoppingCart,
  ShoppingCartCheckout,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { getShopItemsFromStripe } from "../../../../network/actions";
import { fakeItems } from "./constants";

export default function Shopper({ innerRef }: any) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems]: any = useState([]);
  const [cart, setCart]: any = useState({});
  const [showCart, setShowCart]: any = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const visibleState = location.pathname === "/shop";
    setVisible(visibleState);
  }, [location]);

  useEffect(() => {
    setItems(fakeItems);
  }, []);

  useEffect(() => {
    // do cart animation
    console.log("do cart animation");
  }, [cart]);

  async function getItemsFromStripe() {
    setLoading(true);
    try {
      const res = await getShopItemsFromStripe();
      setItems(res);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  function editCart(key: string, value: number) {
    const c = { ...cart };
    let newValue = 0;
    if (c[key]) {
      newValue = c[key] + value;
    } else {
      newValue = value;
    }

    if (newValue > -1) {
      c[key] = newValue;
    } else {
      delete c[key];
    }

    setCart(c);
  }

  function removeFromCart(key: string) {
    const c = { ...cart };
    delete c[key];
    setCart(c);
  }

  const headerPadding = 20;
  const headerHeight = 100 - headerPadding * 2;

  const cartIsEmpty = !Object.keys(cart).length;
  return (
    <FadeIn
      fullScreen
      drift={40}
      direction='up'
      style={{ overflow: "hidden", zIndex: 400 }}
      isMounted={visible}
      dismountCallback={() => {
        navigate("/top");
      }}
    >
      <>
        <Header style={{ height: headerHeight, padding: headerPadding }}>
          <IconButton onClick={() => setVisible(false)}>
            <Close style={{ fontSize: 40 }} />
          </IconButton>

          {/* <Title>Shop</Title> */}

          <Row style={{ alignItems: "center" }}>
            <IconButton
              style={{ marginRight: 30, border: "1px solid #1976d2" }}
              variant={cartIsEmpty ? "outlined" : "contained"}
              size='large'
              onClick={() => setShowCart(false)}
            >
              {cartIsEmpty ? (
                <ShoppingCartOutlined
                  style={{ fontSize: 30, color: "#1976d2" }}
                />
              ) : (
                <ShoppingCart style={{ fontSize: 30, color: "#1976d2" }} />
              )}
            </IconButton>
            <Button variant='contained'>Checkout</Button>
          </Row>
        </Header>

        <Wrap
          ref={innerRef}
          style={{
            height: `calc(100vh - ${headerHeight}px`,
            overflow: "auto",
          }}
        >
          <Row
            style={{
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              padding: 40,
            }}
          >
            {items?.map((item: any, index: number) => {
              const product_id = item.product_id;
              console.log("product_id", product_id);

              let amount = cart[product_id] !== 0 && cart[product_id];
              return (
                <Item key={"items" + index}>
                  <Img
                    style={{
                      width: "100%",
                      height: 300,
                      backgroundSize: "cover",
                      position: "relative",
                    }}
                    src={"bakery.jpg"}
                  >
                    {amount && (
                      <ItemOverlay>
                        <Quantity>{amount}</Quantity>
                      </ItemOverlay>
                    )}
                  </Img>
                  <Col
                    style={{
                      padding: 20,
                      justifyContent: "center",
                    }}
                  >
                    <Row style={{ minHeight: 70 }}>
                      <ItemLabel>{item.label}</ItemLabel>
                    </Row>
                    {/* <Row style={{ height: 50 }}>
                      {item.options?.map((o: any, i: number) => {
                        return (
                          <Option key={index + "_options_" + i}>
                            {o.label}
                          </Option>
                        );
                      })}
                    </Row> */}

                    <Row
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {amount ? (
                        <Button
                          size='large'
                          variant='outlined'
                          onClick={() => removeFromCart(product_id)}
                          style={{
                            height: 50,
                            color: "#888",
                            borderColor: "#888",
                          }}
                        >
                          <Delete />
                        </Button>
                      ) : (
                        <div />
                      )}

                      <Button
                        startIcon={<Add />}
                        size='large'
                        variant='contained'
                        onClick={() => editCart(product_id, 1)}
                      >
                        Add
                      </Button>
                    </Row>
                  </Col>
                </Item>
              );
            })}
          </Row>
          <div style={{ height: 100, minHeight: 100 }} />
        </Wrap>
      </>
    </FadeIn>
  );
}

const ItemOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #ffffff55;
`;

const Quantity = styled.div`
  font-size: 70px;
`;

const ItemLabel = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
`;

const Item = styled.div`
  width: 320px;

  // margin-right: 40px;
  margin-bottom: 40px;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;
`;

const Option = styled.div`
  margin-right: 10px;
  background: #ddd;
  border-radius: 40px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Price = styled.div`
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;
  color: #000;
`;

const Title = styled.div`
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;
  color: #000;
`;

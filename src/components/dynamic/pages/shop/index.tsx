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
  Modal,
  ModalBody,
  TextField,
  Loading,
} from "../../../core/ui";
import * as mui from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import {
  Add,
  ArrowBack,
  Close,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  getProductsFromStripe,
  getStripeProductSession,
} from "../../../../network/actions";
import { initialValues } from "./constants";
import { loadStripe } from "@stripe/stripe-js";
import { SessionResponse } from "../../../../types";
import Form from "../../../core/form";
import { shopSchema } from "../../../core/form/schema";
import FadeInWrapper from "../../../core/ui/hoc/fadeInWrapper";
import { useIsMobile } from "../../../../hooks";

const pk = process.env.REACT_APP_STRIPE_PUBLIC_KEY || "none";
const stripePromise = loadStripe(pk);

const accentColor = "#FF007F";

const StyledBadge = mui.styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -5,
    top: 0,
    fontSize: 15,
    borderRadius: 100,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "10px 6px",
    background: accentColor,
  },
}));

function convertPrice(price: string | null): number {
  let p = 0;
  if (price) {
    // stripe uses cents
    p = parseInt(price) / 100;
  }
  return p;
}

export default function Shopper({ innerRef }: any) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedItem, setFocusedItem]: any = useState(null);
  const [items, setItems]: any = useState([]);
  const [cart, setCart]: any = useState({});
  const [showCart, setShowCart]: any = useState(false);
  const [showCheckout, setShowCheckout]: any = useState(false);
  const [checkoutLoading, setCheckoutLoading]: any = useState(false);

  const isMobile = useIsMobile();

  useEffect(() => {
    if (visible) getItemsFromStripe();
  }, [visible]);

  async function getItemsFromStripe() {
    setLoading(true);
    try {
      const res = await getProductsFromStripe();
      setItems(res);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  function cartWithoutNulls() {
    const c = { ...cart };
    Object.keys(c).forEach((key) => {
      const v = c[key];
      if (!v) delete c[key];
    });
    return c;
  }

  async function forwardToStripe(form: any) {
    const products = cartWithoutNulls();

    try {
      setCheckoutLoading(true);
      const session: SessionResponse = await getStripeProductSession({
        products,
        form,
      });
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe didnt load");
      await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });
    } catch (e) {
      console.log(e);
      setCheckoutLoading(false);
    }
  }

  function editCart(key: string, value: number) {
    const c = { ...cart };

    if (value < 1) {
      delete c[key];
    } else {
      c[key] = value;
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

  let cartSum = 0;
  let subtotal = 0;
  Object.keys(cart).forEach((k) => {
    if (cart[k]) {
      const quantity = parseInt(cart[k]);
      cartSum += quantity;
      const thisItem = items?.find((f: any) => f.id === k);
      const price = convertPrice(thisItem?.metadata?.price);
      const itemOrderPrice = quantity * price;
      subtotal += itemOrderPrice;
    }
  });

  const cartList = (
    <Col style={{ width: "100%" }}>
      {Object.keys(cart).map((id: string, index: number) => {
        const amt = cart[id];
        const item = items.find((f: any) => f.id === id);
        const price = convertPrice(item?.metadata?.price).toFixed(2);
        return (
          <Row
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
            key={"cart_" + index}
          >
            <Row style={{ alignItems: "center" }}>
              <IconButton
                style={{ marginRight: 10 }}
                onClick={() => removeFromCart(id)}
                size='small'
              >
                <Close />
              </IconButton>
              <CartItemLabel>
                {item?.name} (${price})
              </CartItemLabel>
            </Row>
            <TextField
              type={"number"}
              height={20}
              padding={10}
              maxLength={"100"}
              style={{ width: 80, minWidth: 60 }}
              onChange={(e: any) => {
                const val = e.target.value;
                if (val > 100) return;
                editCart(id, val);
              }}
              value={amt}
            />
          </Row>
        );
      })}

      {!Object.keys(cart).filter((p_id: string) => {
        const amt = cart[p_id];
        return amt ? true : false;
      }).length && (
        <div style={{ marginBottom: 10 }}>No items in your cart</div>
      )}

      <Row
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <div>SUBTOTAL:</div>
        <Total>${subtotal?.toFixed(2)}</Total>
      </Row>
    </Col>
  );

  const headerControls = (
    <>
      <IconButton
        style={{ marginRight: 30, border: "1px solid #1976d2" }}
        variant={cartIsEmpty ? "outlined" : "contained"}
        size='large'
        onClick={() => setShowCart(true)}
      >
        <StyledBadge badgeContent={cartSum} color='secondary'>
          {cartIsEmpty ? (
            <ShoppingCartOutlined style={{ fontSize: 30, color: "#1976d2" }} />
          ) : (
            <ShoppingCart style={{ fontSize: 30, color: "#1976d2" }} />
          )}
        </StyledBadge>
      </IconButton>
      <Button
        disabled={cartSum < 1}
        variant='contained'
        onClick={() => setShowCheckout(true)}
      >
        Checkout
      </Button>
    </>
  );

  const shoppingBody = (
    <>
      <Row
        style={{
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "40px",
          width: "calc(100% - 80px)",
        }}
      >
        {items?.length ? (
          items.map((item: any, index: number) => {
            return (
              <ItemComponent
                key={"it" + index}
                style={{ marginRight: isMobile ? 0 : 40 }}
                removeFromCart={removeFromCart}
                setFocusedItem={setFocusedItem}
                editCart={editCart}
                cart={cart}
                item={item}
                index={index}
              />
            );
          })
        ) : (
          <div>No items available. Check back later!</div>
        )}
      </Row>
      <div style={{ height: 100, minHeight: 100 }} />

      <Modal open={showCart} onClose={() => setShowCart(false)}>
        <ModalBody>
          {cartList}

          <Button
            disabled={cartSum < 1}
            style={{ width: "100%", marginTop: 30 }}
            variant='contained'
            onClick={() => {
              setShowCart(false);
              setShowCheckout(true);
            }}
          >
            Checkout
          </Button>
        </ModalBody>
      </Modal>

      <Modal
        open={focusedItem ? true : false}
        onClose={() => setFocusedItem(null)}
      >
        <ModalBody>
          <ItemComponent
            readOnly={true}
            // removeFromCart={removeFromCart}
            // setShowDescription={setShowDescription}
            // editCart={editCart}
            cart={cart}
            item={focusedItem}
          />
        </ModalBody>
      </Modal>

      <FadeIn
        drift={40}
        fullScreen
        withOverlay
        close={() => setShowCheckout(false)}
        style={{
          overflow: "hidden",
          zIndex: 100,
          // display: "flex",
          // justifyContent: "flex-end",
        }}
        isMounted={showCheckout}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            overflow: "auto",
            left: isMobile ? 0 : "calc(100% - 500px)",
            width: isMobile ? "calc(100% - 80px)" : 500 - 80,
            background: "#fff",
            padding: 40,
            display: "flex",
            flexDirection: "column",
            height: "calc(100% - 80px)",
          }}
        >
          {isMobile && (
            <div
              style={{
                marginBottom: 20,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Button
                startIcon={<ArrowBack />}
                onClick={() => setShowCheckout(false)}
                size='large'
              >
                Back
              </Button>
            </div>
          )}
          <div>
            <div>Please Read Before Ordering:</div>
            <div
              style={{
                margin: "10px 0 40px",
                fontWeight: 400,
                color: "#4d8dff",
              }}
            >
              Pastry pickup will be ready by 9am. Pastry orders must be placed
              at least 48-hours in advance. Pickup instructions will also be
              sent out in a confirmation email.
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>Shopping Cart</div>
          <div
            style={{
              borderRadius: 6,
              padding: 20,
              paddingTop: 30,
              border: "1px solid #999",
              marginBottom: 50,
            }}
          >
            {cartList}
          </div>
          <Form
            initialValues={initialValues}
            getFormState={() => console.log("form state")}
            schema={shopSchema}
            disabled={cartSum < 1}
            loading={checkoutLoading}
            submitText={"Final Checkout"}
            buttonStyle={{
              marginTop: 20,
              width: "100%",
            }}
            onSubmit={forwardToStripe}
          />
        </div>
      </FadeIn>
    </>
  );

  return (
    <FadeInWrapper
      path='/shop'
      onMount={getItemsFromStripe}
      headerControls={headerControls}
    >
      {loading ? (
        <Wrap center>
          <Loading />
        </Wrap>
      ) : (
        shoppingBody
      )}
    </FadeInWrapper>
  );
}

const ItemComponent = ({
  readOnly,
  index,
  cart,
  item,
  removeFromCart,
  setFocusedItem,
  editCart,
  style,
}: any) => {
  const id = item.id;
  let amount = cart[id] !== 0 && cart[id];

  const textOverflowStyle = readOnly ? {} : {};

  const price = convertPrice(item.metadata?.price).toFixed(2);
  const isMobile = useIsMobile();

  return (
    <Item
      isMobile={isMobile}
      style={{ marginBottom: readOnly && 0, ...style }}
      key={"items" + index}
    >
      <Img
        style={{
          width: "100%",
          height: 240,
          backgroundSize: "cover",
          position: "relative",
        }}
        src={(item.images?.length && item.images[0]) || "noimage.jpg"}
      >
        {!readOnly && amount && (
          <>
            <Button
              size='large'
              variant='contained'
              onClick={() => removeFromCart(id)}
              style={{
                height: 60,
                width: 60,
                background: "#333",
                zIndex: 10,
              }}
            >
              <Close />
            </Button>

            <ItemOverlay>
              <Quantity>{amount}</Quantity>
            </ItemOverlay>
          </>
        )}

        <Price>${price}</Price>
      </Img>
      <Col
        style={{
          padding: 20,
          justifyContent: "center",
        }}
      >
        <TextWrap
          onClick={() => {
            // if (!readOnly) setFocusedItem(item);
          }}
        >
          <ItemLabel style={textOverflowStyle}>{item.name}</ItemLabel>
          <ItemDescription style={textOverflowStyle}>
            {item.description}
          </ItemDescription>
        </TextWrap>
        {/* <Row style={{ height: 50 }}>
      {item.options?.map((o: any, i: number) => {
        return (
          <Option key={index + "_options_" + i}>
            {o.label}
          </Option>
        );
      })}
    </Row> */}

        {!readOnly && (
          <Button
            startIcon={<Add />}
            size='large'
            variant='contained'
            style={{ width: "100%" }}
            onClick={() => {
              let amt = amount || 0;
              editCart(id, amt + 1);
            }}
          >
            Add
          </Button>
        )}
      </Col>
    </Item>
  );
};

const ItemOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #00000055;
  z-index: 2;
`;

const Total = styled.div``;

const Quantity = styled.div`
  font-size: 70px;
  color: #fff;
`;

const TextWrap = styled.div`
  // cursor: pointer;
`;

const ItemLabel = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  cursor: pointer;
`;

const ItemDescription = styled.div`
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  cursor: pointer;
`;

const CartItemLabel = styled.div`
  font-size: 16px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
  z-index: 20;
`;

type ItemProps = {
  isMobile?: boolean;
};

const Item = styled.div<ItemProps>`
  width: 280px;
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
  font-weight: 400;
  border-top-left-radius: 6px;
  display: flex;
  padding: 10px 20px;
  position: absolute;
  right: 0;
  bottom: 0;
  background: #ffffffcc;
  color: #000;
`;

const Title = styled.div`
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;
  color: #000;
`;

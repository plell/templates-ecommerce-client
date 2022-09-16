import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IconButton } from "..";
import { ArrowBack } from "@mui/icons-material";
import { sleep } from "../../helpers";

export function FadeInOverlay(props: any) {
  const {
    drift,
    isMounted,
    dismountCallback,
    style,
    fullScreen,
    onClose,
    children,
    alwaysRender,
    noFadeOnInit,
    direction,
    withOverlay,
    overlayClick,
    noFade,
  } = props;
  const [translation, setTranslation] = useState(drift ? drift : -40);
  const [opacity, setOpacity] = useState(0);
  const [shouldRender, setShouldRender] = useState(false);

  function open() {
    setTranslation(0);
    setOpacity(1);
  }

  function close() {
    setTranslation(drift ? drift : -40);
    setOpacity(0);
  }

  function doAnimation(value: number) {
    if (value === 1) {
      open();
    } else {
      close();
    }
  }

  useEffect(() => {
    if (noFadeOnInit) {
      setOpacity(1);
      setTranslation(0);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (!isMounted) {
        let speed = 200;
        if (props.speed) speed = props.speed;
        doAnimation(0);
        await sleep(speed);
        setShouldRender(false);
        if (dismountCallback) dismountCallback();
      } else {
        setShouldRender(true);
        await sleep(5);
        doAnimation(1);
      }
    })();
  }, [isMounted]);

  if (!alwaysRender && !shouldRender) return <div />;

  const transformValue =
    direction === "up"
      ? `translateY(${translation}px)`
      : `translateX(${translation}px)`;

  const fullScreenStyle = fullScreen
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        background: "#fff",
        height: "100%",
        width: "100%",
        overflow: "auto",
      }
    : {};

  if (withOverlay) {
    return (
      <Overlay
        style={{
          ...fullScreenStyle,
          ...style,
          background: "#000000cc",
          opacity: !noFade ? opacity : 1,
        }}
      >
        <Fader
          id='fade-in-top-level-overlay'
          onClick={(e) => {
            let elString: any = e.target;
            elString = elString.outerHTML;
            // close if clicking the overlay
            if (
              elString &&
              elString.includes('id="fade-in-top-level-overlay"')
            ) {
              if (overlayClick) overlayClick();
              else if (props.close) props.close();
            }
          }}
          // onClick={(e) => e.stopPropagation()}
          style={{ height: "inherit", ...style, transform: transformValue }}
        >
          {children}
        </Fader>
      </Overlay>
    );
  }
  return (
    <Fader
      style={{
        height: "inherit",
        ...fullScreenStyle,
        ...style,
        transform: transformValue,
        opacity: !noFade ? opacity : 1,
      }}
    >
      <>
        {onClose && (
          <IconButton
            onClick={() => onClose()}
            style={{
              top: 20,
              left: 20,
              display: "flex",
              position: "fixed",
              justifyContent: "flex-start",
            }}
          >
            <ArrowBack style={{ fontSize: 50 }} />
          </IconButton>
        )}
        {children}
      </>
    </Fader>
  );
}

const Fader = styled.div`
  transition: all 0.2s;
`;
const Overlay = styled.div`
  transition: all 0.2s;
  width: 100%;
  height: 100%;
`;

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Wrap } from "../../core/ui";

export default function Top() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef: any = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (videoLoaded && videoRef.current) {
      setTimeout(() => {
        videoRef.current?.play();
      }, 400);
    }
  }, [videoLoaded, videoRef?.current]);

  return (
    <TopWrap>
      <video
        ref={videoRef}
        onLoadedData={() => setVideoLoaded(true)}
        loop
        autoPlay
        style={{
          transition: "opacity 1s",
          height: 600,
          minHeight: 600,
          opacity: videoLoaded ? 1 : 0,
        }}
      >
        <source src='images/cake_movie.mp4' type='video/mp4'></source>
      </video>

      <Wrap style={{ position: "absolute" }}>
        <Title>Lazy Cow Bakery</Title>

        <Sub>100% plant-based</Sub>
        <Spacer />

        <Button
          variant='contained'
          style={{ fontSize: 100, background: "purple", color: "#fff7dc" }}
          size={"large"}
          onClick={() => navigate("order")}
        >
          ORDER A CAKE
        </Button>
      </Wrap>
    </TopWrap>
  );
}

const Spacer = styled.div`
  height: 60px;
`;

const VideoWrap = styled.div`
  height: 100%;
  width: 100%;
  background: yellow;
  position: absolute;
  top: 0;
  left: 0;
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
  width: calc(100% - 20px);
  color: #639aff;
  font-weight: 700;
  padding: 50px 10px 0;

  // background: #639aff;

  // background-image: url("${(p) => "images/cafe.jpeg"}");
  // background-position: center;
  // background-size: cover;
  // background-repeat: no-repeat;
`;

const Title = styled.div`
  font-size: 70px;
  // text-align: center;
  // width: 380px;
  margin-bottom: 10px;
  z-index: 1;
  -webkit-text-stroke: 2px black;
`;

const Sub = styled.div`
  font-size: 28px;
  color: #fff7dc;
  -webkit-text-stroke: 1px black;
  z-index: 1;
`;

import styled from "styled-components";

export default function Home() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <iframe
        height='100%'
        width='100%'
        src='https://www.youtube.com/embed/vhI13E49PgI?autoplay=1'
        title='Lazy Cow Bakery Video'
        frameBorder='0'
        allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </div>
  );
}

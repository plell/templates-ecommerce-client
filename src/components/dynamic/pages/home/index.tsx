import { PageWrap } from "../../../core/ui";

export default function Home({ innerRef }: any) {
  return (
    <PageWrap ref={innerRef}>
      <iframe
        height='100%'
        width='100%'
        src='https://www.youtube.com/embed/vhI13E49PgI?autoplay=1'
        title='Lazy Cow Bakery Video'
        frameBorder='0'
        allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </PageWrap>
  );
}

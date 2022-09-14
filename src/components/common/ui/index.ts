import styled from 'styled-components'

export const Wrap = styled.div`
display:flex;
flex-direction:column;
align-items:center;
height:100%;
width:100%;
`;
export const Col = styled.div`
display:flex;
flex-direction:column;
`;

export const Row = styled.div`
display:flex;
`;

type ImgProps = {
      src: string,
      isMobile?:boolean
}

export const Img = styled.div<ImgProps>`
      background-image: url("${(p) => 'images/'+p.src}");
      background-position: center;
      background-size: contain;
      background-repeat:no-repeat;
      height: ${(p) => p.isMobile ? '400px' : '440px'};
      width: ${(p) => p.isMobile ? '400px' : '100%'};
      `;
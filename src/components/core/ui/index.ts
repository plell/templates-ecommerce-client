import styled from 'styled-components'
import * as mui from '@mui/material'


export const Modal:any = styled(mui.Modal)`
display:flex;
justify-content:center;
align-items:center;
`;

export const ModalBody: any = styled.div`
display:flex;
flex-direction:column;
// justify-content:center;
align-items:center;
padding:40px;
min-width:280px;
min-height:200px;
background:#fff;
`;


export const Input:any = styled(mui.Input)`

`;
export const TextField:any = styled(mui.TextField)`

`;
export const Select:any = styled(mui.Select)`

`;
export const MenuItem:any = styled(mui.MenuItem)`

`;
export const FormControl:any = styled(mui.FormControl)`

`;
export const FloatLabel:any = styled(mui.InputLabel)`
left:-13px !important;
`;

export const InputLabel:any = styled(mui.InputLabel)`

`;

export const ToggleButton: any = styled(mui.ToggleButton)`

`;

export const Button:any = styled(mui.Button)`
text-transform: none !important;
`;

export const Wrap = styled.div`
display:flex;
flex-direction:column;
align-items:center;
flex:1;
`;

export const FieldWrap = styled.div`
margin:10px 0;
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
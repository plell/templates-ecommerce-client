import styled from 'styled-components'
import * as mui from '@mui/material'
import { FadeInOverlay } from './animated/fadeInOverlay'
import CircularProgress from '@mui/material/CircularProgress';

export const Loading = CircularProgress

export const FadeIn = FadeInOverlay

export const Modal:any = styled(mui.Modal)`
display:flex;
justify-content:center;
align-items:center;
`;

export const ModalBody: any = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
padding:40px;
border-radius:10px;
min-width:280px;
min-height:100px;
max-height:600px;
background:#fff;
overflow:auto;
`;


export const Input:any = styled(mui.Input)`

`;

export const TextArea:any = styled(mui.TextareaAutosize)`
min-height:200px;
`;

type TextFieldProps = {
      height?: number;
      padding?: number;
}
export const TextField:any = styled(mui.TextField)<TextFieldProps>`
background:#fff;

input {
      height: ${(p) => p.height && p.height + 'px'};
      padding: ${(p) => p.padding && p.padding + 'px'};
}
`;
export const Select:any = styled(mui.Select)`

`;
export const MenuItem:any = styled(mui.MenuItem)`

`;
export const FormControl:any = styled(mui.FormControl)`

`;

type LabelProps = {
      err?: string;
}

export const FloatLabel:any = styled(mui.InputLabel)<LabelProps>`
left:-13px !important;
${p=>p.err&&'color:#be9514 !important;'}
`;

export const InputLabel:any = styled(mui.InputLabel)<LabelProps>`
${p=>p.err&&'color:#be9514 !important;'}
`;

export const ToggleButton: any = styled(mui.ToggleButton)`

`;

export const IconButton: any = styled(mui.IconButton)`
font-size:20px !important;
text-transform: none !important;
`;

export const Button: any = styled(mui.Button)`
font-size:20px !important;
text-transform: none !important;
`;

type WrapProps = {
      center?: boolean;
}

export const Wrap = styled.div<WrapProps>`
display:flex;
flex-direction:column;
align-items:center;
${p=>p.center&&'justify-content:center;'}
flex:1;
width:100%;
`;

export const PageWrap = styled.div`
display:flex;
flex-direction:column;
flex-wrap:wrap;
flex:1;
width:100%;
padding-top:30px;
margin-bottom:30px;
`;

export const FieldWrap = styled.div`
margin:10px 0 15px;
`;


export const Col = styled.div`
display:flex;
flex-direction:column;
`;

export const Spacer = styled.div`
height:60px;
`;


export const Row = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:center;
`;

type ImgProps = {
      src: string,
      isMobile?:boolean
}

export const Img = styled.div<ImgProps>`
      background-image: url("${(p) => p.src}");
      background-position: center;
      background-size: contain;
      background-repeat:no-repeat;
      height: ${(p) => p.isMobile ? '400px' : '440px'};
      width: ${(p) => p.isMobile ? '400px' : '100%'};
      `;


export const Title = styled.div`
  font-size: 36px;
  margin: 55px 0 30px;
`;
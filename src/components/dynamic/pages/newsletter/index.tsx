import styled from "styled-components";

export default function Newsletter() {
    return (
        <Wrap>
            <Title>
                Join our newsletter!
            </Title>
        
            <Txt>
                You'll be the first to know about seasonal menu changes, special events, and more!   
            </Txt>
        </Wrap>
    )
}

const Wrap = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding:30px;
    background:#d9fff6;
    width:100%;
    height:100%;
    `;

    const Txt = styled.div`
    
    
    `;

    const Title = styled.div`
    
    
    `;
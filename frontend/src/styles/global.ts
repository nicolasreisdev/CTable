import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

a {
    font-weight: 500;
    color: ${props => props.theme['black']};
    text-decoration: inherit;
}

a:hover {
    color: ${props => props.theme['black']};
}

body {
    background: ${props => props.theme['white']};
    color: ${props => props.theme['black']};
    /* margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh; */
}

body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
}

`
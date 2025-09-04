import { createGlobalStyle } from "styled-components";
import { colors } from "./themes";


const GlobalStyle = createGlobalStyle`

@font-face {
    font-family: 'Escoredream';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-1Thin.woff') format('woff');
    font-weight: 100;
    font-display: swap;
}

@font-face {
    font-family: 'Escoredream';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-2ExtraLight.woff') format('woff');
    font-weight: 200;
    font-display: swap;
}

@font-face {
    font-family: 'Escoredream';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
    font-weight: 300;
    font-display: swap;
}

@font-face {
    font-family: 'Escoredream';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-4Regular.woff') format('woff');
    font-weight: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Escoredream';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-5Medium.woff') format('woff');
    font-weight: 500;
    font-display: swap;
}

@font-face {
    font-family: 'Escoredream';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-6Bold.woff') format('woff');
    font-weight: 600;
    font-display: swap;
}

@font-face {
    font-family: 'Escoredream';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-7ExtraBold.woff') format('woff');
    font-weight: 700;
    font-display: swap;
}

@font-face {
    font-family: 'Escoredream';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-8Heavy.woff') format('woff');
    font-weight: 800;
    font-display: swap;
}

@font-face {
    font-family: 'Escoredream';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-9Black.woff') format('woff');
    font-weight: 900;
    font-display: swap;
}




  body {
    font-family: 'Escoredream', sans-serif;
    margin: 0 auto;
    align-items: center;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex
;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    /* -webkit-align-items: center; */
    /* -webkit-box-align: center; */
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    background-color: ${colors.secondary200};
  }

`;

export default GlobalStyle;
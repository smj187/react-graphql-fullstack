import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
	@import url("https://fonts.googleapis.com/css?family=Varela+Round&display=swap");
	@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
	@import url('https://fonts.googleapis.com/css?family=Questrial&display=swap');
	@import url('https://fonts.googleapis.com/css?family=Comfortaa|Crete+Round|Fira+Code|Hind+Madurai|IBM+Plex+Sans|Istok+Web|Kalam|Maven+Pro|Noto+Sans+SC|PT+Sans+Caption|Patua+One|Prompt|Rokkitt|Signika&display=swap');
	@import url('https://fonts.googleapis.com/css?family=Lato:400,700,900|Roboto:400,700,900&display=swap');
	@import url('https://fonts.googleapis.com/css?family=Anton&display=swap');
	@import url('https://fonts.googleapis.com/css?family=Lato:700&display=swap');
	
	@font-face {
    font-family: 'Roobert Heavy';
    font-style: normal;
    font-weight: normal;
    src: local('Roobert Heavy'), url('RoobertHeavy.woff') format('woff');
}

	@font-face {
			font-family: 'Roobert Medium';
			font-style: normal;
			font-weight: normal;
			src: local('Roobert Medium'), url('../fonts/RoobertMedium.woff') format('woff');
	}


	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

  body {
		height: 100vh;
		/* font-family: 'Open Sans', sans-serif;
		font-family: 'Maven Pro', sans-serif;
		font-family: 'Questrial', sans-serif;
		font-family: 'PT Sans Caption', sans-serif;
		font-family: 'Lato', sans-serif;
		font-family: "Varela Round", sans-serif; */
		font-family: sans-serif;
		font-family: 'Roboto', sans-serif;
		font-family: 'Lato', sans-serif;
		font-family: 'Roobert Medium', sans-serif;
		font-family: 'Roobert Regular', sans-serif;
		/* line-height: 1.5;
		font-weight: 500;
		
		text-rendering: optimizeLegibility;
		letter-spacing: 0;
		-webkit-font-smoothing: antialiased;  */
  }
`

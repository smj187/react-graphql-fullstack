import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`

	
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
		font-family: 'Roobert Medium', sans-serif;
		font-family: 'Roobert Regular', sans-serif;

  }
`

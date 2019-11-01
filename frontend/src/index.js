import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"

import { ThemeProvider } from "styled-components"
import { GlobalStyle, Theme } from "./styles"

import { ProvideAuth } from "./hooks/useAuth"
import { ProvideToast } from "./hooks/useToast"

import ApolloClient from "apollo-client"
import { ApolloProvider } from "@apollo/react-hooks"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloLink } from "apollo-link"
import { onError } from "apollo-link-error"
import { createUploadLink } from "apollo-upload-client"

// STYLED COMPONENTS
const StyledComponents = () => (
	<ThemeProvider theme={Theme}>
		<ProvideToast>
			<App />
			<GlobalStyle />
		</ProvideToast>
	</ThemeProvider>
)

//  CONTEXT
const Auth = () => (
	<ProvideAuth>
		<StyledComponents />
	</ProvideAuth>
)

// APOLLO

const authLink = new ApolloLink((operation, forward) => {
	const token = localStorage.getItem("token")

	operation.setContext({
		headers: {
			authorization: token ? `Bearer ${token}` : ""
		}
	})

	return forward(operation)
})

const client = new ApolloClient({
	link: ApolloLink.from([
		onError(({ graphQLErrors }) => {
			// console.log("error", graphQLErrors[0])
		}),
		authLink,
		createUploadLink({
			uri: "http://localhost:5000/graphql",
			credentials: "same-origin"
		})
	]),
	cache: new InMemoryCache()
})

const Apollo = () => (
	<ApolloProvider client={client}>
		<Auth />
	</ApolloProvider>
)

// AUTH

ReactDOM.render(<Apollo />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

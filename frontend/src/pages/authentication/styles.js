import styled, { css } from "styled-components"

export const Container = styled.div`
	width: 100%;
	height: 100vh;
`
export const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 30rem;
	border-radius: 5px;
	padding: 2rem 3rem;
	background: ${({ theme }) => theme.color9};
	box-shadow: 0 2px 10px 0 ${({ theme }) => theme.shadow1};

	${({ animate }) =>
		animate &&
		css`
			transition: all 0.2s;
			animation: shake 0.2s ease-in-out;
			top: 20vh;

			@keyframes shake {
				0% {
					transform: translateX(0);
				}

				50% {
					transform: translateY(-10px);
				}

				100% {
					transform: translateY(0);
				}
			}
		`}

	@media (min-width: 903px) {
		position: absolute;
		right: 0;
		margin-right: 20vw;
	}
	@media (max-width: 902px) {
		position: relative;
		margin: 0 auto;
		border: 1px solid red;
	}
`

export const PasswordFieldWrapper = styled.div`
	position: relative;
	height: ${({ hasError }) => (hasError ? "6rem" : "4.22375rem")};

	> :last-child {
		position: absolute;
		top: 2.1rem;
		right: 1rem;
		cursor: pointer;
		color: ${({ theme }) => theme.color5};
	}
`

export const SwitchWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-top: 0.5rem;

	> :first-child {
		font-size: 1rem;
		width: auto;
	}

	> :last-child {
		margin-left: 0.25rem;
		font-size: 1rem;
		width: auto;
	}
`

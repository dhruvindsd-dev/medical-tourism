import { Button, createStyles, Image, Notification, PasswordInput, Text, TextInput, useMantineTheme } from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { EMAIL_VALIDATION_REGEX } from "../../config/constants"
import { D_HOME_ROUTES, D_ROUTES } from "../../config/routes"
import { authContext } from "../../context/authContext"
import AuthLayout from "../../layouts/AuthLayout"
import { getToken } from "../../services/AuthService/AuthService"

interface indexProps {}

const useStyles = createStyles((theme) => ({
	wrapper: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "100vh",
		backgroundColor: "#55008e",
		backgroundAttachment: "fixed",
		backgroundSize: "contain",
		backgroundImage:
			"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 1000'%3E%3Cg %3E%3Ccircle fill='%2355008E' cx='50' cy='0' r='50'/%3E%3Cg fill='%235c1294' %3E%3Ccircle cx='0' cy='50' r='50'/%3E%3Ccircle cx='100' cy='50' r='50'/%3E%3C/g%3E%3Ccircle fill='%23621f9a' cx='50' cy='100' r='50'/%3E%3Cg fill='%23682aa0' %3E%3Ccircle cx='0' cy='150' r='50'/%3E%3Ccircle cx='100' cy='150' r='50'/%3E%3C/g%3E%3Ccircle fill='%236f34a6' cx='50' cy='200' r='50'/%3E%3Cg fill='%23753eab' %3E%3Ccircle cx='0' cy='250' r='50'/%3E%3Ccircle cx='100' cy='250' r='50'/%3E%3C/g%3E%3Ccircle fill='%237c47b1' cx='50' cy='300' r='50'/%3E%3Cg fill='%238250b7' %3E%3Ccircle cx='0' cy='350' r='50'/%3E%3Ccircle cx='100' cy='350' r='50'/%3E%3C/g%3E%3Ccircle fill='%238959bd' cx='50' cy='400' r='50'/%3E%3Cg fill='%238f62c2' %3E%3Ccircle cx='0' cy='450' r='50'/%3E%3Ccircle cx='100' cy='450' r='50'/%3E%3C/g%3E%3Ccircle fill='%23966bc8' cx='50' cy='500' r='50'/%3E%3Cg fill='%239c73ce' %3E%3Ccircle cx='0' cy='550' r='50'/%3E%3Ccircle cx='100' cy='550' r='50'/%3E%3C/g%3E%3Ccircle fill='%23a37cd3' cx='50' cy='600' r='50'/%3E%3Cg fill='%23aa85d9' %3E%3Ccircle cx='0' cy='650' r='50'/%3E%3Ccircle cx='100' cy='650' r='50'/%3E%3C/g%3E%3Ccircle fill='%23b08ede' cx='50' cy='700' r='50'/%3E%3Cg fill='%23b797e4' %3E%3Ccircle cx='0' cy='750' r='50'/%3E%3Ccircle cx='100' cy='750' r='50'/%3E%3C/g%3E%3Ccircle fill='%23bea0e9' cx='50' cy='800' r='50'/%3E%3Cg fill='%23c5a9ef' %3E%3Ccircle cx='0' cy='850' r='50'/%3E%3Ccircle cx='100' cy='850' r='50'/%3E%3C/g%3E%3Ccircle fill='%23ccb2f4' cx='50' cy='900' r='50'/%3E%3Cg fill='%23d3bbfa' %3E%3Ccircle cx='0' cy='950' r='50'/%3E%3Ccircle cx='100' cy='950' r='50'/%3E%3C/g%3E%3Ccircle fill='%23DAC4FF' cx='50' cy='1000' r='50'/%3E%3C/g%3E%3C/svg%3E\")",

		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			padding: 0,
			margin: 0,
		},
	},
	overlay: {
		position: "absolute",
		top: "0",
		left: "0",
		height: "100%",
		width: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	container: {
		zIndex: 1,
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
		padding: theme.spacing.sm,
		borderRadius: theme.radius.md,
		width: "30rem",
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			width: "100%",
		},
	},
}))
interface formInterface {
	email: string
	password: string
}
const Login = ({}: indexProps) => {
	const router = useRouter()
	const [error, setError] = useState("")
	const theme = useMantineTheme()
	const { classes } = useStyles()
	const context = useContext(authContext)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<formInterface>()
	const mutation = useMutation(getToken)

	const onSubmit = handleSubmit(({ email, password }) => {
		mutation.mutate(
			{ email: email, password },
			{
				onSuccess: (data) => {
					console.log(context)

					context?.login!(data)
					router.push(D_HOME_ROUTES.OCR)
				},
				onError: (error: any) => setError(error?.response?.data?.detail),
			}
		)
	})
	return (
		<div className={classes.wrapper}>
			<div className={classes.overlay}></div>
			<form onSubmit={onSubmit} className={classes.container}>
				<Image mx="auto" sx={{ maxWidth: 350 }} width={350} src="/assets/images/login.svg" />
				<div>
					<Text align="center" size={28} weight={700}>
						Welcome back!{" "}
					</Text>
					<Text align="center" color={theme.colors.gray[6]}>
						You've been missed
					</Text>
				</div>
				{!!error && (
					<Notification withCloseButton={false} radius="sm" color="red">
						{error}
					</Notification>
				)}
				<TextInput
					size="md"
					sx={{ width: "100%" }}
					placeholder="Enter your email"
					label="Email"
					{...register("email", {
						required: "Email is required",
						pattern: { value: EMAIL_VALIDATION_REGEX, message: "Invalid email address" },
					})}
					error={errors.email?.message as string}
				/>
				<PasswordInput
					size="md"
					sx={{ width: "100%" }}
					label="Password"
					placeholder="Enter your password"
					{...register("password", {
						required: "Password is required",
					})}
					error={errors.password?.message as string}
				/>

				<div>
					<Button fullWidth loading={mutation.isLoading} loaderPosition="center" type="submit" size="md" sx={{ backgroundColor: "black" }}>
						Log In
					</Button>
					<Link href={D_ROUTES.FORGOT_PASSWORD}>
						<Text size={12} color="yellow" mt={4} weight={500}>
							Did you forget your password?
						</Text>
					</Link>
				</div>
			</form>
		</div>
	)
}

Login.Layout = AuthLayout
export default Login

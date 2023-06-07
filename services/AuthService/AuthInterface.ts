export interface AuthInterface {
	tokens: {
		access: string | null
		refresh: string | null
	}
}

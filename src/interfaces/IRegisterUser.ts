export interface IRegisterUser {
  name: string
  lastName: string
  email: string
  password: string
  confirmedConsent?: boolean
}
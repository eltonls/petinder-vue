import { helpers } from "@vuelidate/validators";

const validatePhone = helpers.regex(/^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/)

const validateName  = helpers.regex(/^[a-zA-ZÀ-ÿ]+([a-zA-ZÀ-ÿ' ]*[a-zA-ZÀ-ÿ]+)*$/)

const validatePassword = helpers.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/)

export { validatePhone, validateName, validatePassword };

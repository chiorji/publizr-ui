import { useMemo } from "react"

export type PasswordConstraintKey = 'min' | 'number' | 'special' | 'letter';
type Constraint = {
  criteria: string;
  met: PasswordConstraintKey
}

export const useCheckPasswordStrength = (password: string): Record<PasswordConstraintKey, boolean> => {
  const constraintValidator = (value: string) => ({
    min: value.length >= 8,
    number: /\d/.test(value),
    special: /[!@#$%^&*]/.test(value),
    letter: /[a-zA-Z]/.test(value)
  })
  return useMemo(() => constraintValidator(password), [password]);
}

export const passwordStrengthContraints: Constraint[]  = [
  {
    criteria: "At least 8 characters",
    met: "min"
  },
  {
    criteria: "Contains a number",
    met: "number"
  },
  {
    criteria: "Contains a special character",
    met: "special"
  },
  {
    criteria: "Contains a letter",
    met: "letter"
  }
]
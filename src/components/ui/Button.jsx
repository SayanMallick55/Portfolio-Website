import { cn } from '../../lib/cn'

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
}

export function Button({ as: Component = 'button', className, variant = 'primary', ...props }) {
  return <Component className={cn('btn-base', variants[variant], className)} {...props} />
}

import { cn } from '../../lib/cn'

export function Container({ as: Component = 'div', className, ...props }) {
  return <Component className={cn('section-shell', className)} {...props} />
}

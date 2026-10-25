import { cn } from '../../lib/cn'

export function Card({ as: Component = 'article', className, ...props }) {
  return <Component className={cn('card-base', className)} {...props} />
}

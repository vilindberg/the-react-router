import { createElement } from 'react'
import { useNavigation } from '.'

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string, state: any }
type OnClickEvent = React.MouseEvent<HTMLAnchorElement>

export function Link({ to, state, onClick, ...rest }: Props) {
  const { navigate } = useNavigation()
  const onLinkClick = (event: OnClickEvent) => {
    event.preventDefault()
    onClick?.(event)
    navigate(to, state)
  }
  return createElement('a', { ...rest, onClick: onLinkClick })
}

import { createElement } from 'react'
import { useNavigation } from '.'

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }
type OnClickEvent = React.MouseEvent<HTMLAnchorElement>

export function Link({ to, onClick, ...rest }: Props) {
  const { navigate } = useNavigation()
  const onLinkClick = (event: OnClickEvent) => {
    event.preventDefault()
    onClick && onClick(event)
    navigate(to)
  }
  return createElement('a', { ...rest, onClick: onLinkClick })
}

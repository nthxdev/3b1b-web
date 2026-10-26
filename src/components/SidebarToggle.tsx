import { useAtom } from 'jotai'
import { sidebarOpenAtom } from '../state/lesson'

export default function SidebarToggle() {
  const [isOpen, setIsOpen] = useAtom(sidebarOpenAtom)

  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? 'Close sidebar' : 'Open sidebar'}
    </button>
  )
}

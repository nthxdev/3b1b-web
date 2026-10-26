import { Dialog } from '@base-ui/react/dialog'

export default function SettingsDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Open settings</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop />

        <Dialog.Popup>
          <Dialog.Title>Settings</Dialog.Title>

          <Dialog.Description>
            Configure your lesson preferences.
          </Dialog.Description>

          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

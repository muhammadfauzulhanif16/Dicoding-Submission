import React from 'react'
import {
  IconButton,
  Menu as MenuChakra,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
import { MoreHorizontal } from '@emotion-icons/fluentui-system-regular'

export const Menu = ({ note, onArchive, onDelete }) => {
  return (
    <MenuChakra>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<MoreHorizontal width={16} height={16} />}
      />

      <MenuList>
        <MenuItem onClick={() => onArchive(note.id)}>
          {note.archived ? 'Unarchived' : 'Archived'}
        </MenuItem>
        <MenuItem onClick={() => onDelete(note.id)}>Delete</MenuItem>
      </MenuList>
    </MenuChakra>
  )
}

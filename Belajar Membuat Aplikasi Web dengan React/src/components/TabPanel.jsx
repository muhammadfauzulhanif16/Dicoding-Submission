import React from 'react'
import {
  Flex,
  Icon,
  SimpleGrid,
  TabPanel as TabPanelChakra,
  Text
} from '@chakra-ui/react'
import { Item } from './Item'
import { Note } from '@emotion-icons/fluentui-system-regular'

export const TabPanel = ({ notes, onArchive, onDelete }) => {
  return (
    <TabPanelChakra>
      {notes.length > 0
        ? (
        <SimpleGrid columns={2} gap={4}>
          {notes.map((note) => (
            <Item
              key={note.id}
              note={note}
              onArchive={onArchive}
              onDelete={onDelete}
            />
          ))}
        </SimpleGrid>
          )
        : (
        <Flex
          direction='column'
          alignItems='center'
          py={16}
          color='gray.300'
          gap={4}
        >
          <Icon as={Note} w={16} h={16} />
          <Text>Tidak ada catatan.</Text>
        </Flex>
          )}
    </TabPanelChakra>
  )
}

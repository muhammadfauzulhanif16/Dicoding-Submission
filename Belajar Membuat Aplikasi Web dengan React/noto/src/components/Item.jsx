import React from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { Menu } from './Menu'

export const Item = ({ note, onArchive, onDelete }) => {
  return (
    <Flex
      p={[4, 8]}
      bgColor='gray.50'
      direction='column'
      rounded={16}
      justifyContent='space-between'
      gap={4}
    >
      <Heading
        noOfLines={1}
        size='md'
        color='gray.600'
        _hover={{
          noOfLines: 'none'
        }}
      >
        {note.title}
      </Heading>
      <Text
        noOfLines={2}
        color='gray.500'
        _hover={{
          noOfLines: 'none'
        }}
      >
        {note.body}
      </Text>

      <Flex justifyContent='space-between' alignItems='center'>
        <Menu note={note} onArchive={onArchive} onDelete={onDelete} />

        <Text color='gray.400'>{note.createdAt}</Text>
      </Flex>
    </Flex>
  )
}

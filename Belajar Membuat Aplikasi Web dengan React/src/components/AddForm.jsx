import React from 'react'
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea
} from '@chakra-ui/react'

export const AddForm = ({ note, titleChange, bodyChange, addNote }) => {
  return (
    <Flex direction='column' gap={[4, 8, 12]}>
      <FormControl isRequired>
        <FormLabel>Judul</FormLabel>
        <Input
          value={note.title.content}
          onChange={titleChange}
          placeholder='Masukkan judul'
        />
        <FormHelperText>{`Maksimal ${note.title.max} karakter tersisa.`}</FormHelperText>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Isi</FormLabel>
        <Textarea
          resize='none'
          value={note.body.content}
          onChange={bodyChange}
          placeholder='Ketik apa saja...'
        />
        <FormHelperText>Tidak boleh kosong.</FormHelperText>
      </FormControl>

      <Button
        onClick={addNote}
        isDisabled={!note.title.content || !note.body.content}
      >
        Tambahkan
      </Button>
    </Flex>
  )
}

import React, { useState } from 'react'
import { ChakraProvider, GridItem, Input, theme } from '@chakra-ui/react'
import { Layout } from './components/Layout'
import { AddForm } from './components/AddForm'
import { Tabs } from './components/Tabs'
import { getInitialData } from './utils'

export const App = () => {
  const [notes, setNotes] = useState(getInitialData())
  const [note, setNote] = useState({
    title: {
      content: '',
      max: 50
    },
    body: {
      content: ''
    }
  })

  const [search, setSearch] = useState('')

  const titleChange = (e) => {
    if (e.target.value.length <= 50) {
      setNote({
        title: {
          content: e.target.value,
          max: 50 - e.target.value.length
        },
        body: {
          content: note.body.content
        }
      })
    }
  }

  const bodyChange = (e) => {
    setNote({
      title: {
        content: note.title.content,
        max: note.title.max
      },
      body: {
        content: e.target.value
      }
    })
  }

  const addNote = () => {
    const newNote = {
      id: +new Date(),
      title: note.title.content,
      body: note.body.content,
      archived: false,
      createdAt: new Date().toLocaleString()
    }

    setNotes([...notes, newNote])
    setNote({
      title: {
        content: '',
        max: 50
      },
      body: {
        content: ''
      }
    })
  }

  const onArchive = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              archived: !note.archived
            }
          : note
      )
    )
  }

  const onDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const onSearch = (e) => {
    setSearch(e.target.value)
  }

  const searchNotes = notes.filter((note) => {
    return note === ''
      ? note
      : note.title.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <AddForm
          note={note}
          titleChange={titleChange}
          bodyChange={bodyChange}
          addNote={addNote}
        />

        <GridItem colSpan={2}>
          <Input
            mb={4}
            placeholder='Cari catatan berdasarkan judul...'
            value={search}
            onChange={onSearch}
          />
          <Tabs
            notes={search !== '' ? searchNotes : notes}
            onArchive={onArchive}
            onDelete={onDelete}
          />
        </GridItem>
      </Layout>
    </ChakraProvider>
  )
}

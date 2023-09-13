import React from 'react'
import {
  Tab,
  TabIndicator,
  TabList,
  TabPanels,
  Tabs as TabsChakra
} from '@chakra-ui/react'
import { TabPanel } from './TabPanel'

export const Tabs = ({ notes, onArchive, onDelete }) => {
  const all = notes.filter(({ archived }) => archived === false)
  const archive = notes.filter(({ archived }) => archived === true)

  const tabs = [
    {
      title: 'Semua Catatan',
      notes: all
    },
    {
      title: 'Diarsipkan',
      notes: archive
    }
  ]

  return (
    <TabsChakra isFitted position='relative' variant='unstyled'>
      <TabList>
        {tabs.map(({ title }, id) => (
          <Tab key={id}>{title}</Tab>
        ))}
      </TabList>

      <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />

      <TabPanels>
        {tabs.map(({ notes }, id) => (
          <TabPanel
            key={id}
            notes={notes}
            onArchive={onArchive}
            onDelete={onDelete}
          />
        ))}
      </TabPanels>
    </TabsChakra>
  )
}

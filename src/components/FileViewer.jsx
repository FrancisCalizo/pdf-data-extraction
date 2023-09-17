import React from 'react'

import { Button } from '@mui/material'
import { Box } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download';

function FileViewer() {
  const [file, setFile] = React.useState(null)

  if (!file) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 64px - 30px)',
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          Please upload a file to get started

          <Button
            variant='contained'
            sx={{ marginTop: 1 }}
            startIcon={<DownloadIcon />}>
            Import
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <div></div>
  )
}

export default FileViewer
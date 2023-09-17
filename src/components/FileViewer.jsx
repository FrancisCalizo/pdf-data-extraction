import React from 'react'

import { Button } from '@mui/material'
import { Box } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download';

function FileViewer() {
  const [file, setFile] = React.useState(null)

  const handleFileUpload = (e) => {
    const { files } = e.target

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

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


          <input
            accept="pdf/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleFileUpload}
          // multiple
          />
          <label htmlFor="raised-button-file">
            <Button
              variant='contained'
              startIcon={<DownloadIcon />}
              sx={{ marginTop: 1 }}
              component="span"
            >
              File Upload
            </Button>
          </label>

        </Box>
      </Box >
    )
  }

  return (
    <div></div>
  )
}

export default FileViewer
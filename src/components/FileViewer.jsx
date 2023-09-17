import React from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

import { Button } from '@mui/material'
import { Box } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString()

function FileViewer({ file, handleFileUpload }) {
  const [numPages, setNumPages] = React.useState()

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    console.log(numPages)

    setNumPages(nextNumPages)
  }

  const render = React.useMemo(
    () =>
      file && (
        <Box>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={{
              cMapUrl: '/cmaps/',
              standardFontDataUrl: '/standard_fonts/',
            }}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </Box>
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [file]
  )

  if (!file) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 64px - 50px)',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          Please import a file to get started
          <input
            accept="pdf/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleFileUpload}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              sx={{ marginTop: 1 }}
              component="span"
            >
              Import file
            </Button>
          </label>
        </Box>
      </Box>
    )
  }

  return render
}

export default FileViewer

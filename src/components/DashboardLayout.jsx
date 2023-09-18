import * as React from 'react'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MenuIcon from '@mui/icons-material/Menu'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import { styled, useTheme } from '@mui/material/styles'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DownloadIcon from '@mui/icons-material/Download'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import FileViewer from './FileViewer'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export default function MiniDrawer() {
  const theme = useTheme()

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true)

  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [file, setFile] = React.useState(null)

  const inputFile = React.useRef(null)

  const handleDrawerOpen = () => setIsDrawerOpen(true)
  const handleDrawerClose = () => setIsDrawerOpen(false)

  const handleToggleDialog = (value) => setIsDialogOpen(value)
  const handleImportFile = () => inputFile.current.click()

  const handleFileUpload = (e) => {
    const { files } = e.target

    if (files && files[0]) {
      setFile(files[0] || null)
    }
  }

  const handleConfirmationClick = () => {
    setIsDialogOpen(false)

    handleImportFile()
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={isDrawerOpen} color="primary">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(isDrawerOpen && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              PDF Data Extraction
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={isDrawerOpen}>
          <DrawerHeader
            sx={{ background: (theme) => theme.palette.primary.main }}
          >
            <IconButton sx={{ color: '#fff' }} onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Import New'].map((text) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: isDrawerOpen ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={
                    file ? () => handleToggleDialog(true) : handleImportFile
                  }
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isDrawerOpen ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <DownloadIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{ opacity: isDrawerOpen ? 1 : 0 }}
                  />
                </ListItemButton>
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            background: '#efefef',
            height: '100vh',
          }}
        >
          <DrawerHeader />
          <FileViewer file={file} handleFileUpload={handleFileUpload} />
        </Box>
      </Box>

      <Dialog open={isDialogOpen} onClose={() => handleToggleDialog(false)}>
        <DialogTitle>Import a new file?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to import a new file? Any changes to the
            current file will not be saved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleToggleDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleConfirmationClick}
            autoFocus
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

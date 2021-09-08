import React from 'react'
import { Box, Button, Container, Link } from '@material-ui/core'
import Notfound from '../Assets/img/notfound.svg'

export default function notFound() {
  return (
    <Container maxWidth="sm">
      <Box py={8} >
        <Box fontSize={28} fontWeight={700} textAlign="center">Maaf Halaman Tidak ditemukan!</Box>
        <Box pb={2} pt={1} fontSize={15} textAlign="center" color="#637381">
          Maaf, kami tidak dapat menemukan halaman yang Anda cari. Mungkin Anda salah mengetik URL? Pastikan untuk memeriksa ejaan Anda.
        </Box>
        <Box py={1} textAlign="center">
          <Link href='/'>
            <Button onClick={() => localStorage.setItem("path", "Home")} style={{ backgroundColor: "#51AC56", color: "white", textTransform: "capitalize", borderRadius: "8px" }}><Box px={1.5} py={0.3} fontWeight={600} color="white">Go To Home</Box></Button>
          </Link>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img src={Notfound} width="90%" />
        </Box>
      </Box>
    </Container>
  )
}


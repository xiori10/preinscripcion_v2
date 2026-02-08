// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { Container } from 'react-bootstrap'
// import { useState } from 'react'

// // POSTULANTE
// import Banner from './components/postulante/Banner'
// import OptionsCards from './components/postulante/OptionsCards'
// import DocumentsDownload from './components/postulante/DocumentsDownload'
// import WizardForm from './components/postulante/wizard/WizardForm'

// // ADMIN
// import AdminLayout from './components/admin/layouts/AdminLayout'
// import AdminDashboard from './components/admin/dashboard/Dashboard'

// const PostulanteHome = () => {
//   const [showWizard, setShowWizard] = useState(false)
//   const [verifiedDNI, setVerifiedDNI] = useState('')

//   const handleStartPreinscription = (dni) => {
//     setVerifiedDNI(dni)
//     setShowWizard(true)
//   }

//   const handleCloseWizard = () => {
//     setShowWizard(false)
//     setVerifiedDNI('')
//   }

//   return (
//     <>
//       {!showWizard ? (
//         <>
//           <Banner />
//           <Container className="my-5">
//             <OptionsCards onStartPreinscription={handleStartPreinscription} />
//             <DocumentsDownload />
//           </Container>
//         </>
//       ) : (
//         <WizardForm dni={verifiedDNI} onClose={handleCloseWizard} />
//       )}
//     </>
//   )
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* POSTULANTE */}
//         <Route path="/" element={<PostulanteHome />} />

//         {/* ADMIN */}
//         <Route path="/admin" element={<AdminLayout />}>
//           <Route index element={<AdminDashboard />} />
//         </Route>

//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App

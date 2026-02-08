import Banner from '@/postulante/components/Banner'
import OptionsCards from '@/postulante/components/OptionsCards'
import DocumentsDownload from '@/postulante/components/DocumentsDownload'




const Home = () => {
  return (
    <div className="App">
      <Banner />
      <div className="container">
      <OptionsCards />
      <DocumentsDownload />
      </div>
    </div>
  )
}

export default Home

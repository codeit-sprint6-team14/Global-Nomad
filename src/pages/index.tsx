import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import SideNavMenu from '@/components/SideNavMenu'

export default function Home() {
  return (
    <div>
      <NavBar />
      <SideNavMenu.sideNavMenu />
      <Footer />
    </div>
  )
}

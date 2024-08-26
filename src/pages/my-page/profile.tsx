import AnimatedContainer from '@/components/common/Animation/AnimatedContainer';
import Footer from '@/components/common/Footer';
import NavBar from '@/components/common/NavBar';
import MyProfile from '@/components/pages/myPage/myProfile';

const Profile = () => {
  return (
    <div>
      <NavBar />
      <AnimatedContainer>
        <MyProfile />
      </AnimatedContainer>
      <Footer />
    </div>
  );
};
export default Profile;

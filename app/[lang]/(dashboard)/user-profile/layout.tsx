import ProfileLayout from "./profile-layout"
export const metadata = {
  title: "User Profile",
};

const Layout = ({ children }: any) => {
  return (
    <ProfileLayout>
      {children}
    </ProfileLayout>
  )
};

export default Layout;

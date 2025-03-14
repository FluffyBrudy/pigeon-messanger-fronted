import { useAuthStore } from "../../store/authStore";

const Profile = () => {
  const imageUrl = useAuthStore((state) => state.imageUrl);

  return (
    <div className="w-1/2 cursor-pointer">
      {imageUrl && <img src={imageUrl} alt="" />}
    </div>
  );
};

export default Profile;

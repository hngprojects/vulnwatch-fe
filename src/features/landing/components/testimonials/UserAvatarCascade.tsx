import Image from "next/image";
import { images } from "@/features/landing/constants/images";

function UserAvatarCascade() {
  return (
    <div className="flex shrink-0 items-center">
      <div className="flex items-center *:-ml-3 [&>*:first-child]:ml-0">
        {images.userAvatars.map((srcPath) => (
          <UserAvatar key={srcPath} imageSrc={srcPath} />
        ))}
      </div>
    </div>
  );
}

function UserAvatar({ imageSrc }: { imageSrc: string }) {
  return (
    <Image
      className="border-1.5 h-10 min-h-10 w-10 min-w-10 rounded-full border-white"
      width={40}
      height={40}
      src={imageSrc}
      alt=""
    />
  );
}

export default UserAvatarCascade;

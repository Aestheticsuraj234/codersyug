import Image from "next/image";

const UserInfomation: React.FC<any> = ({ participation }) => {
  return (
    <div className="flex-center border rounded-md py-4">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={participation?.user?.imageUrl}
          alt="Picture of the user"
          width={114}
          height={114}
          className=" rounded-full border-4 border-x-emerald-500 shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out"
        />
        <h1 className="text-xl font-bold text-gray-700 dark:text-gray-50 flex flex-row justify-center items-center gap-2">
          {participation?.user?.name}
          {participation?.isVerified && (
            <Image src="/verified.svg" alt="verified" width={20} height={20} />
          )}
        </h1>
        <span className="flex flex-row justify-start items-start  text-gray-500 dark:text-gray-50 text-sm font-medium ">
          {participation?.user?.email}
        </span>
      </div>
    </div>
  );
};

export default UserInfomation;

import { User } from "@/contexts/UserContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import Image from "next/image";
import Link from "next/link";

type AvatarProps = {
  user: User | null;
  logOutUser: () => void;
};

export function Avatar({ user, logOutUser }: AvatarProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="rounded-full border-[1px] p-[3px] dark:hover:bg-[#1f1f20] hover:bg-[#E4E4E7] hover:border-gray-500 hover:scale-110 transition-all ease-in-out cursor-pointer duration-200 dark:border-[#27272A] border-[#E4E4E7]">
          <Image
            src={user?.avatar || "/images/profile.png"}
            width={26}
            height={26}
            className="rounded-full"
            alt="pratiyank-image"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-2 px-2">
          <p className="text-sm font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
            {user?.email ? user.email : user?.name}
          </p>
          <ul className="mt-2">
            <li className="hover:bg-gray-100 px-2 hover:dark:bg-zinc-800 rounded-md mb-1">
              <Link href="/profile" className="block py-1 text-sm">
                Profile
              </Link>
            </li>
            <li
              onClick={logOutUser}
              className="hover:bg-gray-100 px-2 hover:dark:bg-zinc-800 rounded-md mb-1"
            >
              <button className="block py-1 text-sm">Logout</button>
            </li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}

import { Button } from "@workspace/ui/components/button";
import { ArrowRight } from "lucide-react";

export default function MessageBox() {
  return (
    <div className="flex flex-col items-center  dark:border-[#515056] relative justify-center h-[380px] mx-auto w-[70%] rounded-md border-gray-300 border-[1px] mb-8">
      <div className="flex flex-col w-[90%]">
        <p className="self-start text-sm ml-[5.5%] mb-1">Message</p>
        <textarea
          placeholder="Write your message here"
          className="w-[90%] pl-3 text-sm mx-auto rounded-md bg-transparent h-[140px] dark:border-[#515056]  border-gray-300 border-[1px] p-2"
        ></textarea>
      </div>
      <div className="flex mt-6 flex-col w-[90%]">
        <p className="self-start text-sm ml-[5.5%] mb-1">Email (optional)</p>
        <p className="self-start text-[12px] ml-[5.5%] text-gray-700 dark:text-gray-300 mb-1">
          If you&apos;d like a reply, please provide your email address.
        </p>
        <input
          placeholder="john@gmail.com"
          className="w-[90%] pl-3 dark:border-[#515056] bg-transparent  text-sm mx-auto rounded-md h-[35px] border-gray-300 border-[1px] p-2"
        ></input>
      </div>

      <Button
        variant="default"
        className="bg-[#E2FB75] ml-[9%] self-start left-10 bottom-2 rounded-full h-[40px] px-8 mt-8 text-black hover:bg-[#E2FB75]/90"
      >
        <p className="text-[14px]">Send Message</p>
        <ArrowRight className="w-3 h-4" />
      </Button>
    </div>
  );
}

import { Input } from "@workspace/ui/components/input";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TableDemo } from "./TableDemo";

export function QuestionSidebar({
  showQuestionBar,
  setShowQuestionBar,
  setQuestionIndex,
}: {
  showQuestionBar: boolean;
  setShowQuestionBar: React.Dispatch<React.SetStateAction<boolean>>;
  setQuestionIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  return (
    <AnimatePresence>
      {showQuestionBar && (
        <motion.div
          className="w-screen h-screen z-[100] fixed top-0 bottom-0 left-0 right-0 bg-transparent backdrop-blur-[2px] flex flex-row items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-[40%] shadow-lg relative h-screen bg-white dark:bg-[#18181B] dark:border-r-[1px] dark:border-[#27272A] dark:text-white flex flex-col gap-4 items-center"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <X
              onClick={() => setShowQuestionBar(false)}
              className="w-4 h-4 absolute cursor-pointer top-4 right-4"
            />
            <div className="w-full mt-16 flex flex-row items-center justify-center">
              <Input
                placeholder="Search Within this list of questions.."
                className="w-[90%]"
              />
            </div>

            <div className="w-[90%] h-screen">
              <TableDemo
                setQuestionIndex={setQuestionIndex}
                setShowQuestionBar={setShowQuestionBar}
              />
            </div>
          </motion.div>

          <div
            onClick={() => setShowQuestionBar(false)}
            className="w-[65%] h-screen bg-transparent"
          ></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

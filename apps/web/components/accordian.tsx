import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-[70%]">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-xl">
          What frameworks/libraries does the platform support?
        </AccordionTrigger>
        <AccordionContent className="text-[16px] tracking-wider font-light dark:text-gray-300 text-gray-700">
          <p>
            Our platform supports all major frontend frameworks and libraries,
            including React and vanilla JavaScript. Whether you prefer the
            flexibility of React’s component-based structure or the simplicity
            of vanilla JavaScript, our environment has you covered. You can view
            live what you build, allowing you to see changes instantly as you
            write and modify your code. This real-time feedback ensures a smooth
            development experience, reducing the time spent debugging and
            refining your work.
          </p>
          <p className="mt-2">
            Additionally, our platform provides a robust testing environment to
            validate your solutions efficiently. Test cases are available for
            logical questions, allowing you to verify the correctness of your
            code against multiple scenarios. This feature is particularly useful
            for developers who want to sharpen their problem-solving skills and
            ensure their applications function as expected.
          </p>
          <p className="mt-2">
            By combining a live preview feature with structured test cases, our
            platform bridges the gap between development and testing, helping
            developers improve their coding accuracy and efficiency. Whether
            you&apos;re building interactive UIs, testing JavaScript logic, or
            refining your frontend skills, our platform provides the ideal space
            to code, test, and iterate seamlessly. 🚀
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-xl">
          How do the test cases work?
        </AccordionTrigger>
        <AccordionContent className="text-[16px] tracking-wider font-light dark:text-gray-300 text-gray-700">
          Each challenge comes with predefined test cases designed to validate
          various aspects of your solution, including functionality,
          accessibility, and responsiveness. These test cases simulate
          real-world conditions to ensure your code behaves correctly under
          different scenarios. You can run tests against your code at any time
          during development, and our platform provides detailed feedback,
          highlighting which tests have passed and which have failed.
          Additionally, if a test fails, you will receive insights into what
          went wrong and possible ways to fix the issue. This feature helps
          developers debug efficiently, refine their approach, and build robust
          components that meet high-quality standards.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-xl">
          Does the platform have difficulty levels?
        </AccordionTrigger>
        <AccordionContent className="text-[16px] tracking-wider font-light dark:text-gray-300 text-gray-700">
          Yes, our challenges are structured into three difficulty levels: Easy,
          Medium, and Hard. This categorization allows developers to choose
          tasks that match their current skill level and progress gradually.
          Beginners are encouraged to start with Easy challenges, which focus on
          fundamental concepts such as HTML structure, CSS styling, and basic
          JavaScript interactions. As developers gain confidence, they can move
          on to Medium challenges, which introduce more complex component logic,
          state management, and event handling. Finally, Hard challenges are
          designed for advanced users who want to tackle intricate problems,
          optimize performance, and explore cutting-edge frontend techniques.
          This tiered structure ensures that learners of all levels can find
          suitable challenges to enhance their skills progressively.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className="text-xl">
          Is it open source?
        </AccordionTrigger>
        <AccordionContent className="text-[16px] tracking-wider font-light dark:text-gray-300 text-gray-700">
          Yes! Our platform is open source, allowing developers to contribute,
          modify, and extend its features. Being open source means that the
          entire codebase is accessible to the community, enabling transparency,
          collaboration, and continuous improvement. Developers can report
          issues, suggest new features, or even submit pull requests to enhance
          the platform’s functionality. Additionally, this openness fosters a
          strong developer ecosystem where users can learn from the underlying
          architecture, customize the environment to fit their needs, and even
          create their own versions of the platform. Whether you are interested
          in improving existing features or simply exploring how everything
          works, our open-source model provides you with full access to
          contribute and innovate.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger className="text-xl">
          Is it completely free?
        </AccordionTrigger>
        <AccordionContent className="text-[16px] tracking-wider font-light dark:text-gray-300 text-gray-700">
          Yes, it is completely free! Our platform is designed to provide
          unrestricted access to all users, regardless of their experience level
          or location. There are no hidden charges, premium subscriptions, or
          paywalls—every feature, challenge, and tool is available at no cost.
          This ensures that learners, hobbyists, and professional developers can
          improve their coding skills without financial barriers. You can
          participate in coding challenges, test your solutions, and explore
          community resources without any limitations. Our goal is to make
          high-quality learning accessible to everyone, so you can focus on
          honing your skills and building amazing projects without worrying
          about expenses.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

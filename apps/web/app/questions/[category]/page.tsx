"use client";

import DisplayQuestions from "@/components/DisplayQuestions";
import { useParams } from "next/navigation";
import {
  Accessibility,
  FormInput,
  LayoutGrid,
  MonitorSmartphone,
  Network,
  RefreshCcw,
} from "lucide-react";
import { useGetQuestions } from "@/hooks/queries";

const QuestionCategoryPage = () => {
  const params = useParams();
  const category = params.category as string; // Get category from URL

  const { data: questions, isLoading, error } = useGetQuestions();

  // Define different content for each category
  const categoryData: Record<string, JSX.Element> = {
    js: (
      <>
        <DisplayQuestions
          questions={questions || []}
          loading={isLoading}
          error={error?.message || ""}
          techIcons={true}
          headingIcon={
            <svg
              width={"40px"}
              height={"40px"}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 630 630"
              className="rounded-md "
            >
              <rect width="630" height="630" fill="#f7df1e" />
              <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z" />
            </svg>
          }
          description="440+ most important JavaScript interview questions, from library
              APIs and utility functions to algorithms and UI components."
          heading=" JavaScript Interview Questions"
          language="javascript"
        />
      </>
    ),
    html: (
      <>
        <DisplayQuestions
          questions={questions || []}
          loading={isLoading}
          error={error?.message || ""}
          techIcons={true}
          headingIcon={
            <svg
              width={"40px"}
              height={"40px"}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path fill="#E34F26" d="M71,460 L30,0 481,0 440,460 255,512" />
              <path fill="#EF652A" d="M256,472 L405,431 440,37 256,37" />
              <path
                fill="#EBEBEB"
                d="M256,208 L181,208 176,150 256,150 256,94 255,94 114,94 115,109 129,265 256,265zM256,355 L255,355 192,338 188,293 158,293 132,293 139,382 255,414 256,414z"
              />
              <path
                fill="#FFF"
                d="M255,208 L255,265 325,265 318,338 255,355 255,414 371,382 372,372 385,223 387,208 371,208zM255,94 L255,129 255,150 255,150 392,150 392,150 392,150 393,138 396,109 397,94z"
              />
            </svg>
          }
          description="90+ most important HTML interview questions covering semantics, forms, accessibility, media, and creating structured, interactive web pages."
          heading="HTML Interview Questions"
          language="html"
        />
      </>
    ),
    css: (
      <>
        <DisplayQuestions
          questions={questions || []}
          loading={isLoading}
          error={error?.message || ""}
          techIcons={true}
          headingIcon={
            <svg
              width={"40px"}
              height={"40px"}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="#264DE4"
                d="M71.357 460.819L30.272 0h451.456l-41.129 460.746L255.724 512z"
              />
              <path
                fill="#2965F1"
                d="M405.388 431.408l35.148-393.73H256v435.146z"
              />
              <path
                fill="#EBEBEB"
                d="M124.46 208.59l5.065 56.517H256V208.59H124.46zM119.419 150.715H256V94.197H114.281l1.35 15.874 13.788 40.644zM256 355.372l-.248.066-62.944-16.996-4.023-45.076h-56.736l7.919 88.741 115.772 32.14.26-.073z"
              />
              <path
                fill="#FFF"
                d="M255.805 208.59v56.517H325.4l-6.56 73.299-63.035 17.013v58.8l115.864-32.112.85-9.549 13.28-148.792 1.38-15.176 10.203-114.393H255.805v56.518h79.639L330.3 208.59z"
              />
            </svg>
          }
          description="70+ most important CSS interview questions covering layouts, animations, responsive design, specificity, and creating engaging interfaces."
          heading="CSS Interview Questions"
          language="css"
        />
      </>
    ),
    react: (
      <>
        <DisplayQuestions
          questions={questions || []}
          loading={isLoading}
          error={error?.message || ""}
          techIcons={true}
          headingIcon={
            <svg
              width={"40px"}
              height={"40px"}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-11.5 -10.23174 23 20.46348"
            >
              <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
              <g stroke="#61dafb" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
          }
          description="100+ most important React interview questions on component architecture, hooks, state management, performance, and real-world UI components."
          heading="React Interview Questions"
          language="react"
        />
      </>
    ),
    accessibility: (
      <>
        <DisplayQuestions
          questions={questions || []}
          loading={isLoading}
          error={error?.message || ""}
          techIcons={true}
          headingIcon={<Accessibility className="text-black" />}
          description="Practice developing inclusive and accessible web experiences. Explore the principles and techniques of web accessibility, including semantic HTML, ARIA roles, keyboard navigation, and screen reader compatibility, a skill which differentiates senior from junior front end engineers."
          heading="Accessibility"
        />
      </>
    ),
    async: (
      <>
        <DisplayQuestions
          questions={questions || []}
          loading={isLoading}
          error={error?.message || ""}
          techIcons={true}
          headingIcon={<RefreshCcw className="text-black" />}
          description="Sharpen your skills in asynchronous programming by practicing the use of async/await, Promises, and callback functions. Dive into scenarios that require asynchronous operations, such as making API requests and delayed code execution."
          heading="Async Operations"
        />
      </>
    ),
    data: (
      <>
        <DisplayQuestions
          questions={questions || []}
          loading={isLoading}
          error={error?.message || ""}
          techIcons={true}
          headingIcon={<Network className="text-black" />}
          description="Hone your computer science fundamentals by implementing important data structures and algorithms from scratch and practice the questions where algorithmic efficiency is key."
          heading="Data Structures & Algorithms"
        />
      </>
    ),
    design: (
      <>
        <DisplayQuestions
          questions={questions || []}
          loading={isLoading}
          error={error?.message || ""}
          techIcons={true}
          headingIcon={<LayoutGrid className="text-black" />}
          description="Targeted practice on Design System Components interview questions"
          heading="Design System Components"
        />
      </>
    ),
    dom: (
      <>
        <DisplayQuestions
          questions={questions || []}
          loading={isLoading}
          error={error?.message || ""}
          techIcons={true}
          headingIcon={<MonitorSmartphone className="text-black" />}
          description="Dive into the world of element selection and modification in the DOM. Practice selecting elements using CSS selectors, traverse the DOM hierarchy, and manipulate their properties, content, and styles."
          heading="DOM Manipulation"
        />
      </>
    ),
    forms: (
      <>
        <DisplayQuestions
          questions={questions || []}
          loading={isLoading}
          error={error?.message || ""}
          techIcons={true}
          headingIcon={<FormInput className="text-black" />}
          description="Master the art of building interactive and user-friendly forms by exploring various form components, validation techniques, and handling form submissions."
          heading="Forms"
        />
      </>
    ),
    state: (
      <>
        <DisplayQuestions
          questions={questions || []}
          loading={isLoading}
          error={error?.message || ""}
          techIcons={true}
          headingIcon={<FormInput className="text-black" />}
          description="Train your skills in designing complex state and implementing operations to manipulate state."
          heading="State Management"
        />
      </>
    ),
    google: (
      <>
        <DisplayQuestions
          questions={questions || []}
          loading={isLoading}
          error={error?.message || ""}
          techIcons={true}
          headingIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              height="40px"
              viewBox="-3 0 262 262"
              preserveAspectRatio="xMidYMid"
            >
              <path
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                fill="#4285F4"
              />
              <path
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                fill="#34A853"
              />
              <path
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                fill="#FBBC05"
              />
              <path
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                fill="#EB4335"
              />
            </svg>
          }
          description="Since it's Google, candidates can expect to be tested on fundamental Computer Science concepts as well as their front end knowledge/skills."
          heading="Google Front End Interview Guide"
        />
      </>
    ),
    apple: (
      <>
        <DisplayQuestions
          questions={questions || []}
          loading={isLoading}
          error={error?.message || ""}
          techIcons={true}
          headingIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40px"
              height="40px"
              viewBox="0 0 50 50"
            >
              <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
            </svg>
          }
          description="Interviews with Apple are highly team-dependent but in general Apple's front end interview process focuses on fundamentals - vanilla HTML, CSS, JavaScript, DOM (Document Object Model). Depending on the team, you might be allowed to use JavaScript frameworks like React and Vue to completed the user interface questions, but you should also be comfortable building user interfaces with just vanilla JavaScript and CSS, without relying on JavaScript frameworks."
          heading="Apple Front End Interview Guide"
        />
      </>
    ),
    microsoft: (
      <>
        <DisplayQuestions
          questions={questions || []}
          loading={isLoading}
          error={error?.message || ""}
          techIcons={true}
          headingIcon={
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              className="w-8 h-8"
            >
              <path fill="#F25022" d="M1 1h10v10H1z" />
              <path fill="#00A4EF" d="M1 13h10v10H1z" />
              <path fill="#7FBA00" d="M13 1h10v10H13z" />
              <path fill="#FFB900" d="M13 13h10v10H13z" />
            </svg>
          }
          description="The one-stop to prepare well for your Microsoft front end interviews"
          heading="Microsoft Front End Interview Guide"
        />
      </>
    ),
    twitter: (
      <>
        <DisplayQuestions
          questions={questions || []}
          loading={isLoading}
          error={error?.message || ""}
          techIcons={true}
          headingIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40px"
              height="40px"
              viewBox="0 0 30 30"
            >
              <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
            </svg>
          }
          description="The one-stop to prepare well for your Twitter front end interviews"
          heading="Twitter Front End Interview Guide"
        />
      </>
    ),
    facebook: (
      <>
        <DisplayQuestions
          questions={questions || []}
          loading={isLoading}
          error={error?.message || ""}
          techIcons={true}
          headingIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40px"
              height="40px"
              viewBox="0 0 48 48"
            >
              <path
                fill="#0081fb"
                d="M47,29.36l-2.193,1.663L42.62,29.5c0-0.16,0-0.33-0.01-0.5c0-0.16,0-0.33-0.01-0.5	c-0.14-3.94-1.14-8.16-3.14-11.25c-1.54-2.37-3.51-3.5-5.71-3.5c-2.31,0-4.19,1.38-6.27,4.38c-0.06,0.09-0.13,0.18-0.19,0.28	c-0.04,0.05-0.07,0.1-0.11,0.16c-0.1,0.15-0.2,0.3-0.3,0.46c-0.9,1.4-1.84,3.03-2.86,4.83c-0.09,0.17-0.19,0.34-0.28,0.51	c-0.03,0.04-0.06,0.09-0.08,0.13l-0.21,0.37l-1.24,2.19c-2.91,5.15-3.65,6.33-5.1,8.26C14.56,38.71,12.38,40,9.51,40	c-3.4,0-5.56-1.47-6.89-3.69C1.53,34.51,1,32.14,1,29.44l4.97,0.17c0,1.76,0.38,3.1,0.89,3.92C7.52,34.59,8.49,35,9.5,35	c1.29,0,2.49-0.27,4.77-3.43c1.83-2.53,3.99-6.07,5.44-8.3l1.37-2.09l0.29-0.46l0.3-0.45l0.5-0.77c0.76-1.16,1.58-2.39,2.46-3.57	c0.1-0.14,0.2-0.28,0.31-0.42c0.1-0.14,0.21-0.28,0.31-0.41c0.9-1.15,1.85-2.22,2.87-3.1c1.85-1.61,3.84-2.5,5.85-2.5	c3.37,0,6.58,1.95,9.04,5.61c2.51,3.74,3.82,8.4,3.97,13.25c0.01,0.16,0.01,0.33,0.01,0.5C47,29.03,47,29.19,47,29.36z"
              ></path>
              <linearGradient
                id="wSMw7pqi7WIWHewz2_TZXa_PvvcWRWxRKSR_gr1"
                x1="42.304"
                x2="13.533"
                y1="24.75"
                y2="24.75"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#0081fb"></stop>
                <stop offset=".995" stopColor="#0064e1"></stop>
              </linearGradient>
              <path
                fill="url(#wSMw7pqi7WIWHewz2_TZXa_PvvcWRWxRKSR_gr1)"
                d="M4.918,15.456	C7.195,11.951,10.483,9.5,14.253,9.5c2.184,0,4.354,0.645,6.621,2.493c2.479,2.02,5.122,5.346,8.419,10.828l1.182,1.967	c2.854,4.746,4.477,7.187,5.428,8.339C37.125,34.606,37.888,35,39,35c2.82,0,3.617-2.54,3.617-5.501L47,29.362	c0,3.095-0.611,5.369-1.651,7.165C44.345,38.264,42.387,40,39.093,40c-2.048,0-3.862-0.444-5.868-2.333	c-1.542-1.45-3.345-4.026-4.732-6.341l-4.126-6.879c-2.07-3.452-3.969-6.027-5.068-7.192c-1.182-1.254-2.642-2.754-5.067-2.754	c-1.963,0-3.689,1.362-5.084,3.465L4.918,15.456z"
              ></path>
              <linearGradient
                id="wSMw7pqi7WIWHewz2_TZXb_PvvcWRWxRKSR_gr2"
                x1="7.635"
                x2="7.635"
                y1="32.87"
                y2="13.012"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#0081fb"></stop>
                <stop offset=".995" stopColor="#0064e1"></stop>
              </linearGradient>
              <path
                fill="url(#wSMw7pqi7WIWHewz2_TZXb_PvvcWRWxRKSR_gr2)"
                d="M14.25,14.5	c-1.959,0-3.683,1.362-5.075,3.465C7.206,20.937,6,25.363,6,29.614c0,1.753-0.003,3.072,0.5,3.886l-3.84,2.813	C1.574,34.507,1,32.2,1,29.5c0-4.91,1.355-10.091,3.918-14.044C7.192,11.951,10.507,9.5,14.27,9.5L14.25,14.5z"
              ></path>
              <path
                d="M21.67,20.27l-0.3,0.45l-0.29,0.46c0.71,1.03,1.52,2.27,2.37,3.69l0.21-0.37c0.02-0.04,0.05-0.09,0.08-0.13 c0.09-0.17,0.19-0.34,0.28-0.51C23.19,22.5,22.39,21.29,21.67,20.27z M24.94,15.51c-0.11,0.14-0.21,0.28-0.31,0.42 c0.73,0.91,1.47,1.94,2.25,3.1c0.1-0.16,0.2-0.31,0.3-0.46c0.04-0.06,0.07-0.11,0.11-0.16c0.06-0.1,0.13-0.19,0.19-0.28 c-0.76-1.12-1.5-2.13-2.23-3.03C25.15,15.23,25.04,15.37,24.94,15.51z"
                opacity=".05"
              ></path>
              <path
                d="M21.67,20.27l-0.3,0.45c0.71,1.02,1.51,2.24,2.37,3.65c0.09-0.17,0.19-0.34,0.28-0.51C23.19,22.5,22.39,21.29,21.67,20.27 z M24.63,15.93c0.73,0.91,1.47,1.94,2.25,3.1c0.1-0.16,0.2-0.31,0.3-0.46c-0.77-1.14-1.52-2.16-2.24-3.06 C24.83,15.65,24.73,15.79,24.63,15.93z"
                opacity=".07"
              ></path>
            </svg>
          }
          description="The one-stop to prepare well for your Facebook front end interviews"
          heading="Facebook Front End Interview Guide"
        />
      </>
    ),
  };

  return (
    categoryData[category as keyof typeof categoryData] || (
      <h1 className="ml-72">Category Not Found</h1>
    )
  );
};

export default QuestionCategoryPage;

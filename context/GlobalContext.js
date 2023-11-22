"use client"
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useMemo } from 'react';
import { BlogContentInterface } from '@/types';
import { ResourceType } from '@prisma/client';
/**
 * The type for the context values.
 * @typedef {Object} BlogSubContextValue
 * @property {boolean} isLoading - Indicates if data is loading.
 * @property {BlogContentInterface | null} blogData - Data related to the blog.
 * @property {Dispatch<SetStateAction<boolean>>} setIsLoading - Function to update isLoading state.
 * @property {Dispatch<SetStateAction<BlogContentInterface | null>>} setBlogData - Function to update blogData state.
 * @property {BlogContentInterface | null} memoizedBlogData - Memoized blogData state.
 * @property {number | null} like - Number of likes.
 * @property {Dispatch<SetStateAction<number | null>>} setLikes - Function to update likes state.
 * @property {BlogContentInterface | null} AllBlogData - Data related to all blogs.
 * @property {Dispatch<SetStateAction<BlogContentInterface | null>>} setAllBlogData - Function to update AllBlogData state.
 * @property {BlogContentInterface | null} memoizedAllBlogData - Memoized AllBlogData state.
 */

/**
 * @typedef {Object} ModalSubContextValue
 * @property {ResourceType} modals - Type of modal to show.
 * @property {Dispatch<SetStateAction<ResourceType>>} setModal - Function to update modal type.
 * @property {boolean} isOpen - Indicates if modal is open.
 * @property {Dispatch<SetStateAction<boolean>>} setIsOpen - Function to update isOpen state.
 * @property {function} openModal - Function to open a modal.
 * @property {function} closeModal - Function to close a modal.
 * 
 */

/**
 * @typedef {Object} QuizSubContextValue
 * @property {Array} answeredQuestions - Array of answered questions.
 * @property {function} addAnsweredQuestion - Function to add a question to the answeredQuestions array.
 * @property {function} setAnsweredQuestions - Function to update answeredQuestions state.
 * @property {number | null} questionTimer - Time left to answer a question.
 * @property {function} setQuestionTimer - Function to update questionTimer state.
 * 

 */


/**
 * @typedef {Object} AppContextValue - Main context for the app.
 * @property {BlogSubContextValue} blog - Blog subcontext.
 * @property {ModalSubContextValue} modal - Modal subcontext.
 * @property {QuizSubContextValue} quiz - Quiz subcontext.
 
 */

/**
 * Create a context for the app.
 * @type {React.Context<AppContextValue>}
 */
export const AppContext = createContext();

/**
 * AppProvider component for managing authentication and user data.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {React.ReactNode} Rendered component.
 */
export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState(null);
  const [AllBlogData, setAllBlogData] = useState(null);
  const memoizedAllBlogData = useMemo(() => AllBlogData, [AllBlogData]);
  const memoizedBlogData = useMemo(() => blogData, [blogData, isLoading]);
  const [like, setLikes] = useState(memoizedBlogData ? memoizedBlogData.likes : null);

  /**
   * An object containing blog-related context values.
   * @type {BlogSubContextValue}
   */
  const blogContext = {
    isLoading,
    setIsLoading,
    blogData,
    setBlogData,
    like,
    setLikes,
    AllBlogData,
    setAllBlogData,
    memoizedBlogData,
    memoizedAllBlogData
  };


  /**
   * 
   * it's designed to work with the useModal hook to open and close the modal. Here's a breakdown of the code:
   * @type {ModalSubContextValue}
   */




  const [modals, setModals] = useState(ResourceType);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (type) => {
    setModals(type);
    setIsOpen(true);
    console.log("openModal", type);
  };

  const closeModal = () => {
    setModals(null);
    setIsOpen(false);
  };


  const modalContext = {
    modals,
    isOpen,
    openModal,
    closeModal,
  };


  /** @Aestheticsuraj234
   * @type  {QuizSubContextValue}
   * 
   */

  //? #---------------------Quiz---------------------#
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [questionTimer, setQuestionTimer] = useState(null);


  /**
   * 
   * @param {*} param0
   * @param {*} questionId
   * @param {*} answer 
   * @returns
   * 
   */

  const addAnsweredQuestion = ({ questionId, answer }) => {
    setAnsweredQuestions([...answeredQuestions, {
      questionId,
      answer
    }]);
  };


  const quizContext = {
    answeredQuestions,
    setAnsweredQuestions,
    questionTimer,
    setQuestionTimer,
  }


  // Create the context value object
  const contextValue = {
    blog: blogContext,
    modal: modalContext,
    quiz: quizContext,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

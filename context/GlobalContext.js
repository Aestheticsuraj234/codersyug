"use client"
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useMemo } from 'react';
import { BlogContentInterface } from '@/types';

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
 * @typedef {Object} AppContextValue - Main context for the app.
 * @property {BlogSubContextValue} blog - Blog subcontext.
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

  // Create the context value object
  const contextValue = {
    blog: blogContext,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

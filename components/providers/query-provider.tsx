"use client"
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
import React from 'react'
  
  const queryClient = new QueryClient()
  
export default function QueryProvider({children}:{
    children:React.ReactNode
}) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )}


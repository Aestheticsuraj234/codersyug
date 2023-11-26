import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from 'query-string';

import * as crypto from "crypto";
import { QuizParticipation } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



// created by chatgpt
export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export const formatDate = (dateString: string | number | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const generateSlug = (title: string) => {

  const trimmedTitle = title.trim().toLowerCase();
  const slug = trimmedTitle.replace(/\s+/g, '-');

  return slug;

}


export const slugify = (...args: (string | number)[]): string => {
  const value = args.join(' ')

  return value
      .normalize('NFD') // split an accented letter in the base letter and the acent
      .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
      .replace(/\s+/g, '-') // separator
}



interface UrlQueryParams {
  params: string;
  key?: string;
  value?: string | null;
  keysToRemove?: string[];
}

export function formUrlQuery({ params, key, value, keysToRemove }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  if (keysToRemove) {
    keysToRemove.forEach((keyToRemove) => {
      delete currentUrl[keyToRemove];
    });
  } else if (key && value) {
    currentUrl[key] = value;
  }

  console.log(currentUrl, key, value);

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true }
  );
}


export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR"
  }).format(price)
}


export function generateUniqueCode(userId:any) {
  const randomPart = crypto.randomBytes(4).toString('hex'); // Generate a random 8-character hexadecimal string
  return `${userId}-${randomPart}`;
}

export function generateUniqueCodeForQuiz() {
  const randomPart = crypto.randomBytes(4).toString('hex'); // Generate a random 8-character hexadecimal string
  return `${randomPart}`;

}


export function removePunctuationAndNormalize(text:string | null) {
 const result =  text && text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase().trim();
  return result;
};


// Function to calculate the rank of the user by using their score and total time taken.
export const calculateRank = (quizParticipations: QuizParticipation[]): QuizParticipation[] => {
  // Clone the array to avoid modifying the original
  const quizParticipationsCopy = [...quizParticipations];

  const sortedParticipationRank: QuizParticipation[] = [];

  while (quizParticipationsCopy.length > 0) {
    let max: number | null = 0;
    let maxIndex = 0;

    for (let i = 0; i < quizParticipationsCopy.length; i++) {
      if (quizParticipationsCopy[i].score! > max!) {
        maxIndex = i;
        max = quizParticipationsCopy[i].score;
      } else if (quizParticipationsCopy[i].score === max) {
        // If scores are equal, prioritize the user with less time taken
        if (
          quizParticipationsCopy[i].totalTimeTaken! < quizParticipationsCopy[maxIndex].totalTimeTaken!
        ) {
          maxIndex = i;
        }
      }
    }

    // Assign rank to the participant based on the index
    sortedParticipationRank.push({ ...quizParticipationsCopy[maxIndex], rank: sortedParticipationRank.length + 1 });
    quizParticipationsCopy.splice(maxIndex, 1);
  }

  return sortedParticipationRank;
};


import type { CubingContent } from '../types';

export const cubingContent: CubingContent[] = [
  {
    id: "2x2-speed",
    title: "2x2 Speed Solve",
    image: "/assets/cube2.jpg",
    videoPreviewImage: "/assets/cube2.jpg",
    description: "Quick 2x2 solve using Ortega method.",
    videoUrl: "",
    videoId: "",
    cubeType: "2x2 Cube",
    solveTime: "3.21 seconds",
    method: "Ortega",
    difficulty: "intermediate",
    personalBest: "2.89 seconds",
    content: {
      description: "The Ortega method is a popular method for solving the 2x2 Rubik's cube. It consists of three main steps: orienting the first face, orienting the opposite face, and permuting the corners. This method is known for its efficiency and relatively simple algorithms.",
      algorithms: [
        {
          name: "OLL Case 1",
          notation: "R U2 R' U' R U' R'",
          description: "Used to orient the last layer corners when all corners are oriented correctly."
        },
        {
          name: "PBL Case 1",
          notation: "R U' R' U' F2 U' R U R' D R2",
          description: "Used to permute the corners when adjacent corners need to be swapped."
        }
      ],
      tips: [
        "Practice finger tricks for faster execution",
        "Learn to recognize patterns quickly",
        "Use consistent color schemes for better recognition"
      ]
    }
  },
  {
    id: "3x3-speed",
    title: "3x3 Speed Solve",
    image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=2048&auto=format&fit=crop",
    videoPreviewImage: "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=2048&auto=format&fit=crop",
    description: "Personal best solve on the 3x3 Rubik's cube using CFOP method.",
    videoUrl: "https://youtu.be/ERZ5y3xPcWw?si=C-oT9orm8jGSSgPj",
    videoId: "ERZ5y3xPcWw",
    cubeType: "3x3 Rubik's Cube",
    solveTime: "10.45 seconds",
    method: "CFOP",
    difficulty: "advanced",
    personalBest: "9.87 seconds",
    content: {
      description: "The CFOP method (also known as the Fridrich method) is one of the most popular methods for solving the 3x3 Rubik's cube. It consists of four main steps: Cross, F2L, OLL, and PLL. This method is known for its efficiency and is used by most top speedcubers.",
      algorithms: [
        {
          name: "OLL Case 1",
          notation: "R U R' U R U2 R'",
          description: "Used to orient the last layer edges when all edges are oriented correctly."
        },
        {
          name: "PLL Case 1",
          notation: "R U R' U' R' F R2 U' R' U' R U R' F'",
          description: "Used to permute the last layer corners when adjacent corners need to be swapped."
        }
      ],
      tips: [
        "Practice cross on bottom for better look-ahead",
        "Learn full OLL and PLL for faster solves",
        "Use consistent finger tricks for algorithms"
      ]
    }
  },
  {
    id: "4x4-speed",
    title: "4x4 Solve",
    image: "/assets/cube4.webp",
    videoPreviewImage: "/assets/cube4.webp",
    description: "4x4 cube solve demonstration with Yau method.",
    videoUrl: "",
    videoId: "",
    cubeType: "4x4 Cube",
    solveTime: "45.32 seconds",
    method: "Yau",
    difficulty: "advanced",
    personalBest: "42.15 seconds",
    content: {
      description: "The Yau method is a popular method for solving the 4x4 Rubik's cube. It involves solving the centers and edges in a specific order, followed by solving the cube like a 3x3. This method is known for its efficiency and good look-ahead potential.",
      algorithms: [
        {
          name: "Edge Pairing Case 1",
          notation: "Uw R U R' F R' F' R Uw'",
          description: "Used to pair edges when they are on the same face."
        },
        {
          name: "Parity Case 1",
          notation: "r2 U2 r2 Uw2 r2 u2",
          description: "Used to fix parity when the last layer has an odd number of edge pairs."
        }
      ],
      tips: [
        "Practice center building for better efficiency",
        "Learn to recognize edge pairing cases quickly",
        "Use consistent color schemes for better recognition"
      ]
    }
  },
  {
    id: "5x5-speed",
    title: "5x5 Solve",
    image: "https://plus.unsplash.com/premium_photo-1668736594225-55e292fdd95e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    videoPreviewImage: "https://plus.unsplash.com/premium_photo-1668736594225-55e292fdd95e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "5x5 cube solve with reduction method.",
    videoUrl: "",
    videoId: "",
    cubeType: "5x5 Cube",
    solveTime: "1:45.67",
    method: "Reduction",
    difficulty: "advanced",
    personalBest: "1:40.23",
    content: {
      description: "The Reduction method is the standard method for solving the 5x5 Rubik's cube. It involves reducing the 5x5 to a 3x3 by solving the centers and edges, then solving it like a 3x3. This method requires good look-ahead and efficient center building.",
      algorithms: [
        {
          name: "Center Building Case 1",
          notation: "Uw Rw U Rw' Uw'",
          description: "Used to build centers when pieces are on adjacent faces."
        },
        {
          name: "Edge Pairing Case 1",
          notation: "Uw R U R' F R' F' R Uw'",
          description: "Used to pair edges when they are on the same face."
        }
      ],
      tips: [
        "Practice center building for better efficiency",
        "Learn to recognize edge pairing cases quickly",
        "Use consistent color schemes for better recognition"
      ]
    }
  }
]; 
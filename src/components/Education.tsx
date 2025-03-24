import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingSpinner } from './LoadingSpinner';
import { Book, Atom, TestTube, Calculator, Code, ArrowLeft, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Subject, Chapter } from '../types';
import { LoadingImageSkeleton } from './LoadingImageSkeleton';

const subjects: Subject[] = [
  {
    id: 'physics',
    name: 'Physics',
    icon: 'Atom',
    description: 'Explore the fundamental laws that govern our universe',
    chapters: [
      {
        "id": "physics-1",
        "title": "Physics and Measurement",
        "image": "https://plus.unsplash.com/premium_photo-1672256330251-a0432595f9cc?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "Introduction to the basics of physics and measurement systems",
        "driveLinks": [
          "https://drive.google.com/file/d/185IFTvMDb1_Ze47Xt_eT32xXTk9mDtSq/view?usp=drive_link",
          "https://drive.google.com/file/d/18VJyQi3jV_YwjQqwQ5GXjOYMPfkvRpGV/view?usp=drive_link",
          "https://drive.google.com/file/d/18Kiy3ZqS0j_-rtUgTIdimR6mahsSuxOh/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-2",
        "title": "Vectors",
        "image": "/assets/physics/vectors.jpg",
        "description": "Understanding Newton's laws and their applications",
        "driveLinks": [
          "https://drive.google.com/file/d/19M8bKq4UNlVkWj2Nes24mB9ZDkv2es-c/view?usp=drive_link",
          "https://drive.google.com/file/d/19aU1VGzH0oLM1b6UgVS59k7p6OogQGaw/view?usp=drive_link",
          "https://drive.google.com/file/d/19fQKqQ85GSDW2RkLnpAfVg2NduwLOC4m/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-3",
        "title": "Kinematics In 1-D",
        "image": "/assets/physics/kinematics1d.jpg",
        "description": "Study of motion without considering forces",
        "driveLinks": [
          "https://drive.google.com/file/d/1EmMFfgju7vMApg2qNKrK7m1LZ5vMIb40/view?usp=drive_link",
          "https://drive.google.com/file/d/1ErbNe3tif30kWesw5Zsb-uLCDyNTWb7l/view?usp=drive_link",
          "https://drive.google.com/file/d/1Ew7OFwQOGNd2ebS9wSgi5L7tublNhbIW/view?usp=drive_link",
          "https://drive.google.com/file/d/1FO2JM3rZjShc2N4jDUSTGRveUPMvB68X/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-4",
        "title": "Kinematics In 2-D",
        "image": "/assets/physics/2d.png",
        "description": "Study of motion without considering forces",
        "driveLinks": [
          "https://drive.google.com/file/d/1FFRcQZXQ0CwIuiROeEIv2e8-c9DtPVU5/view?usp=drive_link",
          "https://drive.google.com/file/d/1GGbMJzzgrFtcQjKwpCFPcT3yl3vBG6Iv/view?usp=drive_link",
          "https://drive.google.com/file/d/1Pt1gcWBkP-Zw6bQAht7n100NHkGOGSMg/view?usp=drive_link",
          "https://drive.google.com/file/d/1F8aM-7wDxRQXCzmM5u9W0YnBf6PRula-/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-5",
        "title": "Circular Motion and Collision",
        "image": "/assets/physics/circular.png",
        "description": "Understanding Newton's laws and their applications",
        "driveLinks": [
          "https://drive.google.com/file/d/1Y1nfKKtiw6-4GoWsmJo9ZwjSwfN-oABA/view?usp=drive_link",
          "https://drive.google.com/file/d/1R4udKtwqPON7vPcdpsU7ZMpgMNv_HH_c/view?usp=drive_link",
          "https://drive.google.com/file/d/1bRL70ZbCPdkyGEHdv8FzMxF5PKM0yjtD/view?usp=drive_link",
          "https://drive.google.com/file/d/1atHwLUN1QuQowPs8Badem52KlZb8k0yV/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-6",
        "title": "Laws of Motion",
        "image": "/assets/physics/laws_of_motion.jpeg",
        "description": "Understanding the laws governing objects in motion",
        "driveLinks": [
          "https://drive.google.com/file/d/1O2xvmrScJiBACfEioSz4UiUiKXgb_2wV/view?usp=drive_link",
          "https://drive.google.com/file/d/1PakpqLWQFM0S15JS6b_9FYUYX-9gbxAA/view?usp=drive_link",
          "https://drive.google.com/file/d/1PQMzixnDiOPsdsJQWbpfn9P4d6m5ESQC/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-7",
        "title": "Work, Energy, and Power",
        "image": "/assets/physics/work.jpeg",
        "description": "Concepts of energy, work, and power in mechanical systems",
        "driveLinks": [
          "https://drive.google.com/file/d/1S0UK45n5fOTXDeYgBW9GKOG8GtjfQh1O/view?usp=drive_link",
          "https://drive.google.com/file/d/1S7EhhoYjZdAYFCPIpTfhVU4V1bh4b_YW/view?usp=drive_link",
          "https://drive.google.com/file/d/1PakpqLWQFM0S15JS6b_9FYUYX-9gbxAA/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-8",
        "title": "Heat",
        "image": "/assets/physics/heat.webp",
        "description": "Heat, energy, and their transformations",
        "driveLinks": [
          "https://drive.google.com/file/d/1cgMSF4ThC5QZz1AQnOuIWzrwVdonxAD4/view?usp=drive_link",
          "https://drive.google.com/file/d/1YUTHkOUKGDO8fxdzJsJrzNulcIgKimmM/view?usp=drive_link",
          "https://drive.google.com/file/d/1Ys5_0y3DWey5tgHSIpkNS32IfBR7JS7U/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-9",
        "title": "Thermodynamics",
        "image": "/assets/physics/thermodynamics.png",
        "description": "Heat, energy, and their transformations",
        "driveLinks": [
          "https://drive.google.com/file/d/1WpXlz4XebeemRe2GWmUJLddQDWPsUh9U/view?usp=drive_link",
          "https://drive.google.com/file/d/1azCNr0JgU9CKiqqC_vQ3JSWx3I0oYIkL/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-10",
        "title": "Rotational Motion-1",
        "image": "/assets/physics/RM.jpg",
        "description": "Study of objects rotating around an axis",
        "driveLinks": [
          "https://drive.google.com/file/d/1atshpqN2MjpAA73jQLvM0Pzy-hV86Rem/view?usp=drive_link",
          "https://drive.google.com/file/d/1Ys9z4NnfD67n9--FYywDVEK8SsPb7D1B/view?usp=drive_link",
          "https://drive.google.com/file/d/1Wj9NbBxgMvxwLn7pputTJuBYrbA-EVZb/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-11",
        "title": "Rotational Motion-2",
        "image": "https://images.unsplash.com/photo-1500569051175-dc066c45410d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJvdGF0aW9uYWwlMjBtb3Rpb258ZW58MHx8MHx8fDA%3D",
        "description": "Study of objects rotating around an axis",
        "driveLinks": [
          "https://drive.google.com/file/d/1Wl6yZG8caqJ7H7Zr_73NGt97ikBAaBtE/view?usp=drive_link",
          "https://drive.google.com/file/d/1Wlgqvf7PF_HS5s78qcUwPQwPKHC7Og8j/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-12",
        "title": "Gravitation-1",
        "image": "/assets/physics/gravitation.jpg",
        "description": "The force of attraction between masses",
        "driveLinks": [
          "https://drive.google.com/file/d/1b-wdMpjyKI6SNWb_V_JJAMeN_FsorIT3/view?usp=drive_link",
          "https://drive.google.com/file/d/1b5pmFMq1Uv_7geL7Vb-SDUOiP-OKlq-s/view?usp=drive_link",
          "https://drive.google.com/file/d/1qF7neLlb94TVDxDb6GumQ1Fg5Tld3_RZ/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-13",
        "title": "Gravitation-2",
        "image": "https://images.unsplash.com/photo-1722331329498-fd3fd0af6e06?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "The force of attraction between masses",
        "driveLinks": [
          "https://drive.google.com/file/d/1afGi-zQ-pnVYktsb9n5x2sJTYy5tAan7/view?usp=drive_link",
          "https://drive.google.com/file/d/1b7DAFMv42RJ-9k1JWjcNOECYyTTLeZBx/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-14",
        "title": "Elasticity",
        "image": "/assets/physics/elasticity.jpg",
        "description": "Study of the mechanical properties of solids and liquids",
        "driveLinks": [
          "https://drive.google.com/file/d/1XGb8j_HxO2czSo9HHzJJvhR2WAxCvQ48/view?usp=drive_link",
          "https://drive.google.com/file/d/1Y_BtNFGZm6YFzKJcWoX_DnJkGG9gRiJD/view?usp=drive_link",
          ""
        ]
      },
      {
        "id": "physics-15",
        "title": "Fluid Mechanics",
        "image": "/assets/physics/fluids.jpg",
        "description": "Behavior of gases and their molecular motion",
        "driveLinks": [
          "https://drive.google.com/file/d/1_rEMbP9DTgvkOJrEPQLv2rxZTgqFb3iF/view?usp=drive_link",
          "https://drive.google.com/file/d/1cL-a5kEr2uprspO3lDVKrJRfBT5n_w5D/view?usp=drive_link",
          "https://drive.google.com/file/d/1HgrclC6N4w4mCmZ79_c30dXVmyto1rgL/view?usp=sharing",
          "https://drive.google.com/file/d/1_q0ccX6FUYfNBFd5yYSIQI7N2i_zhlrn/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-16",
        "title": "Kinetic Theory of Gases",
        "image": "/assets/physics/kinetic.jpg",
        "description": "Behavior of gases and their molecular motion",
        "driveLinks": [
          "https://drive.google.com/file/d/1b73JNyrTNHGMYq01UZIxahWHZRqXNPce/view?usp=sharing"
        ]
      },
      {
        "id": "physics-17",
        "title": "Oscillations and Waves",
        "image": "/assets/physics/oscillation.jpg",
        "description": "Study of periodic motion and wave phenomena",
        "driveLinks": [
          "https://drive.google.com/file/d/1bNwKteUQOgmZmwEIxGwmGcXgT9eXAM1C/view?usp=drive_link",
          "https://drive.google.com/file/d/1bWmpxjJrgP0YADlZztJILEBOuJIQpB5u/view?usp=drive_link",
          "https://drive.google.com/file/d/1X2dsUmah6brMIjQjov9_tQrKt8IaDg9X/view?usp=drive_link",
          "https://drive.google.com/file/d/1bkNZvJMInUH-OPNGoVVguivR7WvfZIEl/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-18",
        "title": "Electrostatics-1",
        "image": "/assets/physics/electrostatics1.jpeg",
        "description": "Study of electric charges and their interactions",
        "driveLinks": [
          "https://drive.google.com/file/d/1XFU0I-tMmvX7UhaFz5GdZG3TbVcJKBpZ/view?usp=drive_link",
          "https://drive.google.com/file/d/1XOscLU-5ydyaMxPDhVj9HknpIpvcetzH/view?usp=drive_link",
          "https://drive.google.com/file/d/1XFpNo6pXCt62IwBHLHVqhfoWRZYrE03t/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-19",
        "title": "Electrostatics-2",
        "image": "https://plus.unsplash.com/premium_photo-1664302244254-0b614b519f19?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "Study of electric charges and their interactions",
        "driveLinks": [
          "https://drive.google.com/file/d/1XS0p_gFljDfEQ1OuM8dGQgiYwalw58Bd/view?usp=drive_link",
          "https://drive.google.com/file/d/1hXs7ccJ73AUp7TKP1zBIDkBQk8TCJmZB/view?usp=drive_link",
          "https://drive.google.com/file/d/1ht5fHl_K6gadJMeebzMFYXxga3W4cTyB/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-20",
        "title": "Electrostatics-3",
        "image": "/assets/physics/electrostatics3.jpg",
        "description": "Study of electric charges and their interactions",
        "driveLinks": [
          "https://drive.google.com/file/d/1hvjNVluchCQHl2A0D-YXj61s9U9r3BQ_/view?usp=drive_link",
          "https://drive.google.com/file/d/1i3JqbHmP5o9o098FJWK1R4TxAv9M4hUW/view?usp=drive_link",
          "https://drive.google.com/file/d/1hfn4rtNqc-Sq5lZVWznUs8Zjx4DTA30O/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-21",
        "title": "Current Electricity",
        "image": "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "Study of electric current and its effects",
        "driveLinks": [
          "https://drive.google.com/file/d/1k6Zv4pjcDMJTiTwO17DOUSnCsEOjV-UJ/view?usp=drive_link",
          "https://drive.google.com/file/d/1KcNDIdaIus_CKXk8CevRgdUgGeRCWyGL/view?usp=drive_link",
          "https://drive.google.com/file/d/1i1jNDHpu6cFhERvdr6GCLJ7Mnu3rFddh/view?usp=drive_link",
          "https://drive.google.com/file/d/1XOsMGNm70lefEtEHqLrNsbksuNWicdOa/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-22",
        "title": "Current Electricity-2",
        "image": "https://images.unsplash.com/photo-1582481024061-4be0e115414f?q=80&w=2079&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "Study of electric current and its effects",
        "driveLinks": [
          "https://drive.google.com/file/d/1IAQzkGeB2n8bSd4p77ZHdszadR97CjM6/view?usp=drive_link",
          "https://drive.google.com/file/d/1I9NYgJOxKqdSoqIpnVxZTSCBcJ1s4Xpp/view?usp=drive_link",
          "https://drive.google.com/file/d/1HqNtoaM-BVI8M2U41BDQ-h18MZrABhLY/view?usp=drive_link",
          "https://drive.google.com/file/d/1XISMsWXLw5CSrKmYTtg3aQGX0_rc1Dmv/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-23",
        "title": "Magnetic Effects of Current",
        "image": "/assets/physics/mec.png",
        "description": "Understanding magnetic fields and their effects",
        "driveLinks": [
          "https://drive.google.com/file/d/1SUJFGY1JhzxyMN04JysQ51INOajuXKos/view?usp=drive_link",
          "https://drive.google.com/file/d/1SS8ykFZSJDGTwGwufP5RAkFAMxq1yq8A/view?usp=drive_link",
          "https://drive.google.com/file/d/1HphAQ6kQSsJQ7dylc-ZoPQgMQWMUGGpU/view?usp=drive_link",
          "https://drive.google.com/file/d/1XePfbzbFwgH_VyT-l3ZTQvzk4M00xplf/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-24",
        "title": "Magnetic Effects of Current-2",
        "image": "/assets/physics/mec2.png",
        "description": "Understanding magnetic fields and their effects",
        "driveLinks": [
          "https://drive.google.com/file/d/1XR9NTv74_5RB42h344RmSDkz2BbXZcdm/view?usp=drive_link",
          "https://drive.google.com/file/d/1k-suM5uxRnFJHFCuIuMZjN37CKEQDnlz/view?usp=drive_link",
          "https://drive.google.com/file/d/1Xk9IuniLEWhn1E9XGYMKH4Q_MW4BMAII/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-25",
        "title": "Magnetism-1",
        "image": "https://plus.unsplash.com/premium_photo-1682309664650-6683b2fbc790?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "Understanding magnetic fields and their effects",
        "driveLinks": [
          "https://drive.google.com/file/d/1WE2hO0AEuSUwzAlQIGEHmZTo-PYWhva8/view?usp=drive_link",
          "https://drive.google.com/file/d/1WI3Wv4VjVG0LSiulHtNN5GDnQDIyOCoQ/view?usp=drive_link",
          "https://drive.google.com/file/d/1XTZfFxIm5v-UqsKLGz0A0-mHMG6rxDL_/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-26",
        "title": "Magnetism-2",
        "image": "/assets/physics/magnetism.jpg",
        "description": "Understanding magnetic fields and their effects",
        "driveLinks": [
          "https://drive.google.com/file/d/1VcJGl2LYp2a6ipvANmaeIy8XorXfZMlB/view?usp=drive_link",
          "https://drive.google.com/file/d/1ukiHVTkEImTV0E2HU5DaSecl7owqADis/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-27",
        "title": "Alternating Currents",
        "image": "/assets/physics/current.jpeg",
        "description": "Study of induced currents and alternating current circuits",
        "driveLinks": [
          "https://drive.google.com/file/d/1XF8UL9IMy7Qag-VrdD4Oi8lBF1D-m91Y/view?usp=drive_link",
          "https://drive.google.com/file/d/1k4urVEK7FhEfM4Mfcaflfh0MJliGS4zM/view?usp=drive_link",
          "https://drive.google.com/file/d/15--h9H12hsAaMRFkOkZKhEh3iH5s4WlO/view?usp=drive_link",
          "https://drive.google.com/file/d/153pmSI8u52wp8QCwo8NnjwAzb6r6A3pC/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-28",
        "title": "Electromagnetic Induction-1",
        "image": "/assets/physics/emi.jpg",
        "description": "Study of induced currents and alternating current circuits",
        "driveLinks": [
          "https://drive.google.com/file/d/1kXLuBUEsI9X_6MiEWpVdmWRlCJYw9MED/view?usp=drive_link",
          "https://drive.google.com/file/d/1kPD8QCASBBI9ItaVq5Z7d0YCmrSfE_MF/view?usp=drive_link",
          "https://drive.google.com/file/d/1k0PF7vZYZxzpeSBiTWvsCwUEfPKIla5V/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-29",
        "title": "Electromagnetic Induction-2",
        "image": "/assets/physics/emi2.png",
        "description": "Study of induced currents and alternating current circuits",
        "driveLinks": [
          "https://drive.google.com/file/d/14yVWC3eVhYPEnMWK4RxiHuFk5NJO4WHn/view?usp=drive_link",
          "https://drive.google.com/file/d/1Yl2qPbb-u64WNV5FM0DYLPLorhbmwhsV/view?usp=drive_link",
          "https://drive.google.com/file/d/1mnyUCuXdy8IncpFvP-F-cuI3K9BDoFoe/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-30",
        "title": "Electromagnetic Waves",
        "image": "/assets/physics/emw.png",
        "description": "Behavior and properties of electromagnetic waves",
        "driveLinks": [
          "https://drive.google.com/file/d/1mgS-b_geCP1yLZEHoNr7fBiFCJMjj7h-/view?usp=drive_link",
          "https://drive.google.com/file/d/12Vs_zaF0thGHM3UFSj6OTdOVb5ujmoj8/view?usp=drive_link",
          "https://drive.google.com/part3"
        ]
      },
      {
        "id": "physics-31",
        "title": "Ray Optics",
        "image": "/assets/physics/ray.png",
        "description": "Study of light and its behavior",
        "driveLinks": [
          "https://drive.google.com/file/d/1L6DiXUB7TOfiBr30xVgO89N0ri3CKoiJ/view?usp=drive_link",
          "https://drive.google.com/file/d/1L7zMt0_HnY1lsZlOf7TUbOFc5d3kkb5f/view?usp=drive_link",
          "https://drive.google.com/file/d/1XN09DXgd8RAHdNORGnGmkk9qaNz3p2fD/view?usp=drive_link",
          "https://drive.google.com/file/d/1172BNdgMhT7WOaYiC_T07aBzDAvCzTUc/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-32",
        "title": "Wave Optics",
        "image": "/assets/physics/wave.jpg",
        "description": "Study of light and its behavior",
        "driveLinks": [
          "https://drive.google.com/file/d/15dANG9oIrh7Qs7pgWBoZivkl9DTOk8xe/view?usp=drive_link",
          "https://drive.google.com/file/d/1GFtA6CAcPdxBbGPasJvXziiUWeofQgBB/view?usp=drive_link",
          "https://drive.google.com/file/d/1GFTzacmJ9g8sL_3zcPOVve3lfn5pPi3P/view?usp=drive_link",
          "https://drive.google.com/file/d/1s_QdQcPAWw8BHgLmdP1W8fjjxqYEolsG/view?usp=drive_link"
        ]
      },
      {
        "id": "physics-33",
        "title": "Dual Nature of Matter and Radiation",
        "image": "/assets/physics/DNMR.jpeg",
        "description": "The wave-particle duality of matter and radiation",
        "driveLinks": [
          "https://drive.google.com/file/d/1itfskkkCSuRmC3712dDpuGdsOavxwUDG/view?usp=sharing",
          "https://drive.google.com/part1",
          "https://drive.google.com/part3"
        ]
      },
      {
        "id": "physics-34",
        "title": "Atoms and Nuclei",
        "image": "https://plus.unsplash.com/premium_photo-1669658980877-7b4da0f675ac?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "Structure and behavior of atoms and their nuclei",
        "driveLinks": [
          "https://drive.google.com/file/d/12UzApZW4HIsbhSyAcqH2uw5oivJWxqDN/view?usp=sharing",
          "https://drive.google.com/file/d/1iQgNxZgkYlHTCmDNZdhEwV6j-kiGklIb/view?usp=drive_link",
          "https://drive.google.com/file/d/1XgZ3Pv_naEOqID_oPVZbb_0V1I4o5Y7t/view?usp=drive_link",
          "https://drive.google.com/file/d/1tZKbhxipZf7BX5KkpisJsOa2PuU6UzaQ/view?usp=drive_link"
        ]
      },
      {
        id: 'physics-20',
        title: 'Electronic Devices',
        image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of electronic components and circuits',
        driveLinks: [ // Changed to array
          'https://drive.google.com/file/d/1iVRJ-u0L95eQ_6nnDr1YeKmje_Rbru-x/view?usp=sharing',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'physics-21',
        title: 'Communication Systems',
        image: 'https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Principles of communication and information transfer',
        driveLinks: [ // Changed to array
          'https://drive.google.com/file/d/1l2WaL3HQ-36YNHpNhmgSx80DPN6oBBc9/view?usp=drive_link',
          'https://drive.google.com/file/d/1l-rTy4u7gwKN3Z2LcQ74jNLjKUlZR9zo/view?usp=drive_link',
          'https://drive.google.com/file/d/1afGi-zQ-pnVYktsb9n5x2sJTYy5tAan7/view?usp=drive_link'
        ]
      }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: 'TestTube',
    description: 'Discover the composition and properties of matter',
    chapters: [
      {
        id: 'chemistry-1',
        title: 'Some Basic Concepts of Chemistry',
        image: 'https://plus.unsplash.com/premium_photo-1661430659143-ffbb5ce2b6a7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Introduction to chemistry fundamentals',
        driveLinks: [ 
          'https://drive.google.com/file/d/1A2ANXYBnStPGXEoBAGDwKJWdnkxFNL1J/view?usp=drive_link',
          'https://drive.google.com/file/d/1AAV88PjWeGRtYiJPVbLc61woAsx_8sxp/view?usp=drive_link',
          'https://drive.google.com/file/d/1AT7kwyEXzt5_ijJIYN8UNcNkx05gAtaN/view?usp=drive_link',
          'https://drive.google.com/file/d/1B15sQAjDg6987mJEn9E2vkPGJya2BhJg/view?usp=drive_link'
        ]
      },
      {
        id: 'chemistry-2',
        title: 'Structure of Atom',
        image: 'https://plus.unsplash.com/premium_photo-1673892648202-2dbdc2a3a955?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Understanding atomic structure and models',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/file/d/1HBV48aPViyb6CDYd9Ltd7c_NezKULelC/view?usp=drive_link',
          'https://drive.google.com/file/d/1HRzOs_mWDvce2NgIL2J8VIzIROUAsDLU/view?usp=drive_link',
          'https://drive.google.com/file/d/1RFLbCwHeOWNfVtpkjvBaiRJ_ARzH4kB7/view?usp=drive_link'
        ]
      },
      {
        id: 'chemistry-3',
        title: 'Classification of Elements and Periodicity in Properties',
        image: 'https://images.unsplash.com/photo-1627389955611-70c92a5d2e2b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of the periodic table and periodic trends',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/file/d/1LqiuEz3oPMabFwxQ-kTZwWbhv8-5xnl4/view?usp=drive_link',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'chemistry-4',
        title: 'Chemical Bonding and Molecular Structure',
        image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6',
        description: 'Understanding molecular structures',
        driveLinks: [ // Changed to array
          'https://drive.google.com/file/d/1LzaxedvWBK7K230UNJPfWRGgcDND9aya/view?usp=drive_link',
          'https://drive.google.com/file/d/1M7Vyc3BHa7omrK1wj9DsPKFvzNGSI07W/view?usp=drive_link',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'chemistry-5',
        title: 'States of Matter: Gases and Liquids',
        image: 'https://plus.unsplash.com/premium_photo-1720189952226-5d72d4b73554?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'The properties and behaviors of gases and liquids',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/file/d/1eGLkzUkKbO2cOfDwW9xF06_JLggtpgaV/view?usp=drive_link',
          'https://drive.google.com/file/d/1eHtK20843lYquIpLWvO1Iktg-pkmJpUS/view?usp=drive_link',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'chemistry-6',
        title: 'Thermodynamics',
        image: 'https://images.unsplash.com/photo-1539186607619-df476afe6ff1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of heat, energy, and work',
        driveLinks: [ // Changed to array
          'https://drive.google.com/file/d/1epTO60wsKrZXj6D8K8O-2EX0bvTiYg4S/view?usp=drive_link',
          'https://drive.google.com/file/d/1fHl0jup82BsU6rElcJzcaVNXSeEHt-ZY/view?usp=drive_link',
          'https://drive.google.com/file/d/1X_yiLmn9gBHt8-TMfjXJR9eKKt5OjhPD/view?usp=drive_link'
        ]
      },
      {
        id: 'chemistry-7',
        title: 'Equilibrium',
        image: 'https://images.unsplash.com/photo-1433439216031-9571132ce719?q=80&w=2003&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Understanding chemical equilibria and Le Chatelier\'s principle',
        driveLinks: [ // Changed to array
          'https://drive.google.com/file/d/1eCOxFBxnFEZNQ-LZLxdjKoCqJcB9-yVZ/view?usp=drive_link',
          'https://drive.google.com/file/d/18BNnVwIf_1LVzgsKrn7hKxH7l2r5qnHY/view?usp=drive_link',
          'https://drive.google.com/file/d/1M9GfjB6J5fEzPmm12EgdSKMtb5gXt9ga/view?usp=drive_link',
          'https://drive.google.com/file/d/1rRDqcayWoL7i7qinqM90X_pvll6W9Mb4/view?usp=drive_link'
        ]
      },
      {
        id: 'chemistry-7',
        title: 'Solid State',
        image: 'https://plus.unsplash.com/premium_photo-1671707015865-5460da84b32e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Understanding chemical equilibria and Le Chatelier\'s principle',
        driveLinks: [ // Changed to array
          'https://drive.google.com/file/d/1LF0x4qPIO2lRetXGXzmK2K7dhAbLwCcX/view?usp=drive_link',
          'https://drive.google.com/file/d/12ZQZidIkjJ42tiAI_AKhSt768mYoCnXh/view?usp=drive_link',
          'https://drive.google.com/file/d/12JRULMhnLP9SYc9--euNOpwLZVMkdhEJ/view?usp=drive_link',
          'https://drive.google.com/file/d/119DTsoFLdZdSYZNDred9DVe9mNnfhb4d/view?usp=drive_link'
        ]
      },
      {
        id: 'chemistry-7',
        title: 'Solutions',
        image: 'https://images.unsplash.com/photo-1459802071246-377c0346da93?q=80&w=1795&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Understanding chemical equilibria and Le Chatelier\'s principle',
        driveLinks: [ // Changed to array
          'https://drive.google.com/file/d/1LDTcpcOvAxZN7LOdkk4tmHE-jTFN3vUQ/view?usp=drive_link',
          'https://drive.google.com/file/d/1eCOKIViJ70G7CS1JXtLjY_dOEmR2pftX/view?usp=drive_link',
          ''
        
        ]
      },     
      {
        id: 'chemistry-7',
        title: 'Chemical Kinetics',
        image: 'https://images.unsplash.com/photo-1643625757115-a712ca47a3af?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Understanding chemical equilibria and Le Chatelier\'s principle',
        driveLinks: [ // Changed to array
          'https://drive.google.com/file/d/1g8JeN9F6z7nX-COx1uc4jJooS1gPYoac/view?usp=drive_link',
          'https://drive.google.com/file/d/1ETVVALehPDVcFRscI5Xt8cN05stYfDOd/view?usp=drive_link',
          'https://drive.google.com/file/d/1ljIw50cR9SgnvhiI93BYwZ378EZf9hvO/view?usp=drive_link'
        
        ]
      },
      {
        id: 'chemistry-7',
        title: 'ElectroChemistry',
        image: 'https://plus.unsplash.com/premium_photo-1675662138450-e76e39cc0ef9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Understanding chemical equilibria and Le Chatelier\'s principle',
        driveLinks: [ // Changed to array
          'https://drive.google.com/file/d/1rlANKpOjy6WOUQIaEz3FJR4i1oLh5P6H/view?usp=drive_link',
          'https://drive.google.com/file/d/1gHm2f4skPtOvO946lKo1VHfYtEoHzvF-/view?usp=drive_link',
          ''
        
        ]
      },
      {
        id: 'chemistry-7',
        title: 'SurfaceChemistry',
        image: 'https://images.unsplash.com/photo-1451188214936-ec16af5ca155?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Understanding chemical equilibria and Le Chatelier\'s principle',
        driveLinks: [ // Changed to array
          'https://drive.google.com/file/d/15vz5nmVPLnN-RI9WdwX11gqjFefbsxXn/view?usp=drive_link',
          '',
          ''
        
        ]
      },
      {
        id: 'chemistry-8',
        title: 'Redox Reactions',
        image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of oxidation and reduction processes',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/file/d/18bsrGXgKY9ehNropm8NgWVvhxUbvmdW4/view?usp=drive_link',
          'https://drive.google.com/file/d/1bxL6VIIMxbKahrUY3nPoKez1jekDO9r6/view?usp=drive_link',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'chemistry-9',
        title: 'Hydrogen',
        image: 'https://plus.unsplash.com/premium_photo-1673830981161-16872c70df8d?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'The chemistry and uses of hydrogen',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/file/d/17w9TcUkEV4xkUiCADoZVrejpSuzgxDc5/view?usp=drive_link',
          'https://drive.google.com/file/d/1M7_9R0G7eGDiaT4JZIJfaM88f9saiwFp/view?usp=drive_link',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'chemistry-10',
        title: 's-Block Elements (Alkali and Alkaline Earth Metals)',
        image: 'https://plus.unsplash.com/premium_photo-1671068039583-ebbcfa1bc670?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of alkali and alkaline earth metals',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/file/d/180mSdwTGTjMl18GMZ6LCBpFFRCc4jLBi/view?usp=drive_link',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'chemistry-11',
        title: 'Some p-Block Elements',
        image: 'https://plus.unsplash.com/premium_photo-1668736594225-55e292fdd95e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHMlMjBibG9jayUyMGVsZW1lbnRzfGVufDB8fDB8fHww',
        description: 'Study of p-block elements and their chemistry',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/file/d/181IDw92m5S4eLDNJmwRCBAlfOwQg5l7X/view?usp=drive_link',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'chemistry-12',
        title: 'General Organic Chemitry-1',
        image: 'https://plus.unsplash.com/premium_photo-1715107534372-0711eae7153c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of alkanes, alkenes, and alkynes',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/file/d/1EcYSvzg1aeDGK48KTAb_4LisHFrPGtmb/view?usp=drive_link',
          'https://drive.google.com/file/d/1EdL4_gZG7yXe7iRNpZxNjAIj3FnAMWVP/view?usp=drive_link',
          'https://drive.google.com/file/d/1Humg-YcE0DOlRpzPV4h-qtGJoCJjomKT/view?usp=drive_link',
          'https://drive.google.com/file/d/1STt6S8jDSpYIKi9qxKRhYD3OAklpLrc8/view?usp=drive_link'
        ]
      },
      {
        id: 'chemistry-12',
        title: 'General Organic Chemitry-2',
        image: 'https://plus.unsplash.com/premium_photo-1715107534372-0711eae7153c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of alkanes, alkenes, and alkynes',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/file/d/1EA_b6m1LvdIveykuWlSCpz17IeIKhcJe/view?usp=drive_link',
          'https://drive.google.com/file/d/1DtvG1JSxt0yTGvhkNDEpQwQN-aPBcfyG/view?usp=drive_link',
          'https://drive.google.com/file/d/1EKUc5PXAaIbOfTwaOX4R9qO0QVlpQKNx/view?usp=drive_link',
          'https://drive.google.com/file/d/1E5NsOPhs69Ga46NuRyOsZGVIgvjMT04l/view?usp=drive_link'
        ]
      },
      {
        id: 'chemistry-13',
        title: 'Environmental Chemistry',
        image: 'https://images.unsplash.com/photo-1723244684626-5623fb0d8295?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'The study of chemistry in the environment',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/file/d/17qZXV9VSXULheutppz31wfBq4j4oNoRn/view?usp=drive_link',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'chemistry-14',
        title: 'd- and f-Block Elements',
        image: 'https://plus.unsplash.com/premium_photo-1700068553658-5bed4f670451?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of transition metals and inner transition elements',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/file/d/17_FrzKsOs262d-vmFQ-LPOBztGS1BsKl/view?usp=drive_link',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'chemistry-15',
        title: 'Coordination Compounds',
        image: 'https://images.unsplash.com/photo-1562411052-105105232432?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of complex compounds formed by metals',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/file/d/17Wt4ntDZVuSzgqcbho0A0ST4wTWZPnCQ/view?usp=drive_link',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'chemistry-16',
        title: 'Some Basic Principles and Techniques of Organic Chemistry',
        image: 'https://plus.unsplash.com/premium_photo-1663100641774-cb51237207c6?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Fundamental principles and techniques in organic chemistry',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/file/d/1A4p-koLwoyPoSR07F00AnPLnTTq5mP2H/view?usp=drive_link',
          'https://drive.google.com/file/d/1AFcsW0cfYdToAFXiI36VwRWJ0aFBnpe4/view?usp=drive_link',
          'https://drive.google.com/file/d/1AGwqrdvIAYdG1bGtO-azfJAYmOEhXA6Y/view?usp=drive_link'
        ]
      },
      {
        id: 'chemistry-17',
        title: 'Hydrocarbons (Alkanes, Alkenes, Alkynes)',
        image: 'https://images.unsplash.com/photo-1531956656798-56686eeef3d4?q=80&w=2054&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of different types of hydrocarbons',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/file/d/18mhTAg5jOaEjDbC5Kd5AVJ_cN5tRqg8V/view?usp=drive_link',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'chemistry-18',
        title: 'Haloalkanes and Haloarenes',
        image: 'https://images.unsplash.com/photo-1534744971734-e1628d37ea01?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of halogenated organic compounds',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/file/d/18r8RC67yLrjtbLUVUBiyK-ceyv9x236V/view?usp=drive_link',
          'https://drive.google.com/file/d/18pbwCGIDZgZy70WkQuK92XUOc-JNJfmT/view?usp=drive_link',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'chemistry-19',
        title: 'Alcohols, Phenols, and Ethers',
        image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of alcohols, phenols, and ethers',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/file/d/19x26H9EOZU5jP1O3K9cCO29PC0CG_oyK/view?usp=drive_link',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'chemistry-20',
        title: 'Aldehydes, Ketones and Carboxylic Acids',
        image: 'https://images.unsplash.com/photo-1631106321638-d94d9a8f3e1f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of carbonyl compounds and carboxylic acids',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/file/d/1jiJGWVOtHfHp8M77eTBZGBwVPDqkhF2K/view?usp=drive_link',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'chemistry-21',
        title: 'Organic Compounds Containing Nitrogen',
        image: 'https://images.unsplash.com/photo-1653226539322-55de1cc336be?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of nitrogen-containing organic compounds',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/file/d/19y2yVPKeeHiTwWrQVQnxbyCHq0NOqjxw/view?usp=drive_link',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'chemistry-22',
        title: 'Biomolecules',
        image: 'https://images.unsplash.com/photo-1475906089153-644d9452ce87?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of biological molecules and their functions',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/file/d/17TOgYSFI0t1aUdKjDMGLmiglSJ5vEr4p/view?usp=drive_link',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'chemistry-23',
        title: 'Polymers',
        image: 'https://plus.unsplash.com/premium_photo-1681505601897-5171f4baf000?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of macromolecules and their properties',
        driveLinks: [ // Changed to array
          'https://drive.google.com/file/d/17bJgRlh7CTCbTU6UyOg1OGPvcpdHIfi5/view?usp=drive_link',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'chemistry-24',
        title: 'Chemistry in Everyday Life',
        image: 'https://images.unsplash.com/photo-1581093577421-f561a654a353?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Understanding the role of chemistry in daily life',
        driveLinks: [ // Changed to array
          'https://drive.google.com/part1',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      }
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: 'Calculator',
    description: 'Master the language of numbers and patterns',
    chapters: [
      {
        id: 'math-1',
        title: 'Sets, Relations, and Functions',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
        description: 'Understanding sets, relations, and functions',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/part1',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'math-2',
        title: 'Complex Numbers and Quadratic Equations',
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904',
        description: 'Introduction to complex numbers and solving quadratic equations',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/part1',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'math-3',
        title: 'Matrices and Determinants',
        image: 'https://plus.unsplash.com/premium_photo-1724800663657-3e57bf4f622c?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Mathematical operations on matrices and determinants',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/part1',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'math-4',
        title: 'Permutations and Combinations',
        image: 'https://images.unsplash.com/photo-1632571401005-458e9d244591?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Counting principles and arrangement techniques',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/part1',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'math-5',
        title: 'Binomial Theorem and its Applications',
        image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/part1',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'math-6',
        title: 'Sequences and Series',
        image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of arithmetic, geometric, and harmonic series',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/part1',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'math-7',
        title: 'Limits, Continuity, and Differentiability',
        image: 'https://images.unsplash.com/photo-1453733190371-0a9bedd82893?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Fundamentals of limits, continuity, and derivatives',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/part1',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'math-8',
        title: 'Integral Calculus',
        image: 'https://plus.unsplash.com/premium_photo-1724800663787-094f67f76f82?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of integration techniques and applications',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/part1',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'math-9',
        title: 'Differential Equations',
        image: 'https://images.unsplash.com/photo-1561089489-f13d5e730d72?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Solving differential equations and their applications',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/part1',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'math-10',
        title: 'Coordinate Geometry',
        image: 'https://plus.unsplash.com/premium_photo-1723579268175-d27d90cd4772?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of geometry using coordinate systems',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/part1',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'math-11',
        title: 'Three-Dimensional Geometry',
        image: 'https://plus.unsplash.com/premium_photo-1723485677517-06cc8fe09239?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Geometric concepts in three dimensions',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/part1',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'math-12',
        title: 'Vector Algebra',
        image: 'https://plus.unsplash.com/premium_photo-1724266846347-bd10efdd330e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Operations and properties of vectors',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/part1',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'math-13',
        title: 'Trigonometry',
        image: 'https://plus.unsplash.com/premium_photo-1723651610472-1ee8bdc7082f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Trigonometric functions, identities, and properties',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/part1',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'math-14',
        title: 'Mathematical Reasoning',
        image: 'https://plus.unsplash.com/premium_photo-1676422355992-703feab0d80d?q=80&w=1895&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Study of logical reasoning in mathematics',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/part1',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'math-15',
        title: 'Statistics and Probability',
        image: 'https://plus.unsplash.com/premium_photo-1663040508857-1b46f49edde2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Analysis of data and probability theory',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/part1',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'math-16',
        title: 'Relations and Functions',
        image: 'https://images.unsplash.com/photo-1548690596-f1722c190938?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Fundamentals of relations, functions, and their properties',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/part1',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      },
      {
        id: 'math-17',
        title: 'Linear Programming',
        image: 'https://images.unsplash.com/photo-1635070041409-e63e783ce3c1?q=80&w=1979&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Optimization problems using linear equations',
        driveLinks:  [ // Changed to array
          'https://drive.google.com/part1',
          'https://drive.google.com/part2',
          'https://drive.google.com/part3'
        ]
      }
    ]
  },{
    id: 'Coding',
    name: 'Coding',
    icon: 'Code',
    description: 'Master all the languages',
    chapters: [
      {
        id: 'aiml-1',
        title: 'Artificial Intelligence and Machine Learning',
        image: 'assets/coding/aiml.png',
        description: 'Introduction to AI and ML concepts',
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ]
      },
      {
        id: 'python-1',
        title: 'Python Programming',
        image: '/assets/coding/python.webp',
        description: 'Fundamentals of Python programming',
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ]
      },
      {
        id: 'cpp-1',
        title: 'C++ Programming',
        image: '/assets/coding/cpp.png',
        description: 'Introduction to C++ and object-oriented programming',
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ]
      },
      {
        id: 'javascript-1',
        title: 'JavaScript',
        image: '/assets/coding/javascript.jpg',
        description: 'Learn JavaScript for web development',
        driveLinks: [
        //   'https://drive.google.com/part1',
        //   'https://drive.google.com/part2',
        //   'https://drive.google.com/part3'
         ]
      },
      {
        id: 'html-1',
        title: 'HTML',
        image: '/assets/coding/html.png',
        description: 'Basics of HTML for web structuring',
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ]
      },
      {
        id: 'css-1',
        title: 'CSS',
        image: '/assets/coding/css.png',
        description: 'Styling web pages with CSS',
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ]
      },
      {
        id: 'c-1',
        title: 'C Programming',
        image: '/assets/coding/c.png',
        description: 'Introduction to C programming language',
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ]
      },
      {
        id: 'tailwind-1',
        title: 'Tailwind CSS',
        image: '/assets/coding/taliwind.png',
        description: 'Learn how to style websites using Tailwind CSS',
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ]
      },
      {
        id: 'bootstrap-1',
        title: 'Bootstrap',
        image: '/assets/coding/bootstrap.png',
        description: 'Learn Bootstrap framework for responsive web design',
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ]
      },
      {
        id: 'java-1',
        title: 'Java Programming',
        image: '/assets/coding/java.png',
        description: 'Object-oriented programming with Java',
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ]
      },
      {
        id: 'react-1',
        title: 'React',
        image: '/assets/coding/react.png',
        description: 'Learn React for front-end development',
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ]
      },
      {
        id: 'kotlin-1',
        title: 'Kotlin',
        image: '/assets/coding/kotlin.avif',
        description: 'Kotlin programming for Android development',
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ]
      },
      {
        id: 'sql-1',
        title: 'SQL',
        image: '/assets/coding/sql.jpeg',
        description: 'Learn database management using SQL',
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ]
      },
      {
        id: 'github-1',
        title: 'GitHub & Version Control',
        image: '/assets/coding/github.jpg',
        description: 'Learn Git and GitHub for version control',
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ]
      },
     
    ]
  },
  // {
  //   id: 'English',
  //   name: 'English',
  //   icon: 'book',
  //   description: 'Master all the languages',
  //   chapters: [
  //     {
  //       id: 'aiml-1',
  //       title: 'Artificial Intelligence and Machine Learning',
  //       image: 'https://images.unsplash.com/photo-1581093458791-4f07e3d1ab29',
  //       description: 'Introduction to AI and ML concepts',
  //       driveLinks: [
  //         'https://drive.google.com/part1',
  //         'https://drive.google.com/part2',
  //         'https://drive.google.com/part3'
  //       ]
  //     },
  //     {
  //       id: 'python-1',
  //       title: 'Python Programming',
  //       image: 'https://images.unsplash.com/photo-1580126687423-5c6846f03972',
  //       description: 'Fundamentals of Python programming',
  //       driveLinks: [
  //         'https://drive.google.com/part1',
  //         'https://drive.google.com/part2',
  //         'https://drive.google.com/part3'
  //       ]
  //     },
  //     {
  //       id: 'cpp-1',
  //       title: 'C++ Programming',
  //       image: 'https://images.unsplash.com/photo-1532619187607-dcb5f34d90ed',
  //       description: 'Introduction to C++ and object-oriented programming',
  //       driveLinks: [
  //         'https://drive.google.com/part1',
  //         'https://drive.google.com/part2',
  //         'https://drive.google.com/part3'
  //       ]
  //     },
  //     {
  //       id: 'javascript-1',
  //       title: 'JavaScript',
  //       image: 'https://images.unsplash.com/photo-1580910051072-24588f6dd678',
  //       description: 'Learn JavaScript for web development',
  //       driveLinks: [
  //         'https://drive.google.com/part1',
  //         'https://drive.google.com/part2',
  //         'https://drive.google.com/part3'
  //       ]
  //     },
  //     {
  //       id: 'html-1',
  //       title: 'HTML',
  //       image: 'https://images.unsplash.com/photo-1508921340878-ba53e1f016ec',
  //       description: 'Basics of HTML for web structuring',
  //       driveLinks: [
  //         'https://drive.google.com/part1',
  //         'https://drive.google.com/part2',
  //         'https://drive.google.com/part3'
  //       ]
  //     },
  //     {
  //       id: 'css-1',
  //       title: 'CSS',
  //       image: 'https://images.unsplash.com/photo-1537432376769-00d9ba6f2047',
  //       description: 'Styling web pages with CSS',
  //       driveLinks: [
  //         'https://drive.google.com/part1',
  //         'https://drive.google.com/part2',
  //         'https://drive.google.com/part3'
  //       ]
  //     },
  //     {
  //       id: 'c-1',
  //       title: 'C Programming',
  //       image: 'https://images.unsplash.com/photo-1629429800129-15fb6d76efdb',
  //       description: 'Introduction to C programming language',
  //       driveLinks: [
  //         'https://drive.google.com/part1',
  //         'https://drive.google.com/part2',
  //         'https://drive.google.com/part3'
  //       ]
  //     },
  //     {
  //       id: 'tailwind-1',
  //       title: 'Tailwind CSS',
  //       image: 'https://images.unsplash.com/photo-1624221807865-1f4ad3e238a2',
  //       description: 'Learn how to style websites using Tailwind CSS',
  //       driveLinks: [
  //         'https://drive.google.com/part1',
  //         'https://drive.google.com/part2',
  //         'https://drive.google.com/part3'
  //       ]
  //     },
  //     {
  //       id: 'bootstrap-1',
  //       title: 'Bootstrap',
  //       image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
  //       description: 'Learn Bootstrap framework for responsive web design',
  //       driveLinks: [
  //         'https://drive.google.com/part1',
  //         'https://drive.google.com/part2',
  //         'https://drive.google.com/part3'
  //       ]
  //     },
  //     {
  //       id: 'java-1',
  //       title: 'Java Programming',
  //       image: 'https://images.unsplash.com/photo-1627620320213-fdaa89fca6d7',
  //       description: 'Object-oriented programming with Java',
  //       driveLinks: [
  //         'https://drive.google.com/part1',
  //         'https://drive.google.com/part2',
  //         'https://drive.google.com/part3'
  //       ]
  //     },
  //     {
  //       id: 'react-1',
  //       title: 'React',
  //       image: 'https://images.unsplash.com/photo-1580584126903-c17d41830450',
  //       description: 'Learn React for front-end development',
  //       driveLinks: [
  //         'https://drive.google.com/part1',
  //         'https://drive.google.com/part2',
  //         'https://drive.google.com/part3'
  //       ]
  //     },
  //     {
  //       id: 'kotlin-1',
  //       title: 'Kotlin',
  //       image: 'https://images.unsplash.com/photo-1633356122545-93bcd3f9b23a',
  //       description: 'Kotlin programming for Android development',
  //       driveLinks: [
  //         'https://drive.google.com/part1',
  //         'https://drive.google.com/part2',
  //         'https://drive.google.com/part3'
  //       ]
  //     },
  //     {
  //       id: 'sql-1',
  //       title: 'SQL',
  //       image: 'https://images.unsplash.com/photo-1585243861804-20c18eb09006',
  //       description: 'Learn database management using SQL',
  //       driveLinks: [
  //         'https://drive.google.com/part1',
  //         'https://drive.google.com/part2',
  //         'https://drive.google.com/part3'
  //       ]
  //     },
  //     {
  //       id: 'github-1',
  //       title: 'GitHub & Version Control',
  //       image: 'https://images.unsplash.com/photo-1526374870839-85f99bfbf7c6',
  //       description: 'Learn Git and GitHub for version control',
  //       driveLinks: [
  //         'https://drive.google.com/part1',
  //         'https://drive.google.com/part2',
  //         'https://drive.google.com/part3'
  //       ]
  //     },
     
  //   ]
  // },
];

const ITEMS_PER_PAGE = 8;

const getSubjectIcon = (iconName: string): React.ReactNode => {
  const Icon = (() => {
    switch (iconName) {
      case 'Book':
        return Book;
      case 'Atom':
        return Atom;
      case 'TestTube':
        return TestTube;
      case 'Calculator':
        return Calculator;
      case 'Code':
        return Code;
      default:
        return Book;
    }
  })();
  return (
    <div className="w-16 h-16 rounded-2xl bg-blue-100/80 dark:bg-[#1A1B4B] flex items-center justify-center shadow-sm">
      <Icon className="w-8 h-8 text-blue-500 dark:text-blue-400" />
    </div>
  );
};

const ChapterCard = ({ chapter }: { chapter: Chapter }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-[#1e293b] bg-white dark:bg-[#0f172a] transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
      <div className="relative h-48 w-full">
        {!imageLoaded && <LoadingImageSkeleton className="absolute inset-0 h-full w-full" />}
        <img
          src={chapter.image}
          alt={chapter.title}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-300",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent" />
      </div>
      <div className="p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {chapter.title}
        </h4>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {chapter.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {chapter.driveLinks?.map((link, index) => (
            <motion.a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-500/20 border border-blue-200 dark:border-blue-500/20 transition-colors duration-200 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Part {index + 1}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Education = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const chaptersRef = useRef<HTMLDivElement>(null);

  const handleSubjectClick = async (subject: Subject) => {
    setIsLoading(true);
    setSelectedSubject(subject);
    setCurrentPage(1);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  const handleBack = () => {
    setSelectedSubject(null);
    setCurrentPage(1);
  };

  const handlePageChange = async (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
    
    // Smooth scroll with offset to account for mobile headers/navigation
    if (chaptersRef.current) {
      const yOffset = -100; // Offset to account for fixed headers
      const y = chaptersRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }

    // Add a slight delay before showing new content for smoother transition
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsLoading(false);
  };

  const getPaginatedChapters = () => {
    if (!selectedSubject) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return selectedSubject.chapters.slice(startIndex, endIndex);
  };

  const totalPages = selectedSubject 
    ? Math.ceil(selectedSubject.chapters.length / ITEMS_PER_PAGE) 
    : 0;

  return (
    <section
      id="Journey"
      className="py-20 bg-gray-50 dark:bg-[#020817] relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!selectedSubject ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-[#0f172a] rounded-xl p-8 cursor-pointer border border-gray-200 dark:border-[#1e293b] hover:border-blue-500/30 transition-all duration-300"
                onClick={() => handleSubjectClick(subject)}
              >
                <div className="flex flex-col items-center text-center">
                  {getSubjectIcon(subject.icon)}
                  <h3 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    {subject.name}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                    {subject.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div>
            <motion.button
              onClick={handleBack}
              className="mb-8 flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Subjects</span>
            </motion.button>

            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8"
            >
              {selectedSubject.name}
            </motion.h3>

            <div ref={chaptersRef} className="transition-all duration-300 ease-in-out">
              {isLoading ? (
                <div className="min-h-[400px] flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                      {getPaginatedChapters().map((chapter, index) => (
                        <motion.div
                          key={chapter.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <ChapterCard chapter={chapter} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              )}

              {totalPages > 1 && (
                <motion.div 
                  className="flex justify-center mt-8 space-x-2 overflow-x-auto px-4 py-2 -mx-4 sm:mx-0 sm:px-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <motion.button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={cn(
                        "px-4 py-2 rounded-md text-sm transition-all duration-200 min-w-[40px]",
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 border border-blue-200 dark:border-blue-500/20"
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {page}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
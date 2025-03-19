import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Book,
  Atom,
  TestTube,
  Calculator,
  Code,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { cn } from "../lib/utils";
import type { Subject, Chapter } from "../types";

const subjects: Subject[] = [
  {
    id: "physics",
    name: "Physics",
    icon: "Atom",
    description: "Explore the fundamental laws that govern our universe",
    chapters: [
      {
        id: "physics-1",
        title: "Physics and Measurement",
        image:
          "https://plus.unsplash.com/premium_photo-1672256330251-a0432595f9cc?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Introduction to the basics of physics and measurement systems",
        driveLinks: [
          "https://drive.google.com/file/d/185IFTvMDb1_Ze47Xt_eT32xXTk9mDtSq/view?usp=drive_link",
          "https://drive.google.com/file/d/18VJyQi3jV_YwjQqwQ5GXjOYMPfkvRpGV/view?usp=drive_link",
          "https://drive.google.com/file/d/18Kiy3ZqS0j_-rtUgTIdimR6mahsSuxOh/view?usp=drive_link",
        ],
      },
      {
        id: "physics-2",
        title: "Vectors",
        image: "/assets/physics/vectors.jpg",
        description: "Understanding Newton's laws and their applications",
        driveLinks: [
          "https://drive.google.com/file/d/19M8bKq4UNlVkWj2Nes24mB9ZDkv2es-c/view?usp=drive_link",
          "https://drive.google.com/file/d/19aU1VGzH0oLM1b6UgVS59k7p6OogQGaw/view?usp=drive_link",
          "https://drive.google.com/file/d/19fQKqQ85GSDW2RkLnpAfVg2NduwLOC4m/view?usp=drive_link",
        ],
      },
      {
        id: "physics-3",
        title: "Kinematics In 1-D",
        image: "/assets/physics/kinematics1d.jpg",
        description: "Study of motion without considering forces",
        driveLinks: [
          "https://drive.google.com/file/d/1EmMFfgju7vMApg2qNKrK7m1LZ5vMIb40/view?usp=drive_link",
          "https://drive.google.com/file/d/1ErbNe3tif30kWesw5Zsb-uLCDyNTWb7l/view?usp=drive_link",
          "https://drive.google.com/file/d/1Ew7OFwQOGNd2ebS9wSgi5L7tublNhbIW/view?usp=drive_link",
          "https://drive.google.com/file/d/1FO2JM3rZjShc2N4jDUSTGRveUPMvB68X/view?usp=drive_link",
        ],
      },
      {
        id: "physics-4",
        title: "Kinematics In 2-D",
        image: "/assets/physics/2d.png",
        description: "Study of motion without considering forces",
        driveLinks: [
          "https://drive.google.com/file/d/1FFRcQZXQ0CwIuiROeEIv2e8-c9DtPVU5/view?usp=drive_link",
          "https://drive.google.com/file/d/1GGbMJzzgrFtcQjKwpCFPcT3yl3vBG6Iv/view?usp=drive_link",
          "https://drive.google.com/file/d/1Pt1gcWBkP-Zw6bQAht7n100NHkGOGSMg/view?usp=drive_link",
          "https://drive.google.com/file/d/1F8aM-7wDxRQXCzmM5u9W0YnBf6PRula-/view?usp=drive_link",
        ],
      },
      {
        id: "physics-5",
        title: "Circular Motion and Collision",
        image: "/assets/physics/circular.png",
        description: "Understanding Newton's laws and their applications",
        driveLinks: [
          "https://drive.google.com/file/d/1Y1nfKKtiw6-4GoWsmJo9ZwjSwfN-oABA/view?usp=drive_link",
          "https://drive.google.com/file/d/1R4udKtwqPON7vPcdpsU7ZMpgMNv_HH_c/view?usp=drive_link",
          "https://drive.google.com/file/d/1bRL70ZbCPdkyGEHdv8FzMxF5PKM0yjtD/view?usp=drive_link",
          "https://drive.google.com/file/d/1atHwLUN1QuQowPs8Badem52KlZb8k0yV/view?usp=drive_link",
        ],
      },
      {
        id: "physics-6",
        title: "Laws of Motion",
        image: "/assets/physics/laws_of_motion.jpeg",
        description: "Understanding the laws governing objects in motion",
        driveLinks: [
          "https://drive.google.com/file/d/1O2xvmrScJiBACfEioSz4UiUiKXgb_2wV/view?usp=drive_link",
          "https://drive.google.com/file/d/1PakpqLWQFM0S15JS6b_9FYUYX-9gbxAA/view?usp=drive_link",
          "https://drive.google.com/file/d/1PQMzixnDiOPsdsJQWbpfn9P4d6m5ESQC/view?usp=drive_link",
        ],
      },
      {
        id: "physics-7",
        title: "Work, Energy, and Power",
        image: "/assets/physics/work.jpeg",
        description:
          "Concepts of energy, work, and power in mechanical systems",
        driveLinks: [
          "https://drive.google.com/file/d/1S0UK45n5fOTXDeYgBW9GKOG8GtjfQh1O/view?usp=drive_link",
          "https://drive.google.com/file/d/1S7EhhoYjZdAYFCPIpTfhVU4V1bh4b_YW/view?usp=drive_link",
          "https://drive.google.com/file/d/1PakpqLWQFM0S15JS6b_9FYUYX-9gbxAA/view?usp=drive_link",
        ],
      },
      {
        id: "physics-8",
        title: "Heat",
        image: "/assets/physics/heat.webp",
        description: "Heat, energy, and their transformations",
        driveLinks: [
          "https://drive.google.com/file/d/1cgMSF4ThC5QZz1AQnOuIWzrwVdonxAD4/view?usp=drive_link",
          "https://drive.google.com/file/d/1YUTHkOUKGDO8fxdzJsJrzNulcIgKimmM/view?usp=drive_link",
          "https://drive.google.com/file/d/1Ys5_0y3DWey5tgHSIpkNS32IfBR7JS7U/view?usp=drive_link",
        ],
      },
      {
        id: "physics-9",
        title: "Thermodynamics",
        image: "/assets/physics/thermodynamics.png",
        description: "Heat, energy, and their transformations",
        driveLinks: [
          "https://drive.google.com/file/d/1WpXlz4XebeemRe2GWmUJLddQDWPsUh9U/view?usp=drive_link",
          "https://drive.google.com/file/d/1azCNr0JgU9CKiqqC_vQ3JSWx3I0oYIkL/view?usp=drive_link",
        ],
      },
      {
        id: "physics-10",
        title: "Rotational Motion-1",
        image: "/assets/physics/RM.jpg",
        description: "Study of objects rotating around an axis",
        driveLinks: [
          "https://drive.google.com/file/d/1atshpqN2MjpAA73jQLvM0Pzy-hV86Rem/view?usp=drive_link",
          "https://drive.google.com/file/d/1Ys9z4NnfD67n9--FYywDVEK8SsPb7D1B/view?usp=drive_link",
          "https://drive.google.com/file/d/1Wj9NbBxgMvxwLn7pputTJuBYrbA-EVZb/view?usp=drive_link",
        ],
      },
      {
        id: "physics-11",
        title: "Rotational Motion-2",
        image:
          "https://images.unsplash.com/photo-1500569051175-dc066c45410d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJvdGF0aW9uYWwlMjBtb3Rpb258ZW58MHx8MHx8fDA%3D",
        description: "Study of objects rotating around an axis",
        driveLinks: [
          "https://drive.google.com/file/d/1Wl6yZG8caqJ7H7Zr_73NGt97ikBAaBtE/view?usp=drive_link",
          "https://drive.google.com/file/d/1Wlgqvf7PF_HS5s78qcUwPQwPKHC7Og8j/view?usp=drive_link",
        ],
      },
      {
        id: "physics-12",
        title: "Gravitation-1",
        image: "/assets/physics/gravitation.jpg",
        description: "The force of attraction between masses",
        driveLinks: [
          "https://drive.google.com/file/d/1b-wdMpjyKI6SNWb_V_JJAMeN_FsorIT3/view?usp=drive_link",
          "https://drive.google.com/file/d/1b5pmFMq1Uv_7geL7Vb-SDUOiP-OKlq-s/view?usp=drive_link",
          "https://drive.google.com/file/d/1qF7neLlb94TVDxDb6GumQ1Fg5Tld3_RZ/view?usp=drive_link",
        ],
      },
      {
        id: "physics-13",
        title: "Gravitation-2",
        image:
          "https://images.unsplash.com/photo-1722331329498-fd3fd0af6e06?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The force of attraction between masses",
        driveLinks: [
          "https://drive.google.com/file/d/1afGi-zQ-pnVYktsb9n5x2sJTYy5tAan7/view?usp=drive_link",
          "https://drive.google.com/file/d/1b7DAFMv42RJ-9k1JWjcNOECYyTTLeZBx/view?usp=drive_link",
        ],
      },
      {
        id: "physics-14",
        title: "Elasticity",
        image: "/assets/physics/elasticity.jpg",
        description: "Study of the mechanical properties of solids and liquids",
        driveLinks: [
          "https://drive.google.com/file/d/1XGb8j_HxO2czSo9HHzJJvhR2WAxCvQ48/view?usp=drive_link",
          "https://drive.google.com/file/d/1Y_BtNFGZm6YFzKJcWoX_DnJkGG9gRiJD/view?usp=drive_link",
          "",
        ],
      },
      {
        id: "physics-15",
        title: "Fluid Mechanics",
        image: "/assets/physics/fluids.jpg",
        description: "Behavior of gases and their molecular motion",
        driveLinks: [
          "https://drive.google.com/file/d/1_rEMbP9DTgvkOJrEPQLv2rxZTgqFb3iF/view?usp=drive_link",
          "https://drive.google.com/file/d/1cL-a5kEr2uprspO3lDVKrJRfBT5n_w5D/view?usp=drive_link",
          "https://drive.google.com/file/d/1HgrclC6N4w4mCmZ79_c30dXVmyto1rgL/view?usp=sharing",
          "https://drive.google.com/file/d/1_q0ccX6FUYfNBFd5yYSIQI7N2i_zhlrn/view?usp=drive_link",
        ],
      },
      {
        id: "physics-16",
        title: "Kinetic Theory of Gases",
        image: "/assets/physics/kinetic.jpg",
        description: "Behavior of gases and their molecular motion",
        driveLinks: [
          "https://drive.google.com/file/d/1b73JNyrTNHGMYq01UZIxahWHZRqXNPce/view?usp=sharing",
        ],
      },
      {
        id: "physics-17",
        title: "Oscillations and Waves",
        image: "/assets/physics/oscillation.jpg",
        description: "Study of periodic motion and wave phenomena",
        driveLinks: [
          "https://drive.google.com/file/d/1bNwKteUQOgmZmwEIxGwmGcXgT9eXAM1C/view?usp=drive_link",
          "https://drive.google.com/file/d/1bWmpxjJrgP0YADlZztJILEBOuJIQpB5u/view?usp=drive_link",
          "https://drive.google.com/file/d/1X2dsUmah6brMIjQjov9_tQrKt8IaDg9X/view?usp=drive_link",
          "https://drive.google.com/file/d/1bkNZvJMInUH-OPNGoVVguivR7WvfZIEl/view?usp=drive_link",
        ],
      },
      {
        id: "physics-18",
        title: "Electrostatics-1",
        image: "/assets/physics/electrostatics1.jpeg",
        description: "Study of electric charges and their interactions",
        driveLinks: [
          "https://drive.google.com/file/d/1XFU0I-tMmvX7UhaFz5GdZG3TbVcJKBpZ/view?usp=drive_link",
          "https://drive.google.com/file/d/1XOscLU-5ydyaMxPDhVj9HknpIpvcetzH/view?usp=drive_link",
          "https://drive.google.com/file/d/1XFpNo6pXCt62IwBHLHVqhfoWRZYrE03t/view?usp=drive_link",
        ],
      },
      {
        id: "physics-19",
        title: "Electrostatics-2",
        image:
          "https://plus.unsplash.com/premium_photo-1664302244254-0b614b519f19?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of electric charges and their interactions",
        driveLinks: [
          "https://drive.google.com/file/d/1XS0p_gFljDfEQ1OuM8dGQgiYwalw58Bd/view?usp=drive_link",
          "https://drive.google.com/file/d/1hXs7ccJ73AUp7TKP1zBIDkBQk8TCJmZB/view?usp=drive_link",
          "https://drive.google.com/file/d/1ht5fHl_K6gadJMeebzMFYXxga3W4cTyB/view?usp=drive_link",
        ],
      },
      {
        id: "physics-20",
        title: "Electrostatics-3",
        image: "/assets/physics/electrostatics3.jpg",
        description: "Study of electric charges and their interactions",
        driveLinks: [
          "https://drive.google.com/file/d/1hvjNVluchCQHl2A0D-YXj61s9U9r3BQ_/view?usp=drive_link",
          "https://drive.google.com/file/d/1i3JqbHmP5o9o098FJWK1R4TxAv9M4hUW/view?usp=drive_link",
          "https://drive.google.com/file/d/1hfn4rtNqc-Sq5lZVWznUs8Zjx4DTA30O/view?usp=drive_link",
        ],
      },
      {
        id: "physics-21",
        title: "Current Electricity",
        image:
          "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of electric current and its effects",
        driveLinks: [
          "https://drive.google.com/file/d/1k6Zv4pjcDMJTiTwO17DOUSnCsEOjV-UJ/view?usp=drive_link",
          "https://drive.google.com/file/d/1KcNDIdaIus_CKXk8CevRgdUgGeRCWyGL/view?usp=drive_link",
          "https://drive.google.com/file/d/1i1jNDHpu6cFhERvdr6GCLJ7Mnu3rFddh/view?usp=drive_link",
          "https://drive.google.com/file/d/1XOsMGNm70lefEtEHqLrNsbksuNWicdOa/view?usp=drive_link",
        ],
      },
      {
        id: "physics-22",
        title: "Current Electricity-2",
        image:
          "https://images.unsplash.com/photo-1582481024061-4be0e115414f?q=80&w=2079&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of electric current and its effects",
        driveLinks: [
          "https://drive.google.com/file/d/1IAQzkGeB2n8bSd4p77ZHdszadR97CjM6/view?usp=drive_link",
          "https://drive.google.com/file/d/1I9NYgJOxKqdSoqIpnVxZTSCBcJ1s4Xpp/view?usp=drive_link",
          "https://drive.google.com/file/d/1HqNtoaM-BVI8M2U41BDQ-h18MZrABhLY/view?usp=drive_link",
          "https://drive.google.com/file/d/1XISMsWXLw5CSrKmYTtg3aQGX0_rc1Dmv/view?usp=drive_link",
        ],
      },
      {
        id: "physics-23",
        title: "Magnetic Effects of Current",
        image: "/assets/physics/mec.png",
        description: "Understanding magnetic fields and their effects",
        driveLinks: [
          "https://drive.google.com/file/d/1SUJFGY1JhzxyMN04JysQ51INOajuXKos/view?usp=drive_link",
          "https://drive.google.com/file/d/1SS8ykFZSJDGTwGwufP5RAkFAMxq1yq8A/view?usp=drive_link",
          "https://drive.google.com/file/d/1HphAQ6kQSsJQ7dylc-ZoPQgMQWMUGGpU/view?usp=drive_link",
          "https://drive.google.com/file/d/1XePfbzbFwgH_VyT-l3ZTQvzk4M00xplf/view?usp=drive_link",
        ],
      },
      {
        id: "physics-24",
        title: "Magnetic Effects of Current-2",
        image: "/assets/physics/mec2.png",
        description: "Understanding magnetic fields and their effects",
        driveLinks: [
          "https://drive.google.com/file/d/1XR9NTv74_5RB42h344RmSDkz2BbXZcdm/view?usp=drive_link",
          "https://drive.google.com/file/d/1k-suM5uxRnFJHFCuIuMZjN37CKEQDnlz/view?usp=drive_link",
          "https://drive.google.com/file/d/1Xk9IuniLEWhn1E9XGYMKH4Q_MW4BMAII/view?usp=drive_link",
        ],
      },
      {
        id: "physics-25",
        title: "Magnetism-1",
        image:
          "https://plus.unsplash.com/premium_photo-1682309664650-6683b2fbc790?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Understanding magnetic fields and their effects",
        driveLinks: [
          "https://drive.google.com/file/d/1WE2hO0AEuSUwzAlQIGEHmZTo-PYWhva8/view?usp=drive_link",
          "https://drive.google.com/file/d/1WI3Wv4VjVG0LSiulHtNN5GDnQDIyOCoQ/view?usp=drive_link",
          "https://drive.google.com/file/d/1XTZfFxIm5v-UqsKLGz0A0-mHMG6rxDL_/view?usp=drive_link",
        ],
      },
      {
        id: "physics-26",
        title: "Magnetism-2",
        image: "/assets/physics/magnetism.jpg",
        description: "Understanding magnetic fields and their effects",
        driveLinks: [
          "https://drive.google.com/file/d/1VcJGl2LYp2a6ipvANmaeIy8XorXfZMlB/view?usp=drive_link",
          "https://drive.google.com/file/d/1ukiHVTkEImTV0E2HU5DaSecl7owqADis/view?usp=drive_link",
        ],
      },
      {
        id: "physics-27",
        title: "Alternating Currents",
        image: "/assets/physics/current.jpeg",
        description:
          "Study of induced currents and alternating current circuits",
        driveLinks: [
          "https://drive.google.com/file/d/1XF8UL9IMy7Qag-VrdD4Oi8lBF1D-m91Y/view?usp=drive_link",
          "https://drive.google.com/file/d/1k4urVEK7FhEfM4Mfcaflfh0MJliGS4zM/view?usp=drive_link",
          "https://drive.google.com/file/d/15--h9H12hsAaMRFkOkZKhEh3iH5s4WlO/view?usp=drive_link",
          "https://drive.google.com/file/d/153pmSI8u52wp8QCwo8NnjwAzb6r6A3pC/view?usp=drive_link",
        ],
      },
      {
        id: "physics-28",
        title: "Electromagnetic Induction-1",
        image: "/assets/physics/emi.jpg",
        description:
          "Study of induced currents and alternating current circuits",
        driveLinks: [
          "https://drive.google.com/file/d/1kXLuBUEsI9X_6MiEWpVdmWRlCJYw9MED/view?usp=drive_link",
          "https://drive.google.com/file/d/1kPD8QCASBBI9ItaVq5Z7d0YCmrSfE_MF/view?usp=drive_link",
          "https://drive.google.com/file/d/1k0PF7vZYZxzpeSBiTWvsCwUEfPKIla5V/view?usp=drive_link",
        ],
      },
      {
        id: "physics-29",
        title: "Electromagnetic Induction-2",
        image: "/assets/physics/emi2.png",
        description:
          "Study of induced currents and alternating current circuits",
        driveLinks: [
          "https://drive.google.com/file/d/14yVWC3eVhYPEnMWK4RxiHuFk5NJO4WHn/view?usp=drive_link",
          "https://drive.google.com/file/d/1Yl2qPbb-u64WNV5FM0DYLPLorhbmwhsV/view?usp=drive_link",
          "https://drive.google.com/file/d/1mnyUCuXdy8IncpFvP-F-cuI3K9BDoFoe/view?usp=drive_link",
        ],
      },
      {
        id: "physics-30",
        title: "Electromagnetic Waves",
        image: "/assets/physics/emw.png",
        description: "Behavior and properties of electromagnetic waves",
        driveLinks: [
          "https://drive.google.com/file/d/1mgS-b_geCP1yLZEHoNr7fBiFCJMjj7h-/view?usp=drive_link",
          "https://drive.google.com/file/d/12Vs_zaF0thGHM3UFSj6OTdOVb5ujmoj8/view?usp=drive_link",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "physics-31",
        title: "Ray Optics",
        image: "/assets/physics/ray.png",
        description: "Study of light and its behavior",
        driveLinks: [
          "https://drive.google.com/file/d/1L6DiXUB7TOfiBr30xVgO89N0ri3CKoiJ/view?usp=drive_link",
          "https://drive.google.com/file/d/1L7zMt0_HnY1lsZlOf7TUbOFc5d3kkb5f/view?usp=drive_link",
          "https://drive.google.com/file/d/1XN09DXgd8RAHdNORGnGmkk9qaNz3p2fD/view?usp=drive_link",
          "https://drive.google.com/file/d/1172BNdgMhT7WOaYiC_T07aBzDAvCzTUc/view?usp=drive_link",
        ],
      },
      {
        id: "physics-32",
        title: "Wave Optics",
        image: "/assets/physics/wave.jpg",
        description: "Study of light and its behavior",
        driveLinks: [
          "https://drive.google.com/file/d/15dANG9oIrh7Qs7pgWBoZivkl9DTOk8xe/view?usp=drive_link",
          "https://drive.google.com/file/d/1GFtA6CAcPdxBbGPasJvXziiUWeofQgBB/view?usp=drive_link",
          "https://drive.google.com/file/d/1GFTzacmJ9g8sL_3zcPOVve3lfn5pPi3P/view?usp=drive_link",
          "https://drive.google.com/file/d/1s_QdQcPAWw8BHgLmdP1W8fjjxqYEolsG/view?usp=drive_link",
        ],
      },
      {
        id: "physics-33",
        title: "Dual Nature of Matter and Radiation",
        image: "/assets/physics/DNMR.jpeg",
        description: "The wave-particle duality of matter and radiation",
        driveLinks: [
          "https://drive.google.com/file/d/1itfskkkCSuRmC3712dDpuGdsOavxwUDG/view?usp=sharing",
          "https://drive.google.com/part1",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "physics-34",
        title: "Atoms and Nuclei",
        image:
          "https://plus.unsplash.com/premium_photo-1669658980877-7b4da0f675ac?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Structure and behavior of atoms and their nuclei",
        driveLinks: [
          "https://drive.google.com/file/d/12UzApZW4HIsbhSyAcqH2uw5oivJWxqDN/view?usp=sharing",
          "https://drive.google.com/file/d/1iQgNxZgkYlHTCmDNZdhEwV6j-kiGklIb/view?usp=drive_link",
          "https://drive.google.com/file/d/1XgZ3Pv_naEOqID_oPVZbb_0V1I4o5Y7t/view?usp=drive_link",
          "https://drive.google.com/file/d/1tZKbhxipZf7BX5KkpisJsOa2PuU6UzaQ/view?usp=drive_link",
        ],
      },
      {
        id: "physics-20",
        title: "Electronic Devices",
        image:
          "https://images.unsplash.com/photo-1562408590-e32931084e23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of electronic components and circuits",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/file/d/1iVRJ-u0L95eQ_6nnDr1YeKmje_Rbru-x/view?usp=sharing",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "physics-21",
        title: "Communication Systems",
        image:
          "https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Principles of communication and information transfer",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/file/d/1l2WaL3HQ-36YNHpNhmgSx80DPN6oBBc9/view?usp=drive_link",
          "https://drive.google.com/file/d/1l-rTy4u7gwKN3Z2LcQ74jNLjKUlZR9zo/view?usp=drive_link",
          "https://drive.google.com/file/d/1afGi-zQ-pnVYktsb9n5x2sJTYy5tAan7/view?usp=drive_link",
        ],
      },
    ],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: "TestTube",
    description: "Discover the composition and properties of matter",
    chapters: [
      {
        id: "chemistry-1",
        title: "Some Basic Concepts of Chemistry",
        image:
          "https://plus.unsplash.com/premium_photo-1661430659143-ffbb5ce2b6a7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Introduction to chemistry fundamentals",
        driveLinks: [
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-2",
        title: "Structure of Atom",
        image:
          "https://plus.unsplash.com/premium_photo-1673892648202-2dbdc2a3a955?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Understanding atomic structure and models",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-3",
        title: "Classification of Elements and Periodicity in Properties",
        image:
          "https://images.unsplash.com/photo-1627389955611-70c92a5d2e2b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of the periodic table and periodic trends",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-4",
        title: "Chemical Bonding and Molecular Structure",
        image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6",
        description: "Understanding molecular structures",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-5",
        title: "States of Matter: Gases and Liquids",
        image:
          "https://plus.unsplash.com/premium_photo-1720189952226-5d72d4b73554?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The properties and behaviors of gases and liquids",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-6",
        title: "Thermodynamics",
        image:
          "https://images.unsplash.com/photo-1539186607619-df476afe6ff1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of heat, energy, and work",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-7",
        title: "Equilibrium",
        image:
          "https://images.unsplash.com/photo-1433439216031-9571132ce719?q=80&w=2003&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Understanding chemical equilibria and Le Chatelier's principle",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-8",
        title: "Redox Reactions",
        image:
          "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of oxidation and reduction processes",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-9",
        title: "Hydrogen",
        image:
          "https://plus.unsplash.com/premium_photo-1673830981161-16872c70df8d?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The chemistry and uses of hydrogen",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-10",
        title: "s-Block Elements (Alkali and Alkaline Earth Metals)",
        image:
          "https://plus.unsplash.com/premium_photo-1671068039583-ebbcfa1bc670?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of alkali and alkaline earth metals",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-11",
        title: "Some p-Block Elements",
        image:
          "https://plus.unsplash.com/premium_photo-1668736594225-55e292fdd95e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHMlMjBibG9jayUyMGVsZW1lbnRzfGVufDB8fDB8fHww",
        description: "Study of p-block elements and their chemistry",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-12",
        title: "Hydrocarbons",
        image:
          "https://plus.unsplash.com/premium_photo-1715107534372-0711eae7153c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of alkanes, alkenes, and alkynes",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-13",
        title: "Environmental Chemistry",
        image:
          "https://images.unsplash.com/photo-1723244684626-5623fb0d8295?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The study of chemistry in the environment",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-14",
        title: "d- and f-Block Elements",
        image:
          "https://plus.unsplash.com/premium_photo-1700068553658-5bed4f670451?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of transition metals and inner transition elements",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-15",
        title: "Coordination Compounds",
        image:
          "https://images.unsplash.com/photo-1562411052-105105232432?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of complex compounds formed by metals",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-16",
        title: "Some Basic Principles and Techniques of Organic Chemistry",
        image:
          "https://plus.unsplash.com/premium_photo-1663100641774-cb51237207c6?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Fundamental principles and techniques in organic chemistry",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-17",
        title: "Hydrocarbons (Alkanes, Alkenes, Alkynes)",
        image:
          "https://images.unsplash.com/photo-1531956656798-56686eeef3d4?q=80&w=2054&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of different types of hydrocarbons",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-18",
        title: "Haloalkanes and Haloarenes",
        image:
          "https://images.unsplash.com/photo-1534744971734-e1628d37ea01?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of halogenated organic compounds",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-19",
        title: "Alcohols, Phenols, and Ethers",
        image:
          "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of alcohols, phenols, and ethers",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-20",
        title: "Aldehydes, Ketones and Carboxylic Acids",
        image:
          "https://images.unsplash.com/photo-1631106321638-d94d9a8f3e1f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of carbonyl compounds and carboxylic acids",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-21",
        title: "Organic Compounds Containing Nitrogen",
        image:
          "https://images.unsplash.com/photo-1653226539322-55de1cc336be?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of nitrogen-containing organic compounds",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-22",
        title: "Biomolecules",
        image:
          "https://images.unsplash.com/photo-1475906089153-644d9452ce87?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of biological molecules and their functions",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-23",
        title: "Polymers",
        image:
          "https://plus.unsplash.com/premium_photo-1681505601897-5171f4baf000?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of macromolecules and their properties",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "chemistry-24",
        title: "Chemistry in Everyday Life",
        image:
          "https://images.unsplash.com/photo-1581093577421-f561a654a353?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Understanding the role of chemistry in daily life",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
    ],
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: "Calculator",
    description: "Master the language of numbers and patterns",
    chapters: [
      {
        id: "math-1",
        title: "Sets, Relations, and Functions",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
        description: "Understanding sets, relations, and functions",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "math-2",
        title: "Complex Numbers and Quadratic Equations",
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904",
        description:
          "Introduction to complex numbers and solving quadratic equations",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "math-3",
        title: "Matrices and Determinants",
        image:
          "https://plus.unsplash.com/premium_photo-1724800663657-3e57bf4f622c?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Mathematical operations on matrices and determinants",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "math-4",
        title: "Permutations and Combinations",
        image:
          "https://images.unsplash.com/photo-1632571401005-458e9d244591?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Counting principles and arrangement techniques",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "math-5",
        title: "Binomial Theorem and its Applications",
        image:
          "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "math-6",
        title: "Sequences and Series",
        image:
          "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of arithmetic, geometric, and harmonic series",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "math-7",
        title: "Limits, Continuity, and Differentiability",
        image:
          "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Fundamentals of limits, continuity, and derivatives",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "math-8",
        title: "Integral Calculus",
        image:
          "https://plus.unsplash.com/premium_photo-1724800663787-094f67f76f82?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of integration techniques and applications",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "math-9",
        title: "Differential Equations",
        image:
          "https://images.unsplash.com/photo-1561089489-f13d5e730d72?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Solving differential equations and their applications",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "math-10",
        title: "Coordinate Geometry",
        image:
          "https://plus.unsplash.com/premium_photo-1723579268175-d27d90cd4772?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of geometry using coordinate systems",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "math-11",
        title: "Three-Dimensional Geometry",
        image:
          "https://plus.unsplash.com/premium_photo-1723485677517-06cc8fe09239?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Geometric concepts in three dimensions",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "math-12",
        title: "Vector Algebra",
        image:
          "https://plus.unsplash.com/premium_photo-1724266846347-bd10efdd330e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Operations and properties of vectors",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "math-13",
        title: "Trigonometry",
        image:
          "https://plus.unsplash.com/premium_photo-1723651610472-1ee8bdc7082f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Trigonometric functions, identities, and properties",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "math-14",
        title: "Mathematical Reasoning",
        image:
          "https://plus.unsplash.com/premium_photo-1676422355992-703feab0d80d?q=80&w=1895&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Study of logical reasoning in mathematics",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "math-15",
        title: "Statistics and Probability",
        image:
          "https://plus.unsplash.com/premium_photo-1663040508857-1b46f49edde2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Analysis of data and probability theory",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "math-16",
        title: "Relations and Functions",
        image:
          "https://images.unsplash.com/photo-1548690596-f1722c190938?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Fundamentals of relations, functions, and their properties",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
      {
        id: "math-17",
        title: "Linear Programming",
        image:
          "https://images.unsplash.com/photo-1635070041409-e63e783ce3c1?q=80&w=1979&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Optimization problems using linear equations",
        driveLinks: [
          // Changed to array
          "https://drive.google.com/part1",
          "https://drive.google.com/part2",
          "https://drive.google.com/part3",
        ],
      },
    ],
  },
  {
    id: "Coding",
    name: "Coding",
    icon: "Code",
    description: "Master all the languages",
    chapters: [
      {
        id: "aiml-1",
        title: "Artificial Intelligence and Machine Learning",
        image: "assets/coding/aiml.png",
        description: "Introduction to AI and ML concepts",
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ],
      },
      {
        id: "python-1",
        title: "Python Programming",
        image: "/assets/coding/python.webp",
        description: "Fundamentals of Python programming",
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ],
      },
      {
        id: "cpp-1",
        title: "C++ Programming",
        image: "/assets/coding/cpp.png",
        description: "Introduction to C++ and object-oriented programming",
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ],
      },
      {
        id: "javascript-1",
        title: "JavaScript",
        image: "/assets/coding/javascript.jpg",
        description: "Learn JavaScript for web development",
        driveLinks: [
          //   'https://drive.google.com/part1',
          //   'https://drive.google.com/part2',
          //   'https://drive.google.com/part3'
        ],
      },
      {
        id: "html-1",
        title: "HTML",
        image: "/assets/coding/html.png",
        description: "Basics of HTML for web structuring",
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ],
      },
      {
        id: "css-1",
        title: "CSS",
        image: "/assets/coding/css.png",
        description: "Styling web pages with CSS",
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ],
      },
      {
        id: "c-1",
        title: "C Programming",
        image: "/assets/coding/c.png",
        description: "Introduction to C programming language",
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ],
      },
      {
        id: "tailwind-1",
        title: "Tailwind CSS",
        image: "/assets/coding/taliwind.png",
        description: "Learn how to style websites using Tailwind CSS",
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ],
      },
      {
        id: "bootstrap-1",
        title: "Bootstrap",
        image: "/assets/coding/bootstrap.png",
        description: "Learn Bootstrap framework for responsive web design",
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ],
      },
      {
        id: "java-1",
        title: "Java Programming",
        image: "/assets/coding/java.png",
        description: "Object-oriented programming with Java",
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ],
      },
      {
        id: "react-1",
        title: "React",
        image: "/assets/coding/react.png",
        description: "Learn React for front-end development",
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ],
      },
      {
        id: "kotlin-1",
        title: "Kotlin",
        image: "/assets/coding/kotlin.avif",
        description: "Kotlin programming for Android development",
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ],
      },
      {
        id: "sql-1",
        title: "SQL",
        image: "/assets/coding/sql.jpeg",
        description: "Learn database management using SQL",
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ],
      },
      {
        id: "github-1",
        title: "GitHub & Version Control",
        image: "/assets/coding/github.jpg",
        description: "Learn Git and GitHub for version control",
        driveLinks: [
          // 'https://drive.google.com/part1',
          // 'https://drive.google.com/part2',
          // 'https://drive.google.com/part3'
        ],
      },
    ],
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

const getSubjectIcon = (iconName) => {
  switch (iconName) {
    case "Atom":
      return Atom; // Ensure Atom is defined
    case "TestTube":
      return TestTube; // Ensure TestTube is defined
    case "Calculator":
      return Calculator; // Ensure Calculator is defined
    case "Code": // Adding an icon for coding
      return Code; // Ensure Code is defined
    default:
      return Book; // Ensure Book is defined
  }
};

export const Education = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  const handleBack = () => {
    setSelectedSubject(null);
  };

  return (
    <section
      id="Journey"
      className="py-20 bg-white dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)] relative overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: "rgba(255, 255, 204, 0.05)", // Light yellow accent in light theme
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center space-y-4"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-black dark:text-white"
          >
            Academic Resources
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedSubject ? (
            <motion.div
              key="subjects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {subjects.map((subject, index) => {
                const Icon = getSubjectIcon(subject.icon);
                return (
                  <motion.div
                    key={subject.id}
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    onClick={() => handleSubjectClick(subject)}
                    className={cn(
                      "group relative bg-white dark:bg-gray-900",
                      "rounded-2xl p-8 cursor-pointer",
                      "shadow-2xl hover:shadow-3xl dark:hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]",
                      "transform transition-all duration-300",
                      "border-2 border-transparent hover:border-blue-500/20 dark:border-gray-800",
                      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/10 before:to-purple-500/10 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300",
                    )}
                  >
                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 flex items-center justify-center mx-auto mb-6 shadow-lg"
                      >
                        <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-2">
                        {subject.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-center">
                        {subject.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="chapters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <motion.button
                whileHover={{ x: -5 }}
                onClick={handleBack}
                className={cn(
                  "flex items-center gap-2 px-4 py-2",
                  "text-blue-400 hover:text-blue-300",
                  "transition-colors duration-200",
                )}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Back to Subjects</span>
              </motion.button>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-black dark:text-white text-center"
              >
                {selectedSubject.name}
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {selectedSubject.chapters.map((chapter, index) => (
                  <motion.div
                    key={chapter.id}
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className={cn(
                      "group relative bg-white dark:bg-gray-900",
                      "rounded-2xl overflow-hidden",
                      "shadow-xl hover:shadow-2xl dark:hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)]",
                      "transform transition-all duration-300",
                      "border-2 border-transparent hover:border-blue-500/20 dark:border-gray-800",
                    )}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={chapter.image}
                        alt={chapter.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-blue-900/20 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {chapter.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {chapter.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {chapter.driveLinks?.length > 0 ? (
                          chapter.driveLinks.map((link, partIndex) => (
                            <motion.a
                              key={partIndex}
                              whileHover={{ x: 5 }}
                              whileTap={{ scale: 0.95 }}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                "inline-flex items-center gap-2 px-3 py-1.5",
                                "bg-blue-100 dark:bg-blue-900/30",
                                "text-blue-700 dark:text-blue-400",
                                "rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/50",
                                "border border-blue-200 dark:border-blue-800",
                                "transition-colors duration-200",
                                "text-sm",
                              )}
                            >
                              <span>Part {partIndex + 1}</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </motion.a>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

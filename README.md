# Personal Portfolio Website

This repository contains the source code for my personal portfolio, built from scratch using React. The purpose of this project is to showcase my skills, projects, and provide a point of contact.

## 🚀 Project Overview

This is a single-page application (SPA) built with **React** and **React Router**. The main page is a comprehensive layout featuring several distinct sections:

*   **Hero Section:** An advanced, engaging introduction.
*   **About Me:** A detailed section about my background and skills.
*   **Projects:** A showcase of my work.
*   **Skills:** A list of my technical proficiencies.
*   **Contact:** A form or information to get in touch.

The application also includes separate, dedicated pages for a **LeetCode activity explorer**, a **CodeForces profile page**, and individual **project detail pages**.

## 🛠️ Tech Stack

*   **Core:** React, React Router
*   **Styling:** CSS3 (with custom animations and responsive design)
*   **Analytics:** Vercel Analytics
*   **Deployment:** Vercel (or specify your provider)

## ✨ Key Features

*   **Component-Based Architecture:** The app is divided into reusable components like `NavigationBar`, `HeroAdvanced`, `AboutSection`, `Projects`, etc., for maintainability.
*   **Client-Side Routing:** `React Router` is used to manage navigation between the main layout and separate pages like `LeetCodeExplorer` and `ProjectPage`.
*   **Smooth Scrolling:** A custom hook ensures smooth navigation to different sections on the main page.
*   **Dynamic Project Pages:** The `/project/:id` route allows for dynamically generated pages for each project.
*   **Responsive Design:** The UI is fully responsive and adapts to various screen sizes.

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm installed on your machine.

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your-username/codespire.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Run the development server
    ```sh
    npm start
    ```
    The application will be available at `http://localhost:3000`.

# Campus Connect Hub

Build a professional, modern, responsive frontend-only web application called "CampusHub".

IMPORTANT:

- FRONTEND ONLY.

- Do NOT implement Firebase, authentication backend, Firestore, APIs, server-side logic, real-time database, push notifications, or any backend integration.

- Use realistic mock/static data so every screen looks functional.

- Do not create unnecessary features outside the scope below.

- Keep the implementation lightweight and avoid excessive components, animations, dependencies, or unnecessary pages.

- The goal is a polished hackathon MVP that demonstrates the complete user experience.

- Do not ask me unnecessary clarification questions. Make sensible UI decisions based on this specification.

PROJECT PURPOSE:

CampusHub is a university-focused digital platform that solves the problem of campus information being scattered across WhatsApp groups, emails, posters, PDFs, social media and word of mouth.

The platform brings campus information into one organized place where students can:

1. FIND faculty, rooms, facilities, clubs, notices and opportunities.

2. DISCOVER clubs, events, achievements and campus activities.

3. CONNECT by following/joining clubs, saving information and exploring campus updates.

DESIGN DIRECTION:

Create a premium university technology platform, not a generic template.

Visual style:

- Clean

- Professional

- Minimal

- Modern

- Academic/technology-oriented

- Trustworthy

- Spacious layout

- Strong typography

- Subtle borders and shadows

- Mostly neutral/white background

- Use ONE restrained primary accent color with very limited secondary colors

- Avoid colorful gradients and excessive glassmorphism

- Avoid overly rounded cartoon-style cards

- Avoid excessive animations

- Use icons consistently

- Use realistic university-related images/placeholders

- Desktop-first but fully responsive for tablet and mobile

APP STRUCTURE:

Use a consistent application shell after login:

- Left sidebar on desktop

- Compact bottom navigation on mobile

- Top header with search, notifications icon and profile

- Main content area

- Active navigation state clearly visible

MAIN STUDENT NAVIGATION:

1. Home

2. Search

3. Clubs

4. Events

5. Feed

6. Saved

7. Profile

PAGE 1 — LOGIN

Create a clean professional login screen.

Include:

- CampusHub logo/name

- "Welcome back" heading

- Email input

- Password input

- Login button

- "Don't have an account? Sign up" text

- Optional demo login button

Since this is frontend-only:

- Login should simply navigate to the Home dashboard.

- Do not create real authentication.

PAGE 2 — HOME DASHBOARD

Create a polished student dashboard.

Top:

- Greeting such as "Good morning, Sanchita"

- Short subtitle such as "Stay connected with everything happening on campus."

- Large universal search bar: "Search faculty, clubs, rooms, events..."

- Notification icon

- Profile avatar

Main dashboard sections:

A. Quick Access

Cards:

- Find Faculty

- Campus Directory

- Clubs

- Events

B. Upcoming Events

Show 3 realistic event cards with:

- Event title

- Date

- Time

- Venue

- Organizer

- Small image/icon

- View Event button

C. Important Notices

Show 3 notice cards:

- Scholarship notice

- Academic notice

- Placement notice

- Category

- Date

- Save icon

D. Followed Clubs

Show 2–3 clubs with logo, name and category.

E. Campus Highlights

Show a small achievement/activity section.

Keep the Home page informative but not overcrowded.

PAGE 3 — SEARCH

This is one of the most important pages.

Create a universal campus search interface.

At the top:

- Large search input

- Search icon

- Filter button

Category filters:

- All

- Faculty

- Rooms

- Clubs

- Events

- Notices

- Facilities

- Opportunities

Create realistic mock search results.

Example:

Search "Dr. Sharma"

Show:

Faculty result:

- Dr. Ananya Sharma

- Computer Science & Engineering

- Room CSE-204

- Office Hours: 10:00 AM – 12:00 PM

- Status: Available

- View Profile

Also allow example results for:

- Clubs

- Rooms

- Events

- Notices

- Opportunities

Interactions should work with frontend state:

- Search filters visible mock results

- Category filters change displayed results

- Clicking a result navigates to the relevant detail page

PAGE 4 — FACULTY PROFILE

Create a detailed faculty profile page.

Include:

- Back button

- Faculty avatar

- Name

- Department

- Designation

- Room

- Office hours

- Email/contact placeholder

- Manually updated availability status

- Last updated time

- "View Campus Location" button

Important:

Clearly label availability as "Manually updated status" because this is only frontend mock data.

Create a simple campus-location modal/card when "View Campus Location" is clicked.

Do NOT build real maps or navigation APIs.

PAGE 5 — CLUB DIRECTORY

Create a professional club discovery page.

Top:

- "Discover Clubs"

- Search clubs

- Category filters

Categories:

- Technical

- Cultural

- Sports

- Social

- Creative

Create club cards containing:

- Club logo

- Club name

- Category

- Short description

- Member count

- Follow button

- View Club button

Use realistic sample clubs such as:

- Cloud Computing Club

- Coding Club

- AI & Robotics Club

- Literary Society

- Photography Club

- Entrepreneurship Club

PAGE 6 — CLUB PROFILE

Create a detailed club profile.

Header:

- Cover image

- Club logo

- Club name

- Category

- Member count

- Coordinator

- Join Club button

- Follow button

Below header use tabs:

- Overview

- Posts

- Events

- Achievements

- Media

Overview:

- About the club

- Activities

- Coordinator information

Posts:

Show realistic club posts.

Achievements:

Show achievement cards.

Events:

Show upcoming club events.

Media:

Show image cards.

Frontend interactions:

- Join Club button changes to "Joined"

- Follow button changes to "Following"

- Tabs switch content without page reload

PAGE 7 — EVENTS

Create a central campus events page.

Header:

- "Campus Events"

- Search events

- Category filters

Categories:

- All

- Workshop

- Hackathon

- Competition

- Seminar

- Club Event

Include:

- Featured event

- Event cards

- Date

- Time

- Venue

- Organizer

- Description

- Save button

- View Event button

Create an Event Detail view/modal with:

- Event title

- Full description

- Organizer

- Date/time

- Venue

- Registration button

- Save button

Registration is frontend-only and should show a success state such as "Registration saved".

PAGE 8 — CAMPUS FEED

Create a clean campus social feed.

The feed should contain posts from:

- University

- Clubs

- Student organizations

Post structure:

- Profile/logo

- Organization name

- Post time

- Text

- Image

- Like

- Comment

- Save

Post types:

- Club achievement

- Event announcement

- Campus activity

- Competition result

Frontend interactions:

- Like button toggles

- Save button toggles

- Follow button works visually

- Comment button opens a simple comment area/modal

Do not build backend comments.

PAGE 9 — SAVED

Create a Saved page.

Use tabs:

- All

- Notices

- Events

- Opportunities

- Posts

Show saved mock content.

Each item should have:

- Title

- Category

- Date

- Remove from saved button

Use frontend state so clicking Save/Bookmark elsewhere updates the visual state.

PAGE 10 — PROFILE

Create a simple student profile.

Include:

- Avatar

- Student name

- Email

- Department

- Year

- Followed clubs

- Saved items count

- Edit Profile button

Edit Profile can open a frontend modal/form.

No backend saving is required.

ADMIN DASHBOARD — FRONTEND DEMO ONLY

Create one separate Admin Dashboard route accessible from a small "Demo Admin" option.

Admin sidebar:

- Dashboard

- Users

- Clubs

- Faculty

- Locations

- Events

- Notices

- Posts

- Approvals

Dashboard should contain:

- Total Students

- Total Clubs

- Upcoming Events

- Pending Approvals

Add simple tables/cards showing mock data.

Admin should visually be able to:

- View users

- View clubs

- View faculty

- View notices

- View events

- Approve/reject sample posts

These actions are frontend-only state changes.

IMPORTANT MVP SCOPE:

Do NOT build:

- Real Firebase authentication

- Firestore

- Firebase Storage

- Firebase Cloud Functions

- Push notifications

- Real-time availability

- Real maps

- Payment system

- Chat

- Advanced analytics

- AI chatbot

- Complex recommendation engine

- Real video streaming

- Backend APIs

TECHNICAL REQUIREMENTS:

Use:

- React

- TypeScript

- Tailwind CSS

- React Router

Keep the code modular but simple.

Suggested routes:

/login

/home

/search

/faculty/:id

/clubs

/clubs/:id

/events

/events/:id

/feed

/saved

/profile

/admin

Use reusable components:

- AppLayout

- Sidebar

- MobileNavigation

- Header

- SearchBar

- EventCard

- ClubCard

- NoticeCard

- FacultyCard

- PostCard

- SaveButton

- StatusBadge

- Modal

Use a local mock-data file for all content.

IMPORTANT:

All buttons and navigation should work visually using frontend state/router navigation.

No broken links.

No empty pages.

No placeholder "coming soon" screens for the main MVP pages.

RESPONSIVE DESIGN:

Desktop:

- Sidebar + content layout

Tablet:

- Collapsible sidebar

Mobile:

- Bottom navigation

- Stacked cards

- Responsive search

- Proper touch-friendly buttons

FINAL QUALITY REQUIREMENTS:

- Make the interface look like a real university product ready for a hackathon demo.

- Maintain consistent spacing, typography, icons and card styles across all pages.

- Use realistic content instead of Lorem Ipsum.

- Keep the design professional and restrained.

- Prioritize usability over decorative effects.

- Make the first screen visually impressive but clean.

- Ensure the complete navigation flow works.

- Keep the implementation lightweight so it does not unnecessarily consume project resources.

MOST IMPORTANT DEMO FLOW:

Login

→ Home

→ Search "Dr. Sharma"

→ Faculty Profile

→ View Campus Location

→ Clubs

→ Open Cloud Computing Club

→ View Achievement

→ View Upcoming Event

→ Join/Follow Club

→ Events

→ Feed

→ Search Scholarship

→ Save Notice

→ Saved

→ Profile

The final product should clearly communicate:

FIND → DISCOVER → CONNECT

Do not implement backend functionality. Focus entirely on creating the polished frontend and working frontend interactions.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7f347152-d29c-5466-86c4-ddbebf4f71fa).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

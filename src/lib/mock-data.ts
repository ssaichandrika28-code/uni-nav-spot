import { Cloud, Code2, Bot, BookOpen, Camera, Lightbulb, Music, Trophy, HeartHandshake, type LucideIcon } from "lucide-react";
import campus from "@/assets/campus.jpg";
import cloudImg from "@/assets/club-cloud.jpg";
import hackImg from "@/assets/event-hackathon.jpg";
import roboImg from "@/assets/feed-robotics.jpg";

export const images = { campus, cloudImg, hackImg, roboImg };

export const currentUser = {
  name: "Sanchita Verma",
  firstName: "Sanchita",
  email: "sanchita.verma@university.edu",
  department: "Computer Science & Engineering",
  year: "3rd Year, B.Tech",
  roll: "CSE21B047",
};

export type Status = "Available" | "In Class" | "In Meeting" | "On Leave";

export interface Faculty {
  id: string; name: string; department: string; designation: string; room: string;
  block: string; floor: string; officeHours: string; email: string; phone: string;
  status: Status; updated: string; expertise: string[];
}

export const faculty: Faculty[] = [
  { id: "ananya-sharma", name: "Dr. Ananya Sharma", department: "Computer Science & Engineering", designation: "Associate Professor", room: "CSE-204", block: "CSE Block", floor: "2nd Floor", officeHours: "10:00 AM – 12:00 PM", email: "ananya.sharma@university.edu", phone: "+91 80 4012 2204", status: "Available", updated: "Today, 9:42 AM", expertise: ["Cloud Systems", "Distributed Computing", "DevOps"] },
  { id: "rajesh-sharma", name: "Dr. Rajesh Sharma", department: "Mechanical Engineering", designation: "Professor & Head", room: "ME-110", block: "Mechanical Block", floor: "Ground Floor", officeHours: "2:00 PM – 4:00 PM", email: "rajesh.sharma@university.edu", phone: "+91 80 4012 1110", status: "In Meeting", updated: "Today, 11:05 AM", expertise: ["Thermodynamics", "Robotics"] },
  { id: "meera-iyer", name: "Prof. Meera Iyer", department: "Electronics & Communication", designation: "Assistant Professor", room: "ECE-312", block: "ECE Block", floor: "3rd Floor", officeHours: "11:00 AM – 1:00 PM", email: "meera.iyer@university.edu", phone: "+91 80 4012 3312", status: "In Class", updated: "Today, 10:15 AM", expertise: ["VLSI", "Embedded Systems"] },
  { id: "vikram-rao", name: "Dr. Vikram Rao", department: "Mathematics", designation: "Professor", room: "SCI-105", block: "Science Block", floor: "1st Floor", officeHours: "9:00 AM – 11:00 AM", email: "vikram.rao@university.edu", phone: "+91 80 4012 5105", status: "On Leave", updated: "Yesterday, 5:30 PM", expertise: ["Linear Algebra", "Optimization"] },
];

export interface Place { id: string; name: string; type: "Room" | "Facility"; block: string; floor: string; detail: string; hours?: string }
export const places: Place[] = [
  { id: "cse-204", name: "CSE-204 Faculty Cabin", type: "Room", block: "CSE Block", floor: "2nd Floor", detail: "Faculty cabins, east wing" },
  { id: "seminar-a", name: "Seminar Hall A", type: "Room", block: "Main Building", floor: "1st Floor", detail: "Capacity 220 · Projector, PA system" },
  { id: "lab-3", name: "Cloud & Systems Lab (Lab 3)", type: "Room", block: "CSE Block", floor: "3rd Floor", detail: "60 workstations · Open till 8 PM" },
  { id: "library", name: "Central Library", type: "Facility", block: "Library Block", floor: "Ground – 3rd Floor", detail: "Reading halls, digital archive, group rooms", hours: "8:00 AM – 10:00 PM" },
  { id: "medical", name: "Health & Medical Centre", type: "Facility", block: "Near Gate 2", floor: "Ground Floor", detail: "On-call doctor, first aid, pharmacy", hours: "24 × 7" },
  { id: "sports", name: "Indoor Sports Complex", type: "Facility", block: "Sports Block", floor: "Ground Floor", detail: "Badminton, table tennis, gym", hours: "6:00 AM – 9:00 PM" },
];

export type ClubCategory = "Technical" | "Cultural" | "Sports" | "Social" | "Creative";
export interface Club {
  id: string; name: string; category: ClubCategory; short: string; about: string; members: number;
  icon: LucideIcon; coordinator: { name: string; role: string; email: string }; activities: string[]; founded: string;
}
export const clubs: Club[] = [
  { id: "cloud-computing", name: "Cloud Computing Club", category: "Technical", short: "Hands-on learning in AWS, Azure, GCP, DevOps and cloud-native development.", about: "The Cloud Computing Club helps students build real-world skills in cloud platforms, containers and serverless architectures. We run weekly labs, certification study groups and an annual cloud hackathon with industry mentors.", members: 412, icon: Cloud, coordinator: { name: "Dr. Ananya Sharma", role: "Faculty Coordinator", email: "ananya.sharma@university.edu" }, activities: ["Weekly AWS & Azure hands-on labs", "Certification study circles", "CloudSprint annual hackathon", "Industry talks with cloud architects"], founded: "2019" },
  { id: "coding", name: "Coding Club", category: "Technical", short: "Competitive programming, open source and weekly problem-solving sessions.", about: "A community of programmers practising algorithms, contributing to open source and preparing for ICPC.", members: 680, icon: Code2, coordinator: { name: "Prof. Karan Mehta", role: "Faculty Coordinator", email: "karan.mehta@university.edu" }, activities: ["Weekly contests", "Open source sprints", "ICPC training"], founded: "2015" },
  { id: "ai-robotics", name: "AI & Robotics Club", category: "Technical", short: "Building intelligent robots, ML projects and competing nationally.", about: "We design autonomous robots and machine learning systems, and represent the university at national robotics competitions.", members: 354, icon: Bot, coordinator: { name: "Dr. Rajesh Sharma", role: "Faculty Coordinator", email: "rajesh.sharma@university.edu" }, activities: ["Robot build nights", "ML reading group", "Competition teams"], founded: "2017" },
  { id: "literary", name: "Literary Society", category: "Cultural", short: "Debates, creative writing, book circles and the annual lit fest.", about: "A home for readers, writers and speakers. We host debates, poetry slams and publish the campus magazine.", members: 228, icon: BookOpen, coordinator: { name: "Dr. Priya Nair", role: "Faculty Coordinator", email: "priya.nair@university.edu" }, activities: ["Debate league", "Campus magazine", "Book circles"], founded: "2012" },
  { id: "photography", name: "Photography Club", category: "Creative", short: "Photowalks, editing workshops and coverage of campus events.", about: "We document campus life and help members grow as photographers through walks, critiques and exhibitions.", members: 196, icon: Camera, coordinator: { name: "Prof. Arjun Das", role: "Faculty Coordinator", email: "arjun.das@university.edu" }, activities: ["Monthly photowalks", "Lightroom workshops", "Annual exhibition"], founded: "2016" },
  { id: "entrepreneurship", name: "Entrepreneurship Club", category: "Social", short: "Startup bootcamps, pitch nights and founder mentorship.", about: "Connecting student founders with mentors, investors and incubation resources.", members: 305, icon: Lightbulb, coordinator: { name: "Dr. Sunita Rao", role: "Faculty Coordinator", email: "sunita.rao@university.edu" }, activities: ["Pitch nights", "Startup bootcamp", "Founder fireside chats"], founded: "2018" },
  { id: "music", name: "Music Society", category: "Cultural", short: "Bands, choir and jam sessions open to every skill level.", about: "From classical to indie, we perform at every major campus event.", members: 240, icon: Music, coordinator: { name: "Prof. Leela Menon", role: "Faculty Coordinator", email: "leela.menon@university.edu" }, activities: ["Open jams", "Band showcase"], founded: "2011" },
  { id: "sports-council", name: "Sports Council", category: "Sports", short: "Inter-college tournaments, fitness drives and team trials.", about: "Coordinating all campus sports teams and tournaments.", members: 520, icon: Trophy, coordinator: { name: "Mr. Rohit Sen", role: "Director of Sports", email: "rohit.sen@university.edu" }, activities: ["Team trials", "Inter-college fest"], founded: "2010" },
  { id: "nss", name: "NSS Volunteers", category: "Social", short: "Community service, blood drives and rural outreach.", about: "National Service Scheme unit running outreach programmes.", members: 410, icon: HeartHandshake, coordinator: { name: "Dr. Kavita Joshi", role: "Programme Officer", email: "kavita.joshi@university.edu" }, activities: ["Blood donation", "Village outreach"], founded: "2009" },
];

export type EventCategory = "Workshop" | "Hackathon" | "Competition" | "Seminar" | "Club Event";
export interface CampusEvent { id: string; title: string; category: EventCategory; date: string; time: string; venue: string; organizer: string; clubId?: string; short: string; description: string; image: string; seats: number }
export const events: CampusEvent[] = [
  { id: "cloudsprint-2026", title: "CloudSprint Hackathon 2026", category: "Hackathon", date: "Oct 18, 2026", time: "9:00 AM – 9:00 PM", venue: "Main Auditorium", organizer: "Cloud Computing Club", clubId: "cloud-computing", short: "12-hour hackathon building cloud-native solutions for campus problems.", description: "Form teams of up to four and build cloud-native solutions to real campus challenges. Mentors from leading cloud companies will guide teams, and free cloud credits are provided to all participants. Top three teams win internship interviews and prizes worth ₹75,000.", image: hackImg, seats: 120 },
  { id: "aws-workshop", title: "AWS Hands-on Workshop: Serverless Basics", category: "Workshop", date: "Oct 12, 2026", time: "2:00 PM – 5:00 PM", venue: "Lab 3, CSE Block", organizer: "Cloud Computing Club", clubId: "cloud-computing", short: "Build and deploy your first serverless API with AWS Lambda.", description: "A guided, beginner-friendly session covering Lambda, API Gateway and DynamoDB. Bring your laptop; accounts are provided.", image: cloudImg, seats: 60 },
  { id: "ai-seminar", title: "Responsible AI in Healthcare", category: "Seminar", date: "Oct 15, 2026", time: "11:00 AM – 12:30 PM", venue: "Seminar Hall A", organizer: "Dept. of CSE", short: "Guest lecture on ethics and deployment of AI in clinical settings.", description: "Dr. Neha Kapoor from the Institute of Medical AI discusses bias, privacy and evaluation of AI systems used in hospitals.", image: campus, seats: 220 },
  { id: "robowars", title: "RoboWars Inter-College Challenge", category: "Competition", date: "Oct 24, 2026", time: "10:00 AM – 6:00 PM", venue: "Indoor Sports Complex", organizer: "AI & Robotics Club", clubId: "ai-robotics", short: "Combat robotics competition with teams from 20+ colleges.", description: "Watch or compete in the region's biggest robotics combat event. Registration open for teams and spectators.", image: roboImg, seats: 300 },
  { id: "photowalk", title: "Heritage Campus Photowalk", category: "Club Event", date: "Oct 13, 2026", time: "6:30 AM – 8:30 AM", venue: "Gate 1 Plaza", organizer: "Photography Club", clubId: "photography", short: "Early-morning walk capturing the campus's heritage buildings.", description: "A relaxed photowalk led by senior members, followed by a short editing session in the library.", image: campus, seats: 40 },
  { id: "pitch-night", title: "Startup Pitch Night", category: "Club Event", date: "Oct 21, 2026", time: "5:00 PM – 8:00 PM", venue: "Innovation Centre", organizer: "Entrepreneurship Club", clubId: "entrepreneurship", short: "Pitch your idea to a panel of founders and angel investors.", description: "Eight shortlisted teams pitch for incubation support and seed grants.", image: cloudImg, seats: 150 },
];

export type NoticeCategory = "Scholarship" | "Academic" | "Placement" | "Hostel";
export interface Notice { id: string; title: string; category: NoticeCategory; date: string; issuer: string; body: string }
export const notices: Notice[] = [
  { id: "merit-scholarship", title: "Merit Scholarship 2026–27: Applications Open", category: "Scholarship", date: "Oct 5, 2026", issuer: "Office of Student Welfare", body: "Students with CGPA 8.5 and above may apply for the Merit Scholarship covering up to 50% tuition. Submit the form and transcripts on the student portal by October 25, 2026." },
  { id: "midsem-schedule", title: "Mid-Semester Examination Schedule Released", category: "Academic", date: "Oct 3, 2026", issuer: "Controller of Examinations", body: "Mid-semester exams for all B.Tech programmes begin October 28. Detailed timetable and room allocation are available with department offices." },
  { id: "placement-drive", title: "Campus Placement Drive: Infosys & TCS", category: "Placement", date: "Oct 2, 2026", issuer: "Training & Placement Cell", body: "Final-year students of CSE, ECE and IT are eligible. Pre-placement talk on October 10 at Seminar Hall A. Register by October 8." },
  { id: "need-scholarship", title: "Need-Based Financial Aid Scholarship", category: "Scholarship", date: "Sep 29, 2026", issuer: "Office of Student Welfare", body: "Financial aid for students with family income below ₹6 LPA. Supporting documents required. Deadline: November 5, 2026." },
  { id: "hostel-fee", title: "Hostel Fee Payment Window Extended", category: "Hostel", date: "Sep 27, 2026", issuer: "Hostel Administration", body: "The payment window for the second semester hostel fee is extended to October 15 without a late fee." },
];

export interface Opportunity { id: string; title: string; org: string; type: string; deadline: string; date: string; body: string }
export const opportunities: Opportunity[] = [
  { id: "google-step", title: "Google STEP Internship 2027", org: "Google", type: "Internship", deadline: "Nov 1, 2026", date: "Oct 4, 2026", body: "12-week paid internship for 2nd and 3rd year students in software engineering." },
  { id: "research-assistant", title: "Undergraduate Research Assistant – Cloud Systems Lab", org: "Dept. of CSE", type: "Research", deadline: "Oct 20, 2026", date: "Oct 1, 2026", body: "Work with Dr. Ananya Sharma on energy-efficient scheduling for cloud workloads. Stipend provided." },
  { id: "sih", title: "Smart India Hackathon – Internal Selection", org: "Innovation Cell", type: "Competition", deadline: "Oct 14, 2026", date: "Sep 30, 2026", body: "Register your team for the internal round to represent the university at SIH 2026." },
];

export interface Post { id: string; author: string; authorType: "University" | "Club" | "Organization"; clubId?: string; icon?: LucideIcon; time: string; kind: string; text: string; image?: string; likes: number; comments: { name: string; text: string }[] }
export const posts: Post[] = [
  { id: "p1", author: "AI & Robotics Club", authorType: "Club", clubId: "ai-robotics", icon: Bot, time: "2h ago", kind: "Competition result", text: "Team RoboForge wins 1st place at the International Robotics Competition! 🏆 Huge congratulations to our four members who built 'Unit 07' from scratch in just eight weeks.", image: roboImg, likes: 248, comments: [{ name: "Aditya K.", text: "Incredible work, team!" }, { name: "Dr. Rajesh Sharma", text: "Proud of you all." }] },
  { id: "p2", author: "Cloud Computing Club", authorType: "Club", clubId: "cloud-computing", icon: Cloud, time: "5h ago", kind: "Event announcement", text: "Registrations for CloudSprint Hackathon 2026 are now open. 12 hours, real campus problems, mentors from industry and free cloud credits. Form your team of four!", image: hackImg, likes: 132, comments: [{ name: "Riya P.", text: "Is it open to first years?" }] },
  { id: "p3", author: "Riverdale University", authorType: "University", time: "1d ago", kind: "Campus activity", text: "The new Central Library digital archive is now live — 40,000+ journals and theses accessible from anywhere on campus with your student ID.", image: campus, likes: 410, comments: [] },
  { id: "p4", author: "Cloud Computing Club", authorType: "Club", clubId: "cloud-computing", icon: Cloud, time: "3d ago", kind: "Club achievement", text: "28 members cleared the AWS Cloud Practitioner certification this semester through our study circles. Next cohort starts October 20.", image: cloudImg, likes: 96, comments: [] },
  { id: "p5", author: "Student Council", authorType: "Organization", icon: HeartHandshake, time: "4d ago", kind: "Campus activity", text: "Thank you to 300+ volunteers who joined the Clean Campus Drive this weekend. Together we collected 1.2 tonnes of recyclable waste.", likes: 188, comments: [] },
];

export interface Achievement { id: string; clubId: string; title: string; date: string; body: string }
export const achievements: Achievement[] = [
  { id: "a1", clubId: "cloud-computing", title: "Winners – AWS Community Builders Hackathon", date: "Aug 2026", body: "Team CloudNine placed first among 140 teams with a serverless attendance system." },
  { id: "a2", clubId: "cloud-computing", title: "28 AWS Certified Members", date: "Jul 2026", body: "Highest number of certifications from a single student chapter in the region." },
  { id: "a3", clubId: "cloud-computing", title: "Best Student Chapter Award", date: "Mar 2026", body: "Recognised by the Google Developer Student Clubs program for community impact." },
  { id: "a4", clubId: "ai-robotics", title: "1st Place – International Robotics Competition", date: "Oct 2026", body: "Team RoboForge's autonomous robot Unit 07 won the championship." },
];

export const highlights = [
  { title: "RoboForge wins International Robotics Competition", tag: "Achievement", image: roboImg },
  { title: "Central Library digital archive goes live", tag: "Campus", image: campus },
];

export const notifications = [
  { id: 1, text: "CloudSprint Hackathon registrations close in 3 days", time: "1h" },
  { id: 2, text: "New notice: Merit Scholarship 2026–27", time: "5h" },
  { id: 3, text: "Dr. Ananya Sharma updated her availability", time: "1d" },
];

export const adminUsers = [
  { name: "Sanchita Verma", email: "sanchita.verma@university.edu", dept: "CSE", year: "3rd", status: "Active" },
  { name: "Aditya Kumar", email: "aditya.kumar@university.edu", dept: "ECE", year: "2nd", status: "Active" },
  { name: "Riya Patel", email: "riya.patel@university.edu", dept: "CSE", year: "1st", status: "Active" },
  { name: "Mohit Singh", email: "mohit.singh@university.edu", dept: "ME", year: "4th", status: "Suspended" },
  { name: "Fatima Khan", email: "fatima.khan@university.edu", dept: "IT", year: "3rd", status: "Active" },
];

export const pendingPosts = [
  { id: "pp1", author: "Literary Society", title: "Open mic night announcement", submitted: "Oct 5, 10:20 AM" },
  { id: "pp2", author: "Coding Club", title: "Weekly contest results – Week 14", submitted: "Oct 5, 9:02 AM" },
  { id: "pp3", author: "Photography Club", title: "Exhibition call for entries", submitted: "Oct 4, 6:45 PM" },
  { id: "pp4", author: "Entrepreneurship Club", title: "Pitch Night shortlist", submitted: "Oct 4, 3:10 PM" },
];

export type SavedType = "notice" | "event" | "opportunity" | "post";
export function resolveSaved(key: string) {
  const [type, id] = key.split(":") as [SavedType, string];
  if (type === "notice") { const n = notices.find((x) => x.id === id); return n && { key, type, title: n.title, category: n.category, date: n.date }; }
  if (type === "event") { const e = events.find((x) => x.id === id); return e && { key, type, title: e.title, category: e.category, date: e.date, link: e.id }; }
  if (type === "opportunity") { const o = opportunities.find((x) => x.id === id); return o && { key, type, title: o.title, category: o.type, date: o.date }; }
  const p = posts.find((x) => x.id === id);
  return p && { key, type, title: p.text.slice(0, 80) + "…", category: p.author, date: p.time };
}

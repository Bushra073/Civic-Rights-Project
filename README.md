Project Name:Civic Sheild & Safety Hub
Overview: The Civic Rights & Safety Hub is a centralized database system designed to streamline the reporting and resolution of civic problems, consumer rights violations, and public safety hazards. By providing a structured platform for citizens to document issues ranging from infrastructure damage to service negligence, the system automatically categorizes and routes complaints to the appropriate authorities for transparent tracking and resolution.

Group Number: 2
Course Name: Database Management System Lab
Instructor: Fahmidur Rahman Sakib (Lecturer, Department of Computer Science & Technolgy, Metropolitan University)

<img width="811" height="217" alt="image" src="https://github.com/user-attachments/assets/beca1f5e-862a-45ef-8053-6e17697f51f8" />

Objective:-
1. Centralize all civic reports.
2. Simplify the submission process.
3. Ensure total accountability.
4. Track progress automatically.
   
Key Features:-
1. Role-Based Access Control:
The system distinguishes between three distinct user tiers, each with specific permissions managed by a database-level ENUM role system:
Citizen: Can securely register, log in, and file detailed complaints.

Authority: Has the power to view a consolidated list of complaints and update their status (e.g., Pending → Resolved).

Admin: Provides a macro-view of the system with access to analytical dashboards and user management.

3. Strict Data Integrity (Anti-Tamper Logic):
Unlike standard applications that allow easy data deletion, CivicGuard prioritizes accountability.

Referential Integrity: Uses Foreign Keys to ensure no complaint exists without a valid user.

Deletion Protection: Implements a Restrict Constraint (Error #1451) that prevents the removal of users who have active, unresolved complaints.

5. Real-Time Analytics Dashboard:
The Admin panel provides instant insights into city health using SQL Aggregation, calculating the volume of grievances and resolution rates on the fly.

6. Modern UI/UX:
A minimalist, aesthetic interface built with Tailwind CSS, focusing on high readability and urgent visual cues for status tracking.

Functionalities:-

Citizen Module
1.Authentication: Secure registration and login using unique email verification.

2.Incident Reporting: Submit complaints with title, description, and location metadata.

3.Personal Tracking: A private dashboard where citizens can track the live status of their specific reports.

Authority Module
1.Consolidated View: Accesses a "Master List" of grievances. Uses SQL JOINs to display the reporter's identity alongside the complaint details.

2.Status Management: A dedicated interface to transition reports from Pending to In-Progress or Resolved.

Admin Module
1.System Oversight: View total user counts and system-wide statistics.

2.Data Summarization: Utilizes Group By and Count functions to generate reports on issue categories and regional hotspots.

Database Architecture (DBMS)
1.Relational Schema: Designed under 3rd Normal Form (3NF) to eliminate data redundancy.

2.Persistence: Built on a MySQL/XAMPP stack ensuring data survives system restarts.

3.Query Optimization: Implementation of Subqueries and Complex Joins for efficient data retrieval across the user/complaint relationship.


<img width="1912" height="873" alt="Screenshot 2026-04-22 220355" src="https://github.com/user-attachments/assets/468277d2-70fd-42f2-a882-7186c9aee5c8" />
<img width="1918" height="858" alt="Screenshot 2026-04-22 220347" src="https://github.com/user-attachments/assets/d48794a8-96a7-418e-bbe2-a908da40e0bd" />
<img width="1917" height="866" alt="Screenshot 2026-04-22 220315" src="https://github.com/user-attachments/assets/254aea7b-827c-4b36-94b9-72b3457b9782" />
<img width="1919" height="860" alt="Screenshot 2026-04-22 220304" src="https://github.com/user-attachments/assets/19d9f5ca-e0d2-4bd9-8858-341daeed6dd5" />
<img width="1918" height="856" alt="Screenshot 2026-04-22 220229" src="https://github.com/user-attachments/assets/71d97581-c3d2-4040-9286-3c1942a127e6" />
<img width="1912" height="833" alt="Screenshot 2026-04-22 220218" src="https://github.com/user-attachments/assets/26584ca8-9936-48e6-a26c-99231bf6837e" />
<img width="1919" height="874" alt="Screenshot 2026-04-22 215940" src="https://github.com/user-attachments/assets/8d5e461b-a550-45f5-bbbc-7d4817e2d06a" />
<img width="1919" height="872" alt="Screenshot 2026-04-22 215919" src="https://github.com/user-attachments/assets/fee6a74d-b6ff-4a2e-9c1b-f7c9a7273e10" />
<img width="1915" height="877" alt="Screenshot 2026-04-22 215852" src="https://github.com/user-attachments/assets/f93046aa-ef26-45ae-874c-e7fedb5aadab" />
Video:

https://github.com/user-attachments/assets/28e36f74-2a3f-47e7-b014-cebaad6ef2a7






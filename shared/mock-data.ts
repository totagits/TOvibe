import { Organization, Account, User, Role, Pipeline, Stage, Deal, Contact, ConversationThread, Message, WorkflowNode, WorkflowEdge, Page, Booking, Review, Course, Lesson, AnalyticsDashboardData, Subscription, Project, Task, Product, Order, AffiliateProgram, AffiliatePartner, AIPredictedLeadScore, Activity } from './types';
export const MOCK_ORGANIZATION: Organization = {
  id: 'org_totag_it',
  name: 'TOTAG IT Services',
  logoUrl: '/totag-logo.svg', // Placeholder logo
  theme: {
    primaryColor: 'rgb(59 130 246)', // blue-500
  },
};
export const MOCK_ACCOUNTS: Account[] = [
  {
    id: 'acc_alpha_fitness',
    organizationId: 'org_totag_it',
    name: 'Alpha Fitness',
  },
  {
    id: 'acc_bravo_dental',
    organizationId: 'org_totag_it',
    name: 'Bravo Dental',
  },
];
export const MOCK_USERS: User[] = [
  {
    id: 'user_admin_1',
    name: 'Alice Admin',
    email: 'alice@totagit.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=alice',
    role: Role.ADMIN,
    organizationId: 'org_totag_it',
    accountId: 'acc_alpha_fitness',
  },
  {
    id: 'user_agent_1',
    name: 'Bob Agent',
    email: 'bob@totagit.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=bob',
    role: Role.AGENT,
    organizationId: 'org_totag_it',
    accountId: 'acc_alpha_fitness',
  },
  {
    id: 'user_owner_1',
    name: 'Charlie Owner',
    email: 'charlie@totagit.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=charlie',
    role: Role.OWNER,
    organizationId: 'org_totag_it',
    accountId: 'acc_bravo_dental',
  },
  {
    id: 'user_client_1',
    name: 'David Client',
    email: 'david@alphafitness.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=david',
    role: Role.CLIENT_VIEWER,
    organizationId: 'org_totag_it',
    accountId: 'acc_alpha_fitness',
  },
];
// CRM Mock Data
export const MOCK_CONTACTS: Contact[] = [
  { id: 'contact_1', accountId: 'acc_alpha_fitness', name: 'John Doe', email: 'john.d@example.com', ownerId: 'user_agent_1', leadScore: 85, lifecycleStage: 'opportunity', lastTouchAt: '2023-10-26T10:00:00Z', tags: ['vip', 'newsletter'], avatarUrl: 'https://i.pravatar.cc/150?u=john' },
  { id: 'contact_2', accountId: 'acc_alpha_fitness', name: 'Jane Smith', email: 'jane.s@example.com', ownerId: 'user_admin_1', leadScore: 60, lifecycleStage: 'lead', lastTouchAt: '2023-10-25T14:30:00Z', tags: ['hot-lead'], avatarUrl: 'https://i.pravatar.cc/150?u=jane' },
  { id: 'contact_3', accountId: 'acc_bravo_dental', name: 'Peter Jones', email: 'peter.j@example.com', ownerId: 'user_owner_1', leadScore: 95, lifecycleStage: 'customer', lastTouchAt: '2023-10-27T11:00:00Z', tags: ['referral'], avatarUrl: 'https://i.pravatar.cc/150?u=peter' },
  { id: 'contact_4', accountId: 'acc_alpha_fitness', name: 'Mary Johnson', email: 'mary.j@example.com', ownerId: 'user_agent_1', leadScore: 40, lifecycleStage: 'lead', lastTouchAt: '2023-09-15T09:00:00Z', tags: [], avatarUrl: 'https://i.pravatar.cc/150?u=mary' },
  { id: 'contact_5', accountId: 'acc_alpha_fitness', name: 'Chris Lee', email: 'chris.l@example.com', ownerId: 'user_admin_1', leadScore: 75, lifecycleStage: 'sales_qualified', lastTouchAt: '2023-10-28T16:00:00Z', tags: ['demo-requested'], avatarUrl: 'https://i.pravatar.cc/150?u=chris' },
];
export const MOCK_PIPELINES: Pipeline[] = [
  { id: 'pipe_sales_1', accountId: 'acc_alpha_fitness', name: 'Sales Pipeline' },
  { id: 'pipe_support_1', accountId: 'acc_alpha_fitness', name: 'Support Tickets' },
  { id: 'pipe_dental_1', accountId: 'acc_bravo_dental', name: 'New Patient Pipeline' },
];
export const MOCK_STAGES: Stage[] = [
  { id: 'stage_1', pipelineId: 'pipe_sales_1', name: 'New Lead', order: 1 },
  { id: 'stage_2', pipelineId: 'pipe_sales_1', name: 'Contacted', order: 2 },
  { id: 'stage_3', pipelineId: 'pipe_sales_1', name: 'Proposal Sent', order: 3 },
  { id: 'stage_4', pipelineId: 'pipe_sales_1', name: 'Negotiation', order: 4 },
  { id: 'stage_5', pipelineId: 'pipe_sales_1', name: 'Won', order: 5 },
  { id: 'stage_6', pipelineId: 'pipe_sales_1', name: 'Lost', order: 6 },
];
export const MOCK_DEALS: Deal[] = [
  { id: 'deal_1', accountId: 'acc_alpha_fitness', name: 'Alpha Fitness - 1 year membership', pipelineId: 'pipe_sales_1', stageId: 'stage_1', amount: 1200, currency: 'USD', closeDate: '2023-11-30', ownerId: 'user_agent_1', contactIds: ['contact_1'] },
  { id: 'deal_2', accountId: 'acc_alpha_fitness', name: 'Alpha Fitness - PT Package', pipelineId: 'pipe_sales_1', stageId: 'stage_3', amount: 2500, currency: 'USD', closeDate: '2023-11-15', ownerId: 'user_admin_1', contactIds: ['contact_2'] },
  { id: 'deal_3', accountId: 'acc_bravo_dental', name: 'Bravo Dental - Whitening Service', pipelineId: 'pipe_dental_1', stageId: 'stage_1', amount: 500, currency: 'USD', closeDate: '2023-12-01', ownerId: 'user_owner_1', contactIds: ['contact_3'] },
  { id: 'deal_4', accountId: 'acc_alpha_fitness', name: 'Corporate Wellness Program', pipelineId: 'pipe_sales_1', stageId: 'stage_4', amount: 15000, currency: 'USD', closeDate: '2023-11-20', ownerId: 'user_agent_1', contactIds: ['contact_5'] },
  { id: 'deal_5', accountId: 'acc_alpha_fitness', name: 'Nutrition Plan Add-on', pipelineId: 'pipe_sales_1', stageId: 'stage_1', amount: 300, currency: 'USD', closeDate: '2023-12-10', ownerId: 'user_agent_1', contactIds: ['contact_4'] },
];
// Unified Inbox Mock Data
export const MOCK_THREADS: ConversationThread[] = [
  { id: 'thread_1', accountId: 'acc_alpha_fitness', contactId: 'contact_1', channel: 'email', lastMessageAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), lastMessageSnippet: 'Sounds great, let\'s proceed with the annual plan.', isRead: false, assigneeId: 'user_agent_1' },
  { id: 'thread_2', accountId: 'acc_alpha_fitness', contactId: 'contact_2', channel: 'sms', lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), lastMessageSnippet: 'Can I reschedule my session for tomorrow?', isRead: true, assigneeId: 'user_admin_1' },
  { id: 'thread_3', accountId: 'acc_bravo_dental', contactId: 'contact_3', channel: 'whatsapp', lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), lastMessageSnippet: 'Thank you for the reminder!', isRead: true },
  { id: 'thread_4', accountId: 'acc_alpha_fitness', contactId: 'contact_5', channel: 'email', lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), lastMessageSnippet: 'Following up on the corporate wellness proposal.', isRead: false, assigneeId: 'user_agent_1' },
];
export const MOCK_MESSAGES: Message[] = [
  { id: 'msg_1_1', threadId: 'thread_1', authorId: 'user_agent_1', authorType: 'user', channel: 'email', content: 'Hi John, following up on our call. Here is the proposal for the annual membership.', createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), direction: 'outbound' },
  { id: 'msg_1_2', threadId: 'thread_1', authorId: 'contact_1', authorType: 'contact', channel: 'email', content: 'Thanks Bob. I\'ve reviewed it.', createdAt: new Date(Date.now() - 1000 * 60 * 7).toISOString(), direction: 'inbound' },
  { id: 'msg_1_3', threadId: 'thread_1', authorId: 'contact_1', authorType: 'contact', channel: 'email', content: 'Sounds great, let\'s proceed with the annual plan.', createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), direction: 'inbound' },
  { id: 'msg_2_1', threadId: 'thread_2', authorId: 'user_admin_1', authorType: 'user', channel: 'sms', content: 'Hi Jane, reminder for your PT session today at 4pm.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), direction: 'outbound' },
  { id: 'msg_2_2', threadId: 'thread_2', authorId: 'contact_2', authorType: 'contact', channel: 'sms', content: 'Can I reschedule my session for tomorrow?', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), direction: 'inbound' },
  { id: 'msg_3_1', threadId: 'thread_3', authorId: 'user_owner_1', authorType: 'user', channel: 'whatsapp', content: 'Hi Peter, this is a reminder for your dental check-up tomorrow at 10am.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), direction: 'outbound' },
  { id: 'msg_3_2', threadId: 'thread_3', authorId: 'contact_3', authorType: 'contact', channel: 'whatsapp', content: 'Thank you for the reminder!', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), direction: 'inbound' },
  { id: 'msg_4_1', threadId: 'thread_4', authorId: 'user_agent_1', authorType: 'user', channel: 'email', content: 'Hi Chris, I hope you had a chance to review the corporate wellness proposal we sent over last week.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(), direction: 'outbound' },
  { id: 'msg_4_2', threadId: 'thread_4', authorId: 'contact_5', authorType: 'contact', channel: 'email', content: 'Following up on the corporate wellness proposal.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), direction: 'inbound' },
];
// Automation Mock Data
export const MOCK_WORKFLOW_NODES: WorkflowNode[] = [
  { id: '1', type: 'custom', position: { x: 50, y: 100 }, data: { type: 'trigger', title: 'Form Submitted', description: 'Triggers when any form is submitted.', icon: 'FileText' } },
  { id: '2', type: 'custom', position: { x: 350, y: 50 }, data: { type: 'action', title: 'Send Email', description: 'Sends a marketing email.', icon: 'Mail' } },
  { id: '3', type: 'custom', position: { x: 350, y: 200 }, data: { type: 'action', title: 'Send SMS', description: 'Sends an SMS message.', icon: 'MessageSquare' } },
  { id: '4', type: 'custom', position: { x: 650, y: 50 }, data: { type: 'action', title: 'Add Tag', description: 'Adds a tag to the contact.', icon: 'Tag' } },
];
export const MOCK_WORKFLOW_EDGES: WorkflowEdge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true },
];
// Pages & Funnels Mock Data
export const MOCK_PAGES: Page[] = [
  { id: 'page_1', accountId: 'acc_alpha_fitness', name: 'Alpha Fitness Homepage', type: 'website', status: 'published', url: 'https://alphafitness.totag.site', stats: { views: 12503, leads: 432, conversionRate: 3.45 }, createdAt: '2023-09-01T10:00:00Z', updatedAt: '2023-10-28T12:00:00Z', blocks: [
    { id: 'block_1', type: 'hero', content: { title: 'Achieve Your Fitness Goals', subtitle: 'Join the Alpha Fitness community today.', buttonText: 'Get Started', imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470' } },
    { id: 'block_2', type: 'text', content: { heading: 'About Us', text: 'We are a state-of-the-art fitness facility dedicated to helping you achieve your personal best.' } },
  ]},
  { id: 'page_2', accountId: 'acc_alpha_fitness', name: 'New Year Promo Funnel', type: 'funnel', status: 'published', url: 'https://promo.alphafitness.totag.site', stats: { views: 8765, leads: 987, conversionRate: 11.26 }, createdAt: '2023-10-15T10:00:00Z', updatedAt: '2023-10-25T11:00:00Z' },
  { id: 'page_3', accountId: 'acc_bravo_dental', name: 'Bravo Dental Main Site', type: 'website', status: 'published', url: 'https://bravodental.totag.site', stats: { views: 9821, leads: 215, conversionRate: 2.19 }, createdAt: '2023-08-20T10:00:00Z', updatedAt: '2023-10-20T18:00:00Z' },
  { id: 'page_4', accountId: 'acc_bravo_dental', name: 'Teeth Whitening Offer', type: 'funnel', status: 'draft', url: 'https://whitening.bravodental.totag.site', stats: { views: 0, leads: 0, conversionRate: 0 }, createdAt: '2023-10-29T14:00:00Z', updatedAt: '2023-10-29T16:00:00Z' },
];
// Scheduler Mock Data
export const MOCK_BOOKINGS: Booking[] = [
  { id: 'booking_1', accountId: 'acc_alpha_fitness', title: 'Initial Consultation', contactId: 'contact_1', userId: 'user_agent_1', startTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(), endTime: new Date(new Date().setHours(10, 30, 0, 0)).toISOString(), status: 'confirmed', location: 'Google Meet' },
  { id: 'booking_2', accountId: 'acc_alpha_fitness', title: 'Personal Training Session', contactId: 'contact_2', userId: 'user_admin_1', startTime: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(), endTime: new Date(new Date().setHours(15, 0, 0, 0)).toISOString(), status: 'confirmed', location: 'In Person' },
  { id: 'booking_3', accountId: 'acc_bravo_dental', title: 'Dental Check-up', contactId: 'contact_3', userId: 'user_owner_1', startTime: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(9, 0, 0, 0).toString(), endTime: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(9, 45, 0, 0).toString(), status: 'confirmed', location: 'Phone Call' },
  { id: 'booking_4', accountId: 'acc_alpha_fitness', title: 'Demo Request Call', contactId: 'contact_5', userId: 'user_agent_1', startTime: new Date(new Date().setHours(11, 30, 0, 0)).toISOString(), endTime: new Date(new Date().setHours(12, 0, 0, 0)).toISOString(), status: 'pending', location: 'Google Meet' },
];
// Reputation Mock Data
export const MOCK_REVIEWS: Review[] = [
  { id: 'review_1', accountId: 'acc_alpha_fitness', source: 'Google', rating: 5, authorName: 'Samantha B.', authorAvatarUrl: 'https://i.pravatar.cc/150?u=samantha', content: 'Amazing gym! The trainers are super helpful and the community is very welcoming. Highly recommend!', status: 'replied', createdAt: '2023-10-28T10:00:00Z' },
  { id: 'review_2', accountId: 'acc_alpha_fitness', source: 'Facebook', rating: 4, authorName: 'Mike R.', authorAvatarUrl: 'https://i.pravatar.cc/150?u=mike', content: 'Great facilities, but it can get a bit crowded during peak hours. Overall a good experience.', status: 'pending', createdAt: '2023-10-27T15:30:00Z' },
  { id: 'review_3', accountId: 'acc_bravo_dental', source: 'Yelp', rating: 5, authorName: 'Jessica L.', authorAvatarUrl: 'https://i.pravatar.cc/150?u=jessica', content: 'Dr. Charlie is the best! Made me feel super comfortable during my entire visit. The staff is friendly and professional.', status: 'approved', createdAt: '2023-10-25T11:00:00Z' },
  { id: 'review_4', accountId: 'acc_alpha_fitness', source: 'Google', rating: 3, authorName: 'Tom H.', authorAvatarUrl: 'https://i.pravatar.cc/150?u=tom', content: 'Decent gym, but some of the equipment is a bit dated. Could use an upgrade.', status: 'pending', createdAt: '2023-10-29T09:00:00Z' },
];
// Courses Mock Data
export const MOCK_COURSES: Course[] = [
  { id: 'course_1', accountId: 'acc_alpha_fitness', title: 'Fitness Fundamentals', description: 'Master the basics of fitness, nutrition, and workout planning.', thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800', progress: 60 },
  { id: 'course_2', accountId: 'acc_alpha_fitness', title: 'Advanced Strength Training', description: 'Take your strength to the next level with advanced techniques.', thumbnailUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800', progress: 25 },
  { id: 'course_3', accountId: 'acc_bravo_dental', title: 'Dental Practice Marketing 101', description: 'Learn how to attract more patients to your dental practice.', thumbnailUrl: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=800', progress: 0 },
  { id: 'course_4', accountId: 'acc_alpha_fitness', title: 'Yoga and Mindfulness', description: 'Improve flexibility and reduce stress with guided yoga sessions.', thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800', progress: 90 },
];
export const MOCK_LESSONS: Lesson[] = [
  { id: 'lesson_1_1', courseId: 'course_1', title: 'Introduction to Fitness', content: 'This lesson covers the core principles of physical fitness.', duration: 15, isCompleted: true },
  { id: 'lesson_1_2', courseId: 'course_1', title: 'Understanding Macronutrients', content: 'Learn about proteins, carbs, and fats.', duration: 25, isCompleted: true },
  { id: 'lesson_1_3', courseId: 'course_1', title: 'Creating a Workout Plan', content: 'A step-by-step guide to building your own routine.', duration: 30, isCompleted: false },
  { id: 'lesson_2_1', courseId: 'course_2', title: 'Progressive Overload', content: 'The key to continuous strength gains.', duration: 20, isCompleted: true },
  { id: 'lesson_2_2', courseId: 'course_2', title: 'Compound vs. Isolation', content: 'Learn the difference and when to use each.', duration: 20, isCompleted: false },
  { id: 'lesson_3_1', courseId: 'course_3', title: 'Local SEO for Dentists', content: 'Get found by patients in your area.', duration: 45, isCompleted: false },
  { id: 'lesson_4_1', courseId: 'course_4', title: 'Sun Salutations', content: 'Master the foundational yoga flow.', duration: 20, isCompleted: true },
];
// Analytics Mock Data
export const MOCK_ANALYTICS_DATA: AnalyticsDashboardData = {
  kpis: [
    { title: 'Total Revenue', value: '$125,430', change: '+12.5% vs last month', icon: 'DollarSign' },
    { title: 'New Leads', value: '1,230', change: '+8.2% vs last month', icon: 'Users' },
    { title: 'Conversion Rate', value: '4.8%', change: '-0.5% vs last month', icon: 'Goal' },
    { title: 'Avg. Deal Size', value: '$2,450', change: '+3.1% vs last month', icon: 'Briefcase' },
  ],
  revenueTrend: [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
    { name: 'Jul', value: 7000 },
  ],
  leadSources: [
    { name: 'Organic Search', value: 400 },
    { name: 'Direct', value: 300 },
    { name: 'Referral', value: 200 },
    { name: 'Social Media', value: 278 },
    { name: 'Paid Ads', value: 189 },
  ],
  pipelineFunnel: [
    { name: 'Leads', value: 1230 },
    { name: 'Contacted', value: 980 },
    { name: 'Proposal', value: 540 },
    { name: 'Negotiation', value: 210 },
    { name: 'Won', value: 150 },
  ],
};
// Settings Mock Data
export const MOCK_SUBSCRIPTION: Subscription = {
  planName: 'Pro Plan',
  price: 299,
  currency: 'USD',
  interval: 'month',
  status: 'active',
  currentPeriodEnd: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString(),
  usage: {
    contacts: { used: 1234, limit: 5000 },
    users: { used: 3, limit: 5 },
    emails: { used: 8765, limit: 15000 },
  },
};
// Projects Mock Data
export const MOCK_PROJECTS: Project[] = [
  { id: 'proj_1', accountId: 'acc_alpha_fitness', name: 'Q4 Marketing Campaign' },
  { id: 'proj_2', accountId: 'acc_alpha_fitness', name: 'Website Redesign' },
  { id: 'proj_3', accountId: 'acc_bravo_dental', name: 'New Patient Onboarding' },
];
export const MOCK_TASKS: Task[] = [
  { id: 'task_1', projectId: 'proj_1', title: 'Design social media assets', status: 'done', assigneeIds: ['user_agent_1'], dueDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString() },
  { id: 'task_2', projectId: 'proj_1', title: 'Write ad copy for Facebook', status: 'in_progress', assigneeIds: ['user_admin_1'], dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString() },
  { id: 'task_3', projectId: 'proj_1', title: 'Setup Google Ads campaign', status: 'todo', assigneeIds: ['user_agent_1'], dueDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString() },
  { id: 'task_4', projectId: 'proj_1', title: 'Finalize campaign budget', status: 'backlog', assigneeIds: ['user_admin_1'] },
  { id: 'task_5', projectId: 'proj_2', title: 'Create wireframes for homepage', status: 'done', assigneeIds: ['user_agent_1'] },
  { id: 'task_6', projectId: 'proj_2', title: 'Develop new hero component', status: 'in_progress', assigneeIds: ['user_agent_1', 'user_admin_1'], dueDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString() },
  { id: 'task_7', projectId: 'proj_3', title: 'Design welcome packet', status: 'todo', assigneeIds: ['user_owner_1'] },
];
// E-commerce Mock Data
export const MOCK_PRODUCTS: Product[] = [
  { id: 'prod_1', accountId: 'acc_alpha_fitness', name: 'Alpha Fitness Water Bottle', imageUrl: 'https://images.unsplash.com/photo-1602143407151-247e961438ae?q=80&w=400', sku: 'AF-WB-01', price: 19.99, inventory: 150, status: 'active' },
  { id: 'prod_2', accountId: 'acc_alpha_fitness', name: 'Alpha Fitness T-Shirt', imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=400', sku: 'AF-TS-01-M', price: 29.99, inventory: 75, status: 'active' },
  { id: 'prod_3', accountId: 'acc_alpha_fitness', name: 'Protein Powder (Vanilla)', imageUrl: 'https://images.unsplash.com/photo-1567671397952-6b6b4f4d0b3b?q=80&w=400', sku: 'SUP-PRO-01', price: 49.99, inventory: 40, status: 'active' },
  { id: 'prod_4', accountId: 'acc_alpha_fitness', name: 'Yoga Mat', imageUrl: 'https://images.unsplash.com/photo-1591291621164-2c6367723315?q=80&w=400', sku: 'AF-YM-01', price: 39.99, inventory: 0, status: 'archived' },
];
export const MOCK_ORDERS: Order[] = [
  { id: 'order_1001', accountId: 'acc_alpha_fitness', contactId: 'contact_1', orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), status: 'fulfilled', total: 49.98, itemsCount: 2 },
  { id: 'order_1002', accountId: 'acc_alpha_fitness', contactId: 'contact_2', orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), status: 'pending', total: 29.99, itemsCount: 1 },
  { id: 'order_1003', accountId: 'acc_bravo_dental', contactId: 'contact_3', orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), status: 'fulfilled', total: 15.00, itemsCount: 1 },
  { id: 'order_1004', accountId: 'acc_alpha_fitness', contactId: 'contact_4', orderDate: new Date().toISOString(), status: 'pending', total: 89.97, itemsCount: 3 },
  { id: 'order_1005', accountId: 'acc_alpha_fitness', contactId: 'contact_5', orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), status: 'cancelled', total: 19.99, itemsCount: 1 },
];
// Affiliates Mock Data
export const MOCK_AFFILIATE_PROGRAMS: AffiliateProgram[] = [
  { id: 'prog_1', accountId: 'acc_alpha_fitness', name: 'Standard Affiliate Program', commissionRate: 20, commissionType: 'percentage', activePartners: 12 },
  { id: 'prog_2', accountId: 'acc_alpha_fitness', name: 'Influencer Program', commissionRate: 50, commissionType: 'fixed', activePartners: 3 },
  { id: 'prog_3', accountId: 'acc_bravo_dental', name: 'Patient Referral Program', commissionRate: 25, commissionType: 'fixed', activePartners: 35 },
];
export const MOCK_AFFILIATE_PARTNERS: AffiliatePartner[] = [
  { id: 'part_1', accountId: 'acc_alpha_fitness', programId: 'prog_1', name: 'Fitness Guru Blog', email: 'contact@fitness.guru', avatarUrl: 'https://i.pravatar.cc/150?u=fguru', referralLink: 'https://alpha.totag.site?ref=fguru', stats: { clicks: 1205, conversions: 85, earnings: 1275.50 } },
  { id: 'part_2', accountId: 'acc_alpha_fitness', programId: 'prog_2', name: 'Eva Strong', email: 'eva.s@email.com', avatarUrl: 'https://i.pravatar.cc/150?u=eva', referralLink: 'https://alpha.totag.site?ref=evastrong', stats: { clicks: 3450, conversions: 210, earnings: 10500.00 } },
  { id: 'part_3', accountId: 'acc_bravo_dental', programId: 'prog_3', name: 'Local Mom Network', email: 'info@localmom.net', avatarUrl: 'https://i.pravatar.cc/150?u=lmn', referralLink: 'https://bravo.totag.site?ref=lmn', stats: { clicks: 850, conversions: 45, earnings: 1125.00 } },
  { id: 'part_4', accountId: 'acc_alpha_fitness', programId: 'prog_1', name: 'Healthy Living Weekly', email: 'editor@hlw.com', avatarUrl: 'https://i.pravatar.cc/150?u=hlw', referralLink: 'https://alpha.totag.site?ref=hlw', stats: { clicks: 980, conversions: 62, earnings: 930.00 } },
];
// AI Mock Data
export const MOCK_AI_LEAD_SCORE: AIPredictedLeadScore = {
  contactId: 'contact_2',
  score: 82,
  reasons: [
    { text: 'High engagement with recent email campaigns.', positive: true },
    { text: 'Visited pricing page 3 times in the last week.', positive: true },
    { text: 'Matches ideal customer profile for "Fitness Enthusiast".', positive: true },
    { text: 'Last contacted over 2 weeks ago.', positive: false },
  ],
  recommendation: 'This is a hot lead. Recommend immediate follow-up with a personalized offer for personal training sessions.',
};
// Dashboard Activity Mock Data
export const MOCK_ACTIVITIES: Activity[] = [
  { id: 'act_1', type: 'deal_won', description: 'closed the deal "Corporate Wellness Program".', timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), user: { id: 'user_agent_1', name: 'Bob Agent', avatarUrl: 'https://i.pravatar.cc/150?u=bob' } },
  { id: 'act_2', type: 'contact_created', description: 'added a new contact "Samantha Ray".', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), user: { id: 'user_admin_1', name: 'Alice Admin', avatarUrl: 'https://i.pravatar.cc/150?u=alice' } },
  { id: 'act_3', type: 'form_submitted', description: 'submitted the "Contact Us" form.', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), user: { id: 'contact_5', name: 'Chris Lee', avatarUrl: 'https://i.pravatar.cc/150?u=chris' } },
  { id: 'act_4', type: 'email_sent', description: 'sent the "Welcome Series" email to 150 contacts.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), user: { id: 'user_admin_1', name: 'Alice Admin', avatarUrl: 'https://i.pravatar.cc/150?u=alice' } },
  { id: 'act_5', type: 'deal_won', description: 'closed the deal "Bravo Dental - Whitening Service".', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), user: { id: 'user_owner_1', name: 'Charlie Owner', avatarUrl: 'https://i.pravatar.cc/150?u=charlie' } },
];
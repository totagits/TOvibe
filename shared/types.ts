export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export enum Role {
  OWNER = 'owner',
  ADMIN = 'admin',
  MANAGER = 'manager',
  AGENT = 'agent',
  ANALYST = 'analyst',
  CLIENT_VIEWER = 'client_viewer',
}
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: Role;
  organizationId: string;
  accountId: string; // The default/current account the user is in
}
export interface Account {
  id: string;
  name:string;
  organizationId: string;
}
export interface Organization {
  id: string;
  name: string;
  logoUrl?: string;
  theme?: {
    primaryColor?: string;
  };
}
export interface AuthContext {
  user: User;
  organization: Organization;
  accounts: Account[];
  token: string;
}
// CRM Types
export interface Contact {
  id: string;
  accountId: string;
  name: string;
  email: string;
  phone?: string;
  companyId?: string;
  ownerId: string;
  leadScore: number;
  lifecycleStage: 'lead' | 'marketing_qualified' | 'sales_qualified' | 'opportunity' | 'customer' | 'evangelist';
  lastTouchAt: string;
  tags: string[];
  avatarUrl?: string;
}
export interface Company {
  id: string;
  accountId: string;
  name: string;
  domain: string;
  industry?: string;
}
export interface Deal {
  id: string;
  accountId: string;
  name: string;
  pipelineId: string;
  stageId: string;
  amount: number;
  currency: string;
  closeDate: string;
  ownerId: string;
  contactIds: string[];
}
export interface Stage {
  id: string;
  pipelineId: string;
  name: string;
  order: number;
}
export interface Pipeline {
  id: string;
  accountId: string;
  name: string;
}
// Unified Inbox Types
export type MessageChannel = 'email' | 'sms' | 'whatsapp' | 'voice' | 'facebook' | 'instagram';
export interface Message {
  id: string;
  threadId: string;
  authorId: string; // Can be a User ID or a Contact ID
  authorType: 'user' | 'contact';
  channel: MessageChannel;
  content: string;
  createdAt: string;
  direction: 'inbound' | 'outbound';
}
export interface ConversationThread {
  id: string;
  accountId: string;
  contactId: string;
  channel: MessageChannel;
  lastMessageAt: string;
  lastMessageSnippet: string;
  isRead: boolean;
  assigneeId?: string;
}
// Automation Workflow Types
export interface Workflow {
  id: string;
  name: string;
  accountId: string;
  isEnabled: boolean;
  triggerType: string;
}
export enum WorkflowNodeType {
  TRIGGER = 'trigger',
  ACTION = 'action',
  CONDITION = 'condition',
}
export interface WorkflowNodeData {
  type: 'trigger' | 'action';
  title: string;
  description: string;
  icon: string; // Lucide icon name
}
export type WorkflowNode = {
  id: string;
  type: 'custom'; // We will use a single custom node type for consistent styling
  position: { x: number; y: number };
  data: WorkflowNodeData;
};
export type WorkflowEdge = {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
};
// Pages & Funnels Types
export type PageBlockType = 'hero' | 'text' | 'image' | 'button' | 'form' | 'pricing' | 'testimonials' | 'faq';
export interface PageBlock {
  id: string;
  type: PageBlockType;
  content: Record<string, any>;
}
export interface Page {
  id: string;
  accountId: string;
  name: string;
  type: 'website' | 'funnel';
  status: 'draft' | 'published';
  url: string;
  stats: {
    views: number;
    leads: number;
    conversionRate: number;
  };
  createdAt: string;
  updatedAt: string;
  blocks?: PageBlock[];
}
// Scheduler Types
export interface Booking {
  id: string;
  accountId: string;
  title: string;
  contactId: string;
  userId: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'canceled';
  location: string; // e.g., 'Google Meet', 'Phone Call', 'In Person'
}
// Reputation Types
export interface Review {
  id: string;
  accountId: string;
  source: 'Google' | 'Facebook' | 'Yelp';
  rating: number; // 1-5
  authorName: string;
  authorAvatarUrl?: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected' | 'replied';
  createdAt: string;
  respondedAt?: string;
}
// Courses & Memberships Types
export interface Course {
  id: string;
  accountId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  progress: number; // 0-100
}
export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string;
  duration: number; // in minutes
  isCompleted: boolean;
}
export interface Membership {
  id: string;
  contactId: string;
  courseId: string;
  status: 'active' | 'canceled' | 'completed';
  enrolledAt: string;
}
// Analytics Types
export interface KpiCardData {
  title: string;
  value: string;
  change: string;
  icon: string; // Lucide icon name
}
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}
export interface AnalyticsDashboardData {
  kpis: KpiCardData[];
  revenueTrend: ChartDataPoint[];
  leadSources: ChartDataPoint[];
  pipelineFunnel: ChartDataPoint[];
}
// Settings & Billing Types
export interface Subscription {
  planName: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodEnd: string;
  usage: {
    contacts: { used: number; limit: number };
    users: { used: number; limit: number };
    emails: { used: number; limit: number };
  };
}
// Projects Types
export type TaskStatus = 'todo' | 'in_progress' | 'done' | 'backlog';
export interface Project {
  id: string;
  accountId: string;
  name: string;
}
export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assigneeIds: string[];
  dueDate?: string;
}
// E-commerce Types
export interface Product {
  id: string;
  accountId: string;
  name: string;
  imageUrl: string;
  sku: string;
  price: number;
  inventory: number;
  status: 'active' | 'archived';
}
export interface Order {
  id: string;
  accountId: string;
  contactId: string;
  orderDate: string;
  status: 'pending' | 'fulfilled' | 'cancelled';
  total: number;
  itemsCount: number;
}
// Affiliates Types
export interface AffiliateProgram {
  id: string;
  accountId: string;
  name: string;
  commissionRate: number;
  commissionType: 'percentage' | 'fixed';
  activePartners: number;
}
export interface AffiliatePartner {
  id: string;
  accountId: string;
  programId: string;
  name: string;
  email: string;
  avatarUrl?: string;
  referralLink: string;
  stats: {
    clicks: number;
    conversions: number;
    earnings: number;
  };
}
// AI Types
export interface AIPredictedLeadScore {
  contactId: string;
  score: number; // 0-100
  reasons: {
    text: string;
    positive: boolean;
  }[];
  recommendation: string;
}
// Dashboard Types
export interface Activity {
  id: string;
  type: 'contact_created' | 'deal_won' | 'email_sent' | 'form_submitted';
  description: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
}
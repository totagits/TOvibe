import { Hono } from "hono";
import type { Env } from './core-utils';
import { ok, bad, notFound } from './core-utils';
import { MOCK_USERS, MOCK_ORGANIZATION, MOCK_ACCOUNTS, MOCK_CONTACTS, MOCK_PIPELINES, MOCK_STAGES, MOCK_DEALS, MOCK_THREADS, MOCK_MESSAGES, MOCK_WORKFLOW_NODES, MOCK_WORKFLOW_EDGES, MOCK_PAGES, MOCK_BOOKINGS, MOCK_REVIEWS, MOCK_COURSES, MOCK_LESSONS, MOCK_ANALYTICS_DATA, MOCK_SUBSCRIPTION, MOCK_PROJECTS, MOCK_TASKS, MOCK_PRODUCTS, MOCK_ORDERS, MOCK_AFFILIATE_PROGRAMS, MOCK_AFFILIATE_PARTNERS, MOCK_AI_LEAD_SCORE } from '@shared/mock-data';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // Mock Login
  app.post('/api/auth/login', async (c) => {
    const { email } = (await c.req.json()) as { email?: string };
    const user = MOCK_USERS.find(u => u.email === email);
    if (user) {
      // In a real app, you'd generate a real JWT. Here, it's just a mock token.
      return ok(c, { token: `mock-token-for-${user.id}` });
    }
    return bad(c, 'Invalid credentials');
  });
  // Mock Get Current User
  app.get('/api/auth/me', async (c) => {
    // In a real app, you'd validate the Authorization header token.
    // Here, we'll just return the first admin user as the logged-in user.
    const user = MOCK_USERS.find(u => u.role === 'admin');
    if (user) {
      return ok(c, user);
    }
    return bad(c, 'Not authenticated');
  });
  // Mock Get Organization and Accounts
  app.get('/api/organization', async (c) => {
    // This endpoint would also be protected and use the user's token
    // to determine which organization and accounts to return.
    return ok(c, {
      organization: MOCK_ORGANIZATION,
      accounts: MOCK_ACCOUNTS,
    });
  });
  // --- CRM Routes ---
  app.get('/api/crm/contacts', async (c) => {
    const accountId = MOCK_USERS.find(u => u.role === 'admin')?.accountId;
    const contacts = MOCK_CONTACTS.filter(contact => contact.accountId === accountId);
    return ok(c, contacts);
  });
  app.get('/api/crm/pipelines', async (c) => {
    const accountId = MOCK_USERS.find(u => u.role === 'admin')?.accountId;
    const pipelines = MOCK_PIPELINES.filter(p => p.accountId === accountId);
    const pipelineIds = pipelines.map(p => p.id);
    const stages = MOCK_STAGES.filter(s => pipelineIds.includes(s.pipelineId));
    const deals = MOCK_DEALS.filter(d => d.accountId === accountId);
    return ok(c, { pipelines, stages, deals });
  });
  // --- Unified Inbox Routes ---
  app.get('/api/inbox/threads', async (c) => {
    const accountId = MOCK_USERS.find(u => u.role === 'admin')?.accountId;
    const threads = MOCK_THREADS.filter(t => t.accountId === accountId);
    // Join with contact info for display
    const threadsWithContact = threads.map(thread => {
      const contact = MOCK_CONTACTS.find(c => c.id === thread.contactId);
      return { ...thread, contact };
    });
    return ok(c, threadsWithContact);
  });
  app.get('/api/inbox/threads/:id/messages', async (c) => {
    const threadId = c.req.param('id');
    const messages = MOCK_MESSAGES.filter(m => m.threadId === threadId);
    return ok(c, messages);
  });
  // --- Automation Routes ---
  app.get('/api/automation/workflows/:id', async (c) => {
    const workflowId = c.req.param('id');
    // In a real app, you'd fetch the specific workflow. Here we return the mock data.
    return ok(c, {
      id: workflowId,
      name: 'Sample Lead Nurturing Workflow',
      nodes: MOCK_WORKFLOW_NODES,
      edges: MOCK_WORKFLOW_EDGES,
    });
  });
  // --- Pages & Funnels Routes ---
  app.get('/api/pages', async (c) => {
    const accountId = MOCK_USERS.find(u => u.role === 'admin')?.accountId;
    const pages = MOCK_PAGES.filter(p => p.accountId === accountId);
    return ok(c, pages);
  });
  app.get('/api/pages/:id', async (c) => {
    const pageId = c.req.param('id');
    const page = MOCK_PAGES.find(p => p.id === pageId);
    if (page) {
      return ok(c, page);
    }
    return notFound(c, 'Page not found');
  });
  // --- Scheduler Routes ---
  app.get('/api/scheduler/bookings', async (c) => {
    const accountId = MOCK_USERS.find(u => u.role === 'admin')?.accountId;
    const bookings = MOCK_BOOKINGS.filter(b => b.accountId === accountId);
    return ok(c, bookings);
  });
  // --- Reputation Routes ---
  app.get('/api/reputation/reviews', async (c) => {
    const accountId = MOCK_USERS.find(u => u.role === 'admin')?.accountId;
    const reviews = MOCK_REVIEWS.filter(r => r.accountId === accountId);
    return ok(c, reviews);
  });
  // --- Courses Routes ---
  app.get('/api/courses', async (c) => {
    const accountId = MOCK_USERS.find(u => u.role === 'admin')?.accountId;
    const courses = MOCK_COURSES.filter(course => course.accountId === accountId);
    return ok(c, courses);
  });
  app.get('/api/courses/:id', async (c) => {
    const courseId = c.req.param('id');
    const course = MOCK_COURSES.find(c => c.id === courseId);
    if (!course) {
      return notFound(c, 'Course not found');
    }
    const lessons = MOCK_LESSONS.filter(l => l.courseId === courseId);
    return ok(c, { course, lessons });
  });
  // --- Analytics Routes ---
  app.get('/api/analytics/dashboard', async (c) => {
    // In a real app, you'd aggregate this data for the current account.
    return ok(c, MOCK_ANALYTICS_DATA);
  });
  // --- Settings Routes ---
  app.get('/api/settings/users', async (c) => {
    const accountId = MOCK_USERS.find(u => u.role === 'admin')?.accountId;
    const users = MOCK_USERS.filter(u => u.accountId === accountId);
    return ok(c, users);
  });
  app.get('/api/settings/subscription', async (c) => {
    return ok(c, MOCK_SUBSCRIPTION);
  });
  // --- Projects Routes ---
  app.get('/api/projects', async (c) => {
    const accountId = MOCK_USERS.find(u => u.role === 'admin')?.accountId;
    const projects = MOCK_PROJECTS.filter(p => p.accountId === accountId);
    const projectIds = projects.map(p => p.id);
    const tasks = MOCK_TASKS.filter(t => projectIds.includes(t.projectId));
    return ok(c, { projects, tasks });
  });
  // --- E-commerce Routes ---
  app.get('/api/ecommerce/products', async (c) => {
    const accountId = MOCK_USERS.find(u => u.role === 'admin')?.accountId;
    const products = MOCK_PRODUCTS.filter(p => p.accountId === accountId);
    return ok(c, products);
  });
  app.get('/api/ecommerce/orders', async (c) => {
    const accountId = MOCK_USERS.find(u => u.role === 'admin')?.accountId;
    const orders = MOCK_ORDERS.filter(o => o.accountId === accountId);
    return ok(c, orders);
  });
  // --- Affiliates Routes ---
  app.get('/api/affiliates/programs', async (c) => {
    const accountId = MOCK_USERS.find(u => u.role === 'admin')?.accountId;
    const programs = MOCK_AFFILIATE_PROGRAMS.filter(p => p.accountId === accountId);
    return ok(c, programs);
  });
  app.get('/api/affiliates/partners', async (c) => {
    const accountId = MOCK_USERS.find(u => u.role === 'admin')?.accountId;
    const partners = MOCK_AFFILIATE_PARTNERS.filter(p => p.accountId === accountId);
    return ok(c, partners);
  });
  // --- AI Routes ---
  app.post('/api/ai/generate-content', async (c) => {
    const { contentType, prompt } = (await c.req.json()) as { contentType: string, prompt: string };
    let content = `Mock AI Content for type: ${contentType}\nPrompt: "${prompt}"\n\n`;
    switch (contentType) {
      case 'email_subject':
        content += 'Unlock Your Potential: 20% Off Annual Memberships!';
        break;
      case 'email_body':
        content += 'Hi [Name],\n\nReady to commit to your fitness goals? For a limited time, get 20% off all annual memberships at Alpha Fitness. That\'s a full year of access to our state-of-the-art facilities and expert trainers for an unbeatable price.\n\nDon\'t wait, this offer won\'t last long!\n\nBest,\nThe Alpha Fitness Team';
        break;
      case 'social_post':
        content += 'New Year, New You! 💪 Crush your goals with 20% OFF annual memberships at Alpha Fitness. Lock in your savings and start your journey today! #Fitness #GymDeal #NewYearResolution';
        break;
      case 'blog_idea':
        content += '5 Ways an Annual Gym Membership Can Change Your Life (And Your Wallet)';
        break;
      default:
        content += 'This is a default mock response from the AI content generator.';
    }
    return ok(c, { content });
  });
  app.post('/api/ai/predict/lead-score', async (c) => {
    const { contactId } = (await c.req.json()) as { contactId: string };
    if (!contactId) return bad(c, 'contactId is required');
    return ok(c, { ...MOCK_AI_LEAD_SCORE, contactId });
  });
}
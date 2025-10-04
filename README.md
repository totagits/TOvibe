# TOTAG Nexus

A comprehensive, multi-tenant, white-label SaaS platform for marketing agencies and SMBs, providing a centralized hub for CRM, marketing, sales, and more.

TOTAG Nexus is a production-grade, multi-tenant, white-label SaaS platform designed as an all-in-one solution for marketing agencies and small-to-medium businesses. It provides a centralized hub for managing core business operations including CRM, marketing automation, sales pipelines, customer support, website and funnel building, appointment scheduling, reputation management, online courses, e-commerce, project management, and social media. The platform is built on an API-first, modular, and event-driven architecture, ensuring scalability, security, and a modern user experience. Its core value proposition is enabling agencies to offer a branded, comprehensive software suite to their own clients under one roof.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/totagits/TOvibe)

## Key Features

-   **CRM & Contact Management**: Manage contacts, companies, deals, and sales pipelines.
-   **Unified Inbox**: Aggregate communications from email, SMS, and social media.
-   **Marketing Automation**: Build powerful workflows with a visual automation builder.
-   **Pages & Funnels**: Create high-converting websites and sales funnels with a block-based editor.
-   **Scheduling & Bookings**: Manage appointments and sync with external calendars.
-   **Courses & Memberships**: Build and sell online courses with a complete LMS.
-   **Analytics & Reporting**: Gain insights with comprehensive dashboards and reports.
-   **Multi-tenancy & White-labeling**: Offer a fully branded experience to your clients on custom domains.

## Technology Stack

-   **Monorepo**: Turborepo + pnpm (managed via `bun`)
-   **Frontend**: React 18 (Vite), TypeScript, Tailwind CSS
-   **UI Components**: shadcn/ui, Radix UI
-   **State Management**: Zustand
-   **Animations**: Framer Motion
-   **Icons**: Lucide React
-   **Backend**: Hono on Cloudflare Workers
-   **Storage**: Cloudflare Durable Objects
-   **Routing**: React Router
-   **Tooling**: Vite, Bun, ESLint, TypeScript

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Bun](https://bun.sh/) installed on your machine.
-   [Cloudflare Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/totag_nexus.git
    cd totag_nexus
    ```

2.  **Install dependencies:**
    This project uses `bun` as the package manager.
    ```sh
    bun install
    ```

## Development

To start the local development server, which includes both the Vite frontend and the Hono backend worker:

```sh
bun run dev
```

The application will be available at `http://localhost:3000`. The frontend will automatically proxy API requests to the local worker instance.

### Project Structure

-   `src/`: Contains the React frontend application code.
    -   `pages/`: Top-level page components.
    -   `components/`: Reusable UI components, including shadcn/ui.
    -   `hooks/`: Custom React hooks.
    -   `lib/`: Utility functions and API client.
-   `worker/`: Contains the Cloudflare Worker backend code (Hono).
    -   `index.ts`: The main worker entry point.
    -   `user-routes.ts`: Application-specific API routes.
    -   `core-utils.ts`: Core Durable Object utilities (do not modify).
    -   `entities.ts`: Data models and storage logic.
-   `shared/`: TypeScript types and mock data shared between the frontend and backend.

## Deployment

This project is designed to be deployed to Cloudflare's serverless platform.

1.  **Login to Wrangler:**
    Authenticate the Wrangler CLI with your Cloudflare account.
    ```sh
    bunx wrangler login
    ```

2.  **Build and Deploy:**
    The `deploy` script in `package.json` handles building the frontend assets and deploying the worker.
    ```sh
    bun run deploy
    ```

This command will build the application and deploy it to your Cloudflare account. Wrangler will provide you with the URL of your deployed application.

Alternatively, you can deploy directly from your GitHub repository:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/totagits/TOvibe)

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
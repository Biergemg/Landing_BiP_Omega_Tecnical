# BiP Omega Site Deployment Instructions

This site is built with **Astro** and **Tailwind CSS**. It is designed to be deployed for free on **Cloudflare Pages**.

## Prerequisites

1.  **Node.js**: Ensure you have Node.js installed (v18 or higher recommended).
    -   Check with: `node -v`
2.  **GitHub Account**: You need a GitHub account to host the repository.
3.  **Cloudflare Account**: You need a free Cloudflare account.

## Local Development

To run the site locally:

1.  Open a terminal in this folder.
2.  Install dependencies:
    ```powershell
    npm install
    ```
3.  Start the development server:
    ```powershell
    npm run dev
    ```
4.  Open your browser at `http://localhost:4321`.

## Deployment to Cloudflare Pages (Recommended)

This is the easiest way to deploy and get a free SSL certificate and fast global hosting.

### Step 1: Push to GitHub

1.  Create a new repository on GitHub (e.g., `bip-omega-site`).
2.  Initialize this folder as a git repository and push it:
    ```powershell
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/bip-omega-site.git
    git push -u origin main
    ```

### Step 2: Configure Cloudflare Pages

1.  Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2.  Go to **Workers & Pages** -> **Create Application** -> **Pages** -> **Connect to Git**.
3.  Select the `bip-omega-site` repository you just created.
4.  **Configure builds**:
    *   **Production branch**: `main`
    *   **Framework preset**: Select **Astro**.
    *   **Build command**: `npm run build` (should be auto-filled).
    *   **Build output directory**: `dist` (should be auto-filled).
5.  Click **Save and Deploy**.

Cloudflare will build your site and deploy it. It usually takes less than a minute. You will get a `*.pages.dev` URL (e.g., `bip-omega.pages.dev`).

### Step 3: Add Custom Domain (Optional)

1.  In your Cloudflare Pages project, go to **Custom domains**.
2.  Click **Set up a custom domain**.
3.  Enter `bipomega.com` (or your domain).
4.  Follow the instructions to update your DNS records (Cloudflare makes this automatic if they manage your DNS).

## Building Locally (for manual upload)

If you prefer to drag-and-drop the files manually:

1.  Run the build command:
    ```powershell
    npm run build
    ```
2.  This creates a `dist` folder.
3.  You can upload the contents of the `dist` folder to any static host (Netlify, Vercel, FTP, etc.).

## Project Structure

*   `src/pages/`: Contains the routes. `index.astro` is the home page.
*   `src/components/`: Reusable UI components (Hero, Footer, etc.).
*   `src/layouts/`: Global page layout (SEO tags, etc.).
*   `src/styles/`: Global CSS/Tailwind.
*   `public/`: Static assets like PDFs, images, robots.txt.

## Customization

*   **Colors**: Edit `tailwind.config.mjs` to change the `slate` or `navy` palettes.
*   **Content**: Edit the `.astro` files in `src/components/` to change text.

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## System Enhancements (Feb 2026)

### 1. Form Validation
- All fields are now mandatory except the **Tagline** field.
- Required fields are indicated with a red asterisk (`*`).
- Client-side validation ensures all required fields are filled before submission.

### 2. Image Upload Enhancements
- Maximum file size increased to **20MB**.
- Supported formats: **PNG, JPG, JPEG**.
- Real-time file size and format checking with immediate feedback.

### 3. Toast Notification System
- Replaced existing notifications with `react-toastify`.
- Notifications appear at the **top-right** corner and auto-dismiss after **5 seconds**.
- Success messages are green, and error messages are red.
- Specific error message for invalid files: "The format is wrong or the image uploaded exceeded the size limit".

### 4. Automatic Data Cleanup
- A scheduled cleanup mechanism deletes storage data older than **45 days**.
- Database records are preserved; only binary files in the storage bucket are removed.
- **Setup Instructions:**
  1. Ensure `pg_cron` and `pg_net` extensions are enabled in your Supabase project.
  2. Run the migration file `supabase/migrations/20260212000000_cleanup_logs.sql`.
  3. Replace `YOUR_SERVICE_ROLE_KEY` in the migration with your actual Service Role Key from Supabase Settings > API.

### 5. Quality Assurance
- Unit tests implemented for validation logic in `src/lib/validation.test.ts`.
- To run tests: `npm test`.


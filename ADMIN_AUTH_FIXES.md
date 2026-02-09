# Admin Authentication Fixes

## Issues Identified and Fixed

### 1. **Session Logout on Minimize/Tab Switch**

**Problem:** Users were getting logged out when minimizing the browser or switching tabs.

**Root Causes:**

- Missing `NEXTAUTH_SECRET` in environment variables
- Missing `NEXTAUTH_URL` in environment variables
- Short session duration (24 hours with 1-hour update)
- No session refetch on window focus

**Fixes Applied:**

- ✅ Added `NEXTAUTH_SECRET` to `.env.local`
- ✅ Added `NEXTAUTH_URL=http://localhost:3000` to `.env.local`
- ✅ Extended session duration to 30 days (from 24 hours)
- ✅ Changed session update interval to 24 hours (from 1 hour)
- ✅ Added `refetchInterval={5 * 60}` (5 minutes) to SessionProvider
- ✅ Added `refetchOnWindowFocus={true}` to SessionProvider

### 2. **Unauthorized Errors When Adding Admins/Jobs**

**Problem:** Getting 401 Unauthorized responses when trying to create admin users or jobs.

**Root Causes:**

- API fetch requests not including credentials
- No proper error handling for session expiration
- Session not being properly validated on API routes

**Fixes Applied:**

- ✅ Added `credentials: "include"` to all fetch requests in admin dashboard
- ✅ Added proper error handling for 401 responses
- ✅ Added automatic redirect to login page on session expiration
- ✅ Improved login flow with `redirect: false` and manual navigation

## Files Modified

1. **`.env.local`**
    - Added `NEXTAUTH_SECRET`
    - Added `NEXTAUTH_URL`

2. **`app/api/auth/[...nextauth]/route.js`**
    - Extended session maxAge to 30 days
    - Changed updateAge to 24 hours

3. **`app/components/SessionProvider.jsx`**
    - Added refetchInterval (5 minutes)
    - Added refetchOnWindowFocus (true)

4. **`app/(public)/admin/page.js`**
    - Added `credentials: "include"` to all fetch calls
    - Added try-catch error handling
    - Added 401 status check and redirect to login
    - Improved error messages

5. **`app/(public)/admin/login/page.js`**
    - Changed to use `redirect: false`
    - Improved login flow with manual navigation
    - Added router.refresh() after successful login

## Testing Instructions

1. **Restart the development server** (IMPORTANT):

    ```bash
    npm run dev
    ```

    This is necessary for the new environment variables to take effect.

2. **Test Session Persistence:**
    - Login to admin dashboard
    - Minimize the browser window
    - Wait 1-2 minutes
    - Restore the window
    - Verify you're still logged in

3. **Test Tab Switching:**
    - Login to admin dashboard
    - Switch to another tab/application
    - Wait 1-2 minutes
    - Switch back to the admin dashboard
    - Verify you're still logged in

4. **Test Adding Admin User:**
    - Login to admin dashboard
    - Go to "Admins" tab
    - Click "Add New Admin"
    - Fill in email (must end with @aavabrands.com) and password
    - Submit the form
    - Verify no "Unauthorized" error appears

5. **Test Adding Job:**
    - Login to admin dashboard
    - Go to "Jobs" tab
    - Click "Add New Job"
    - Fill in all job details
    - Submit the form
    - Verify no "Unauthorized" error appears

## Important Notes

### For Production Deployment:

1. **Change NEXTAUTH_SECRET** to a strong, random string (minimum 32 characters)
    - Generate one using: `openssl rand -base64 32`
2. **Update NEXTAUTH_URL** to your production domain:

    ```
    NEXTAUTH_URL=https://yourdomain.com
    ```

3. **Ensure environment variables are set** in your hosting platform (Vercel, Netlify, etc.)

### Security Considerations:

- Session tokens are httpOnly cookies (secure)
- Sessions expire after 30 days of inactivity
- Sessions refresh every 24 hours when active
- All admin operations require valid session
- Passwords are hashed with bcrypt

## Additional Improvements Made:

- Better error messages for users
- Automatic redirect to login on session expiration
- Console logging for debugging authentication issues
- Improved loading states during login

# Firebase Setup & Configuration Guide

## Current Status
⚠️ **Firebase Billing Account is DISABLED** - This is blocking file uploads

## Step 1: Enable Billing (REQUIRED for file uploads)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select **x4tech-24** project
3. Click **☰ Menu** → **Billing**
4. Click **Link billing account**
5. Select or create a billing account
6. Wait 5-10 minutes for activation

## Step 2: Configure CORS (for file uploads)

After billing is enabled, run:

```bash
node configure-cors.js
```

This will allow file uploads from:
- `http://localhost:5173` (development)
- `http://localhost:3000` (alternative dev)
- `https://agency-six-olive.vercel.app` (production)

## Step 3: Verify Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select **x4tech-24** → **Build** → **Storage**
3. Check if bucket is active and CORS is configured
4. The status should show **Active**

## What This Enables

✅ Admin can upload team member photos  
✅ Admin can upload project cover images  
✅ Admin can upload blog post images  
✅ Admin can upload client logos  
✅ Admin can upload OG meta images  
✅ Admin can upload case study PDFs  

## Troubleshooting

### Still getting CORS errors?
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Check Firebase Console → Storage → CORS tab
- Verify billing is enabled

### Can't enable billing?
- Update payment method in Firebase Console
- Check if card was declined (check email for notifications)
- Try a different payment method

## For Production Deployment

Once billing is enabled and CORS is configured, your Vercel deployment will work automatically because the CORS rules allow `https://agency-six-olive.vercel.app`

---

**Need help?** Check:
- Firebase Documentation: https://firebase.google.com/docs/storage/web/start
- CORS Guide: https://firebase.google.com/docs/storage/web/download-files#cors_configuration

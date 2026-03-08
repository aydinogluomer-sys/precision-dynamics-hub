

# Backend Test Results

## 1. `is_staff()` Function -- FIXED
The migration was applied successfully. The function now correctly filters by `role IN ('admin', 'staff', 'production', 'quality')` instead of just checking for any role existence. Verified directly from the database.

## 2. `app_role` Enum Values
Current values: `admin`, `staff`, `production`, `quality`. No `customer` or `user` role exists in the enum, which means the current system is safe. However, if a `customer` role were ever added to the enum, the fix ensures it would not pass `is_staff()`.

## 3. RFQ Submissions -- Working
The `rfqs` table has data flowing in correctly. Submissions from the Teklif Al page are inserting properly with all fields (service, material, quantity, notes, files).

## 4. Edge Functions -- Auth Working
- `finance-ai`: Returns 401 for unauthenticated requests (correct)
- `ocr-invoice`: Same auth pattern (correct)
- `parasut-sync`: Same auth pattern (correct)

All three functions check for valid JWT, then verify admin role via `user_roles` table before proceeding.

## 5. Issues Found

### Issue A: Files Not Uploaded to Storage
The Teklif Al page only stores the **filename** in the `files` column (e.g., `["SB 4335-60.stl"]`). The actual CAD file is never uploaded to the `cad-uploads` storage bucket. This means staff cannot access the uploaded files later.

### Issue B: "Maks. 100 MB" Label May Be Inaccurate
No file size validation exists in the code, and Supabase free plan defaults to 50 MB per file. The "100 MB" label on the upload area could be misleading.

### Issue C: No `user_id` on Most RFQs
All recent RFQs have `user_id: null`, meaning they were submitted without authentication. The RLS policy "Customers can read own rfqs" (`auth.uid() = user_id`) won't match these records, so customers can't see their own submissions in the panel.

## Recommendation
The most critical fix is **Issue A** (files not actually uploaded). Without it, the entire RFQ file attachment feature is non-functional. Issues B and C are secondary but should also be addressed.


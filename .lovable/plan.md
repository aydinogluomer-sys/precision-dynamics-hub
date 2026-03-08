

# Fix `is_staff()` Privilege Escalation Vulnerability

## Problem
The `is_staff()` function only checks if a user has *any* role in `user_roles`, not whether that role is actually a staff-level role. A user with a `'user'` or any non-staff role passes all `is_staff()` checks, gaining access to all staff-gated tables.

## Fix
One database migration to replace the function:

```sql
CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'staff', 'production', 'quality')
  )
$$;
```

This includes all four `app_role` enum values that represent internal staff (`admin`, `staff`, `production`, `quality`), excluding any future non-staff roles like `'user'` or `'customer'`.

No code changes needed -- all RLS policies already reference `is_staff()`, so they will immediately use the corrected logic.


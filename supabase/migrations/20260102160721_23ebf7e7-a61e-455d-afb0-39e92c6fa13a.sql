-- Fix contact_submissions policies (change from RESTRICTIVE to PERMISSIVE)
DROP POLICY IF EXISTS "Only admins can view contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Only admins can delete contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Service role can insert contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Service role can update contact submissions" ON contact_submissions;

-- Create PERMISSIVE policies for contact_submissions
CREATE POLICY "Admins can view contact submissions"
ON contact_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete contact submissions"
ON contact_submissions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Service role can insert contact submissions"
ON contact_submissions
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Service role can update contact submissions"
ON contact_submissions
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Fix user_roles policies (change from RESTRICTIVE to PERMISSIVE)
DROP POLICY IF EXISTS "Users can view own roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON user_roles;

-- Create PERMISSIVE policies for user_roles
CREATE POLICY "Users can view own roles"
ON user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can manage roles"
ON user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix: require authentication to create reports
DROP POLICY "Anyone can create reports" ON public.waste_reports;
CREATE POLICY "Authenticated users can create reports" ON public.waste_reports FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
